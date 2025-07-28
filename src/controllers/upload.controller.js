const { errorResponse, successResponse } = require("../utils/response.util");

const uploadController = async (req, res) => {
  try {
    successResponse(
      res,
      "Upload image successfully!",
      {
        url: req.file.path,
        public_id: req.file.filename,
      },
      200
    );
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  uploadController,
};
