import * as yup from "yup";

export const mpinChangeSchema = yup.object().shape({
  currentMpin: yup.string().required("Your current mpin is Required"),
  newMpin: yup
    .string()
    .required("Your new mpin is Required")
    .min(4, "Minimum 4 Digit number is required"),
  confirmMpin: yup
    .string()
    .required("Your confirm mpin is Required")
    .min(4, "Minimum 4 Digit number is required"),
});
