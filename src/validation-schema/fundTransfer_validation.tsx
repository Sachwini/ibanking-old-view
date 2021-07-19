import * as yup from "yup";

export const fundTrasferScheme = yup.object().shape({
  fromAccount: yup.string().required("Your AccountNumber is Required"),

  toAccount: yup
    .string()
    .required("Destination AccountNumber is Required")
    .min(6, "Minimum 6 Digit number is required"),

  DESTBranchName: yup.string().required("Destination branch is Required"),

  destinationAccountHolderName: yup
    .string()
    .required("destination account holder name is required"),

  amount: yup
    .string()
    .required("Transaction amount is required")
    .min(3, "minimumm transaction amount is Rs.100"),

  remarks: yup.string().required("remarks is required"),
});
