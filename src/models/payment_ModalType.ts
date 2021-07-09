import { bankTransferFormDataType } from "./for-pages/bankTransfer_models";

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
