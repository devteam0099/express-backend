const faq = require("../models/faq.model.js");
const catagory = require("../models/catagory.model.js");
const { Op, where } = require("sequelize");
const {validateAdmin} = require('../utils/jwt.js')
const {emptyFieldFinder, errorResponse, successResponse} = require('../utils/constants.js');

const createFaq = async (req, res) => {
  const { question, answer, catagory_id, } = req.body;
  if (!(question && answer && catagory_id)) {
    const emptyField = emptyFieldFinder({question,answer,catagory_id})
    return errorResponse(res,400,`${emptyField} should not be empty`)
  }
  const validateRole = validateAdmin(req.headers.auth_token)
  if (!validateRole) {
    return errorResponse(res,401,"Only admin can create FAQs")
  }
    try {
      const resp = await catagory.findOne({where : {id : catagory_id}})
      if (resp) {
        await faq.create({
          question,
          answer,
          catagory_id,
        })
        successResponse(res,200,"faq has been created successfully")
      }else{
        errorResponse(res,404,"Catagory does not exist")
      }
        
      } catch (error) {
        console.log(error);
        errorResponse(res,500,error.message)
      }
};

const getSingleFaq = async(req,res) => {
  const {id} = req.query
  if (!id) {
    return errorResponse(res,400,"Please provide FAQ Id to proceed")
  }
  try {
    const resp = await faq.findOne({
      where : {id},
      include : [{
        model : catagory,
        attributes : ["id", "name", "description", "created_at", "updated_at"]
      }]
    })
    resp? successResponse(res,200,resp.dataValues) : errorResponse(res,404,"FAQ not found")
  } catch (error) {
    console.log(error)
    errorResponse(res,500,error.message)
  }
}

const getFaq = async (req, res) => {
  const { page_no, limit, name } = req.query;
  const findOptions = {
    where: {},
    include: [
      {
        model: catagory,
        attributes: ["id", "name", "description", "created_at", "updated_at"],
      },
    ],
  };
  if (limit && limit !== "") {
    findOptions.limit = limit;
  }
  if (page_no && page_no !== "" && limit && limit !== "") {
    findOptions.offset = (parseInt(page_no) - 1) * parseInt(limit);
  }
  if (name && name !== "") {
    findOptions.where.question = {
      [Op.iLike]: `%${name}%`,
    };
  }
  try {
    const count = await faq.count()
    const faqs = await faq.findAll(findOptions);
    successResponse(res,200,faqs,count)
  } catch (error) {
    errorResponse(res,500,error.message)
  }
};

const updateFaq = async (req, res) => {
  const { catagory_id, question, answer, id } = req.body;
  const regex = /^\d+$/
  if (!(catagory_id && question && answer && id)) {
    const emptyField = emptyFieldFinder({catagory_id,question,answer,id})
    return errorResponse(res,400,`${emptyField} should not be empty`)
  }
  if (!(regex.test(id) && regex.test(catagory_id))) {
    return !regex.test(id)? errorResponse(res,400,"Please provide Id in correct format") 
    : errorResponse(res,400,"Please provide catagory Id in correct format")
  }
  const validateRole = await validateAdmin(req.headers.auth_token)
  if (!validateRole) {
    return errorResponse(res,401,"Only admin can update FAQs")
  }
   try {
    const faq_id =  await faq.findOne({where : {id}})
    const catagoryID = await catagory.findOne({where : {id : catagory_id}})
    if (faq_id && catagoryID) {
      await faq.update({catagory_id,question,answer},{where : {id}})
      successResponse(res,200,"FAQ has been updated successfully")
     }else{
      !faq_id? errorResponse(res,404,"Faq does not exist") : errorResponse(res,404,"Catagory does not exist")
       }  
    }catch (error) {
      console.log(error)
      errorResponse(res,500,error.message)
     } 
    
};

const deleteFaq = async (req, res) => {
    const {id} = req.query
    if (!id) {
        return errorResponse(res,400,"please select FAQ Id to delete")
    }
    const validateRole =  await validateAdmin(req.headers.auth_token)
    if (!validateRole) {
    return errorResponse(res,401,"Only admin can delete FAQs")
    }
    try {
        const resp = await faq.destroy({where : {id}})
        resp? successResponse(res,200,"FAQ has been deleted successfully") :
        errorResponse(res,404,"FAQ does not exist")
    } catch (error) {
        console.log(error)
        errorResponse(res,500,error.message)
    }
};

const bulkFaqDelete = async(req,res) => {
    const {ids} = req.body
    const validateRole = await validateAdmin(req.headers.auth_token)
    if (!validateRole) {
    return errorResponse(res,401,"Only admin can delete FAQs")
    }
    try {
        const resp = await faq.destroy({where : {id : ids}})
        resp? successResponse(res,200,"Selected FAQs have been deleted successfully") :
        errorResponse(res,404,"FAQs does not exist")
    } catch (error) {
        console.log(error)
        errorResponse(res,500,error.message)
    }

}
module.exports = { createFaq, getFaq, updateFaq, deleteFaq,bulkFaqDelete,getSingleFaq };
