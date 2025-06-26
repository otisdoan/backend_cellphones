const { errorResponse } = require("../utils/response.util");

const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  validateBody,
};
