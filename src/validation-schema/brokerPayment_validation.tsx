import * as yup from "yup";

export const brokerPaymentScheme = yup.object().shape({
  fromAccount: yup.string().required("Your AccountNumber is Required"),
  DESTBrokerName: yup.string().required("destination Broker name is required"),
  clientID: yup.string().required("Client Id is required"),
  clientName: yup.string().required("Client name is required"),

  mobileNumber: yup
    .string()
    .required("Mobile NUmber is Required")
    .min(10, "Minimum 10 Digit number is required"),

  transctionAmount: yup
    .string()
    .required("Transaction amount is required")
    .min(3, "minimumm transaction amount is Rs.100"),

  remarks: yup.string().required("Remarks is required"),
});
