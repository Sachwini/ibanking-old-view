import * as yup from "yup";

export const loginFormScheme = yup.object().shape({
  userName: yup
    .string()
    .required(" User name is Required")
    .min(10, "User Name must be minimum 10 digit long"),

  password: yup
    .string()
    .required("Password is required")
    .min(4, "Password must be 4 digit long"),

  //   otp: yup.string().min(4, "otp must be minimum 4 digit"),
});
