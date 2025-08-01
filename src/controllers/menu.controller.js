const { menuSmartPhoneService } = require("../services/menu.service");
const { errorResponse, successResponse } = require("../utils/response.util");

const menuSmartPhoneController = async (req, res) => {
  try {
    const menuSmartphone = await menuSmartPhoneService();
    successResponse(
      res,
      "Get menu smartphone successfully!",
      menuSmartphone,
      200
    );
  } catch (error) {
    errorResponse(res, error);
  }
};
module.exports = {
  menuSmartPhoneController,
};
