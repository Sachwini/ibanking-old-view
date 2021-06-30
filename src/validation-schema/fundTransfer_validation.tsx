import * as yup from "yup";

export const fundTrasferScheme = yup.object().shape({
  fromAccount: yup.string().required("Your AccountNumber is Required"),

  DESTBranchName: yup.string().required("Destination branch is Required"),

  toAccount: yup
    .string()
    .required("Destination AccountNumber is Required")
    .min(6, "Minimum 6 Digit number is required"),

  destinationAccountHolderName: yup
    .string()
    .required("destination account holder name is required"),

  amount: yup
    .string()
    .required("Transaction amount is required")
    .min(3, "minimumm transaction amount is Rs.100"),
});
