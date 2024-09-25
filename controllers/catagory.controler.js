const catagory = require("../models/catagory.model.js");
const faq = require("../models/faq.model.js");
const {
  validateFields,
  successResponse,
  errorResponse,
  validateRegex,
} = require("../utils/validation.js");
const message = require("../utils/constants/constants.js");
const { Op } = require("sequelize");

const createCatagory = async (req, res) => {
  const { name, description } = req.body;
  if (!(name && description)) {
    const emptyField = validateFields({ name, description });
    return res.send(errorResponse(400, emptyField));
  }
  try {
    await catagory.create({
      name,
      description,
    });
    return res.send(successResponse(200, message.CATEGORY_CREATED));
  } catch (error) {
    return res.send(errorResponse(500, error.message));
  }
};

const getSingleCatagory = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.send(errorResponse(400, message.NO_CATEGORY_ID));
  }
  if (!validateRegex(id)) {
    return res.send(errorResponse(400, message.INVALID_CATEGORY_ID));
  }
  try {
    const catagoryData = await catagory.findOne({
      where: { id },
      include: [
        {
          model: faq,
          attributes: ["id", "question", "answer", "created_at", "updated_at"],
        },
      ],
    });
    return catagoryData
      ? res.send(successResponse(200, catagoryData.dataValues))
      : res.send(errorResponse(404, message.NO_CATEGORY));
  } catch (error) {
    console.log(error);
    return res.send(errorResponse(500, error.message));
  }
};

const obtainCatagories = async (req, res) => {
  const { page_no, limit, name } = req.query;
  try {
    const findOptions = {
      where: {},
      include: [
        {
          model: faq,
          attributes: ["id", "question", "answer", "created_at", "updated_at"],
        },
      ],
      order: [["id", "DESC"]],
    };
    if (limit && limit !== "") {
      findOptions.limit = parseInt(limit);
    }
    if (page_no && page_no !== "" && limit && limit !== "") {
      findOptions.offset = (parseInt(page_no) - 1) * parseInt(limit);
    }
    if (name && name !== "") {
      findOptions.where.name = {
        [Op.iLike]: `%${name}%`,
      };
    }
    const count = await catagory.count();
    const catagories = await catagory.findAll(findOptions);
    return res.send(successResponse(200, catagories, count));
  } catch (error) {
    console.log(error);
    return res.send(errorResponse(500, error.message));
  }
};

const updateCatagory = async (req, res) => {
  const { catagory_id } = req.query;
  const { name, description } = req.body;

  if (!(name && description && catagory_id)) {
    const emptyField = validateFields({ name, description, catagory_id });
    return res.send(errorResponse(400, emptyField));
  }
  if (!validateRegex(catagory_id)) {
    return res.send(errorResponse(400, message.INVALID_CATEGORY_ID));
  }
  try {
    const data = await catagory.findOne({ where: { id: catagory_id } });
    if (data) {
      await catagory.update(
        { name, description },
        { where: { id: catagory_id } }
      );
      return res.send(successResponse(200, message.CATEGORY_UPDATED));
    } else {
      return res.send(errorResponse(404, message.NO_CATEGORY));
    }
  } catch (error) {
    console.log(error);
    return res.send(errorResponse(500, error.message));
  }
};

const deleteCatagory = async (req, res) => {
  const { catagory_id } = req.params;
  if (!catagory_id) {
    return res.send(errorResponse(400, message.NO_CATEGORY_ID));
  }
  if (!validateRegex(catagory_id)) {
    return res.send(errorResponse(400, message.INVALID_CATEGORY_ID));
  }
  try {
    const isDeleted = await catagory.destroy({ where: { id: catagory_id } });
    return isDeleted
      ? res.send(successResponse(200, message.CATEGORY_DELETED))
      : res.send(errorResponse(404, message.NO_CATEGORY));
  } catch (error) {
    console.log(error);
    return res.send(errorResponse(500, error.message));
  }
};

const bulkCatagoryDelete = async (req, res) => {
  const { ids } = req.body;
  if (!(Array.isArray(ids) && ids.length > 0)) {
    return !Array.isArray(ids)
      ? res.send(errorResponse(400, message.INVALID_FORMAT))
      : res.send(errorResponse(400, message.NO_SELECTED_CATEGORY));
  }
  if (!validateRegex(ids)) {
    return res.send(errorResponse(400, message.INVALID_CATEGORY_ID));
  }
  try {
    const isDeleted = await catagory.destroy({ where: { id: ids } });
    return isDeleted
      ? res.send(successResponse(200, message.BULK_CATEGORIES_DELETE))
      : res.send(errorResponse(404, message.NO_CATEGORIES));
  } catch (error) {
    console.log(error);
    return res.send(errorResponse(500, error.message));
  }
};

module.exports = {
  createCatagory,
  obtainCatagories,
  updateCatagory,
  deleteCatagory,
  bulkCatagoryDelete,
  getSingleCatagory,
};
