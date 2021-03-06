import { bankTransferFormDataType } from "./for-pages/bankTransferModels";

export interface modalProps {
  data: bankTransferFormDataType;
  transctionCharge: string;
  confirmModalShow: boolean;
  confirmModalSubmitHandle: () => void;
  handleCancle: (show: boolean) => void;
  accValidationStatus: {
    status: boolean;
    message: string;
  };
}

export const tHistoryDefaultData = {
  amount: 0,
  service: "",
  serviceTo: "",
  accountNumber: "",
  transactionIdentifier: "",
  date: "",
  status: "",
  airlinesPdfUrl: "any",
  sessionId: "any",
  id: 0,
  createdDate: "",
  destination: "",
  charge: 0,
  requestDetail: {
    destinationBranchName: "",
    destinationAccountNumber: "",
    destinationBankName: "",
    destinationAccountName: "",
  },
  responseDetail: {
    "Result Message": "",
    RefStan: "",
    status: "",
  },
  iconUrl: "",
};

export interface errorModalDataType {
  fromAccNo: string;
  toAccNo: string;
  destAccHolderName: string;
  destBankName: string;
  destBranchName: string;
  transctionAmount: string;
  transctionCharge: string;
}

export interface fundTransfer_errorModalDataType {
  fromAccount: string;
  DESTBranchName: string;
  toAccount: string;
  destinationAccountHolderName: string;
  DESTBranchID: string;
  amount: string;
}

export const errorModalDefaultData = {
  fromAccNo: "",
  toAccNo: "",
  destAccHolderName: "",
  destBankName: "",
  destBranchName: "",
  transctionAmount: "",
  transctionCharge: "",
};

export const fundTransfer_errorModalDefaultData = {
  fromAccount: "",
  DESTBranchName: "",
  toAccount: "",
  destinationAccountHolderName: "",
  DESTBranchID: "",
  amount: "",
};
