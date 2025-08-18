const role = (roles) => async (req, res, next) => {
  const { role } = req.user_infor;
  if (!roles.includes(role)) {
    throw new Error("Requied role admin!");
  }
  next();
};

module.exports = {
  role,
};
