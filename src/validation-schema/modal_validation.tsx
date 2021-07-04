import * as yup from "yup";

export const otpScheme = yup.object().shape({
  otp: yup
    .string()
    .matches(/[0-9]/, "OTP must be Number Type")
    .required("Otp is required")
    .min(6, "OTP length must be 6 digits")
    .max(7, "transction code length must be 6 digits"),
});

export const mpinScheme = yup.object().shape({
  mpin: yup
    .string()
    .matches(/[0-9]/, "Transction PIN must be Number Type")
    .required("Transction Code is required")
    .min(6, "transction code length must be 6 digits")
    .max(7, "transction code length must be 6 digits"),
});
