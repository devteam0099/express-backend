const faq = require("../models/faq.model.js");
const catagory = require("../models/catagory.model.js");
const { Op } = require("sequelize");
const message = require("../utils/constants/constants.js");
const {
  validateFields,
  errorResponse,
  successResponse,
  validateRegex,
} = require("../utils/validation.js");

const createFaq = async (req, res) => {
  const { question, answer, catagory_id } = req.body;
  if (!(question && answer && catagory_id)) {
    const emptyField = validateFields({ question, answer, catagory_id });
    return res.send(errorResponse(400, emptyField));
  }
  if (!validateRegex(catagory_id)) {
    return res.send(errorResponse(400, message.INVALID_CATEGORY_ID));
  }
  try {
    const resp = await catagory.findOne({ where: { id: catagory_id } });
    if (resp) {
      await faq.create({
        question,
        answer,
        catagory_id,
      });
      return res.send(successResponse(200, message.FAQ_CREATED));
    } else {
      return res.send(errorResponse(404, message.NO_CATEGORY));
    }
  } catch (error) {
    console.log(error);
    return res.send(errorResponse(500, error.message));
  }
};

const getSingleFaq = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.send(errorResponse(400, message.NO_FAQ_ID));
  }
  if (!validateRegex(id)) {
    return res.send(errorResponse(400, message.INVALID_FAQ_ID));
  }
  try {
    const faqData = await faq.findOne({
      where: { id },
      include: [
        {
          model: catagory,
          attributes: ["id", "name", "description", "created_at", "updated_at"],
        },
      ],
    });
    return faqData
      ? res.send(successResponse(200, faqData.dataValues))
      : res.send(errorResponse(404, message.NO_FAQ));
  } catch (error) {
    console.log(error);
    return res.send(errorResponse(500, error.message));
  }
};

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
    order: [["id", "DESC"]],
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
    const count = await faq.count();
    const faqs = await faq.findAll(findOptions);
    return res.send(successResponse(200, faqs, count));
  } catch (error) {
    return res.send(errorResponse(500, error.message));
  }
};

const updateFaq = async (req, res) => {
  const { catagory_id, question, answer, id } = req.body;
  if (!(catagory_id && question && answer && id)) {
    const emptyField = validateFields({ catagory_id, question, answer, id });
    return res.send(errorResponse(400, emptyField));
  }
  if (!(validateRegex(catagory_id) && validateRegex(id))) {
    return !validateRegex(id)
      ? res.send(errorResponse(400, message.INVALID_FAQ_ID))
      : res.send(errorResponse(400, message.INVALID_CATEGORY_ID));
  }
  try {
    const faq_id = await faq.findOne({ where: { id } });
    const catagoryID = await catagory.findOne({ where: { id: catagory_id } });
    if (faq_id && catagoryID) {
      await faq.update({ catagory_id, question, answer }, { where: { id } });
      return res.send(successResponse(200, message.FAQ_UPDATED));
    } else {
      return !faq_id
        ? res.send(errorResponse(404, message.NO_FAQ))
        : res.send(errorResponse(404, message.NO_CATEGORY));
    }
  } catch (error) {
    console.log(error);
    return res.send(errorResponse(500, error.message));
  }
};

const deleteFaq = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.send(errorResponse(400, message.NO_FAQ_ID));
  }
  if (!validateRegex(id)) {
    return res.send(errorResponse(400, message.INVALID_FAQ_ID));
  }
  try {
    const resp = await faq.destroy({ where: { id } });
    return resp
      ? res.send(successResponse(200, message.FAQ_DELETED))
      : res.send(errorResponse(404, message.NO_FAQ));
  } catch (error) {
    console.log(error);
    return res.send(errorResponse(500, error.message));
  }
};

const bulkFaqDelete = async (req, res) => {
  const { ids } = req.body;
  if (!(Array.isArray(ids) && ids.length > 0)) {
    return !Array.isArray(ids)
      ? res.send(errorResponse(400, message.INVALID_FORMAT))
      : res.send(errorResponse(400, message.NO_FAQ));
  }
  if (!validateRegex(ids)) {
    return res.send(errorResponse(400, message.INVALID_FAQ_ID));
  }
  try {
    const resp = await faq.destroy({ where: { id: ids } });
    return resp
      ? res.send(successResponse(200, message.BULK_FAQ_DELETE))
      : res.send(errorResponse(404, message.NO_BULK_FAQ));
  } catch (error) {
    console.log(error);
    return res.send(errorResponse(500, error.message));
  }
};
module.exports = {
  createFaq,
  getFaq,
  updateFaq,
  deleteFaq,
  bulkFaqDelete,
  getSingleFaq,
};
