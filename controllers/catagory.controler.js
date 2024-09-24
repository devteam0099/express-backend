const catagory = require("../models/catagory.model.js");
const faq = require("../models/faq.model.js");
const { validateAdmin } = require("../utils/jwt.js");
const {emptyFieldFinder,successResponse,errorResponse} = require('../utils/constants.js')
const {Op} = require('sequelize')

const createCatagory = async (req, res) => {
  const { name, description } = req.body;
  if (!(name && description)) {
    const emptyField = emptyFieldFinder({name,description})
    return errorResponse(res,400,`${emptyField} should not be empty`)
  }

  try {
    const validateRole = await validateAdmin(req.headers.auth_token);
    if (validateRole) {
      try {
        await catagory.create({
          name,
          description,
        });
        successResponse(res,200,'catagory has been created successfully')
      } catch (error) {
        errorResponse(res,500,error.message);
      }
    } else {
      errorResponse(res,200,'Only admin can create catagory');
    }
  } catch (error) {
    errorResponse(res,500,error.message);
  }
};

const obtainCatagories = async (req, res) => {
  const {page_no,limit,name} = req.query
  try {
    const findOptions = {
      where : {},
      include: [
        {
          model: faq,
          attributes: ["id", "question", "answer", "created_at", "updated_at"],
        },
      ],
    }
    if (limit && limit !== "") {
      findOptions.limit = parseInt(limit)
    }
    if ((page_no && page_no !== "") && (limit && limit !== "")) {
      findOptions.offset = (parseInt(page_no) -1 ) * (parseInt(limit))
    }
    if (name && name !== "") {
      findOptions.where.name = {
        [Op.iLike] : `%${name}%`
      }
    }
    const count = await catagory.count()
    
    const catagories = await catagory.findAll(findOptions);
    successResponse(res,200,catagories,count)
  } catch (error) {
    console.log(error);
    errorResponse(res,500,error);
  }
};

const updateCatagory = async (req, res) => {
  const {catagory_id} = req.query
  const {name,description} = req.body
  
  if (!(name && description && catagory_id)) {
    const emptyField = emptyFieldFinder({name,description,catagory_id})
    return errorResponse(res,400,`${emptyField} should not be empty`)
  }
  const validateRole = await validateAdmin(req.headers.auth_token)
  if (!validateRole) {
    return errorResponse(res,401,'Only admin can create catagory')
  }
  try {
    const data = await catagory.findOne({where : {id : catagory_id}})
    if (data) {
      await catagory.update({name,description},{where : {id : catagory_id}})
      successResponse(res,200,'Catagory has been updated successfully')  
    }else{
      errorResponse(res,404,"Catagory not found")
    }
  } catch (error) {
    console.log(error)
    errorResponse(res,500,error.message)
  }
};

const deleteCatagory = async (req, res) => {
  const { catagory_id } = req.query;
  console.log(catagory_id)
  if (!catagory_id) {
    return  errorResponse(res,400,"please provide catagory id to proceed")
  }
  const validateRole =  await validateAdmin(req.headers.auth_token)
  if (!validateRole) {
    return errorResponse(res,401,"Only admin can delete a catagory")
  }
  try {
    const resp = await catagory.destroy({ where: { id: catagory_id } });
    resp? successResponse(res,200,"catagory has been deleted successfully") : errorResponse(res,404,"catagory does not exist")
  } catch (error) {
    console.log(error);
    errorResponse(res,500,error.message);
  }
};

const bulkCatagoryDelete = async(req,res) => {
    const {ids} = req.body
    if (!(Array.isArray(ids) && ids.length > 0)) {
      return !Array.isArray(ids)? errorResponse(res,400,"Ids should be array in bulk delete") : 
             errorResponse(res,400,"Please provide atleast one ID to proceed")
    }
    const validateRole = await validateAdmin(req.headers.auth_token)
    if (!validateRole) {
    return errorResponse(res,401,"Only admin can delete catagories")
    }
    try {
      const resp = await catagory.destroy({where : {id : ids}})
      resp? successResponse(res,200,"Selected catagories have been deleted successfully")
      : errorResponse(res,404,"Selected catagories does not exist")
    } catch (error) {
      console.log(error)
      errorResponse(res,500,error.message)
    }
}

module.exports = {
  createCatagory,
  obtainCatagories,
  updateCatagory,
  deleteCatagory,
  bulkCatagoryDelete
};
