import * as yup from "yup";
export const Schema = yup.object().shape({
  firstname: yup
    .string()
    .required()
    .strict(true)
    .trim("White space before /after are not allowed"),
  lastname: yup
    .string()
    .required()
    .strict(true)
    .trim("White space before /after are not allowed"),

  email: yup.string().email().required(),
  phone: yup.string().required().matches(/\d/, "Phone is number"),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must contain 8 characters, at least one letter and one number"
    ),
    confirmPassword: yup
    .string()
    .required("Repeat password is a required field")
    .oneOf([yup.ref("password")], "Password and repeat password must match"),
});
