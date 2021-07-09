import * as yup from "yup";

export const otpScheme = yup.object().shape({
  otp: yup
    .string()
    .matches(/[0-9]/, "OTP must be Number Type")
    .required("Otp is required")
    .min(6, "OTP length must be 6 digits long")
    .max(6, "OTP Exactly 6 digits Long"),
});

export const mpinScheme = yup.object().shape({
  mpin: yup
    .string()
    .matches(/[0-9]/, "Transaction PIN must be Number Type")
    .required("Transaction Code is required")
    .min(4, "Transaction PIN code Length not less Than 4 digits")
    .max(6, "Transaction PIN code length not greater than 6 digits"),
});
