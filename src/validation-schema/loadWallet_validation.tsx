import * as yup from "yup";

export const loadWalletScheme = yup.object().shape({
  fromAccount: yup.string().required("your Account Number is Required"),
  contact: yup.string().required("your wallet UserID is Required"),
  amount: yup
    .string()
    .required("Amount is Required")
    .min(3, "minimumm transaction amount is Rs.100"),
  remarks: yup.string().required("Remarks is Required"),
});
