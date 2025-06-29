const yup = require("yup");

const registerSchema = yup.object({
  full_name: yup
    .string()
    .required("fullname is required!")
    .matches(/^[A-Za-zÀ-ỹ\s']+$/, "fullname is invalid!"),
  date_of_birth: yup
    .string()
    .required("date of birth is required!")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "date of birth must be format YYYY-MM-DD")
    .test("is-valid-date", "date of birth is invalid!", (value) => {
      return !isNaN(Date.parse(value));
    }),
  phone: yup
    .string()
    .required("phone is required!")
    .matches(/^\d{10}$/, "phone must be 10 digits"),
  email: yup.string().email("Email is invalid!").optional().nullable(),
  password_hash: yup
    .string()
    .required("password is required!")
    .min(6, "password must be at least 6 characers"),
});

const loginSchema = yup.object({
  phone: yup
    .string()
    .required("phone is required!")
    .matches(/^\d{10}$/, "phone must be 10 digits"),
  password_login: yup
    .string()
    .required("password is required!")
    .min(6, "password must be at least 6 characers"),
});

module.exports = {
  registerSchema,
  loginSchema,
};
