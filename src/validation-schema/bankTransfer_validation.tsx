import * as yup from "yup";

export const bankTransferScheme = yup.object().shape({
  fromAccount: yup.string().required("Your AccountNumber is Required"),

  DESTBankName: yup.string().required("destination bank name is required"),

  toAccount: yup
    .string()
    .required("Destination AccountNumber is Required")
    .min(6, "Minimum 6 Digit number is required"),

  destAccountHolderName: yup
    .string()
    .required("destination account holder name is required"),

  transctionAmount: yup
    .string()
    .required("Transction amount is required")
    .min(3, "minimumm transction amount is Rs.100"),

  remarks: yup
    .string()
    .required("Transction amount is required")
    .min(3, "minimumm transction amount is Rs.100"),
});
