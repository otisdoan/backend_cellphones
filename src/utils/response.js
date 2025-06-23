const successResponse = (res, message = "Success", data, statusCode = 200) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};

const errorResponse = (res, error, statusCode = 400) => {
  const message =
    error.inner && error.inner.length ? error.inner.map((e) => e.message) : "";
  return res.status(statusCode).json({
    status: "error",
    message: message || error.message,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
