const { errorResponse } = require("../utils/response.util");

const role = (roles) => async (req, res, next) => {
  try {
    const { role } = req.user_infor;
    if (!roles.includes(role)) {
      throw new Error("Requied role admin!");
    }
    next();
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  role,
};
