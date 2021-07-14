import {
  apiResponse,
  transactionListType,
  transctionHistoryType,
  transferRequestDetailType,
} from "models/apiResponse";
import { userDetailType } from "models/for-pages/userAccount_PageModels";
import {
  accValidationType,
  bankBranchType,
  BankList,
  bankTransferFormDataType,
  getBankBranchListType,
  getBankListType,
} from "models/for-pages/bankTransfer_models";
import { get, post } from "services/AjaxService";
import { errorModalDataType } from "models/payment_ModalType";

export const loadUserDetails = async () => {
  const res = await get<apiResponse<userDetailType>>(
    "api/customerdetails?additionalDetails=true"
  );

  return res && res.data.details;
};

// Get bank List for Bank Transfer
export const GetBankList = async () => {
  const res = await get<apiResponse<BankList[]>>("/api/ips/bank");

  return {
    bankList: res && res.data.details,
    onlyBankNameList: res.data.details.map((item) => {
      return item.bankName;
    }),
  } as getBankListType;
};

// Get bank Branch List for Bank Transfer
export const GetBankBranchList = async (BankId: string) => {
  const res = await get<apiResponse<bankBranchType[]>>(
    `/api/ips/bank/branch?bank_id=${BankId}`
  );

  return {
    bankBranchList: res && res.data.details,
    onlyBankBranchNameList:
      res &&
      res.data.details.map((item) => {
        return item.branchName;
      }),
  } as getBankBranchListType;
};

// Get destination Bank  id for BankTransfer
export const getDESTBankID = (
  bankname: string | undefined,
  bankList: BankList[] | undefined
) => {
  // finding Bank id
  if (bankList && bankname !== undefined && bankname !== "") {
    const obj = bankList.find(({ bankName }) => bankName === bankname);
    const id = obj?.bankId;
    if (id) {
      return id;
    } else {
      return "";
    }
  } else return "";
};

// Get destination bank Branch id for BankTransfer
export const getBankBranchID = (
  branchame: string | undefined,
  branchList: bankBranchType[] | undefined
) => {
  if (
    branchList &&
    branchList !== undefined &&
    branchame !== undefined &&
    branchame !== ""
  ) {
    const obj = branchList.find(({ branchName }) => branchName === branchame);
    const id = obj?.branchId;
    if (id) {
      return id;
    } else {
      return "null";
    }
  } else return "null";
};

export const getTransctionCharge = async (
  amount: string,
  destBankId: string
) => {
  // get transction charge
  const charge = await post<apiResponse<number>>(
    `api/ips/scheme/charge?amount=${amount}&destinationBankId=${destBankId}`,
    {}
  );
  if (charge) {
    return charge.data.details.toString();
  } else return "";
};

// Validate Account Credentials Of Account holder For BankTransfer
export const isAccountValid = async (data: bankTransferFormDataType) => {
  const isValid = await get<apiResponse<accValidationType>>(
    `api/account/validation?destinationAccountNumber=${data.toAccount}&destinationAccountName=${data.destAccountHolderName}&destinationBranchId=${data.DESTBranchID}&destinationBankId=${data.DESTBankID}`
  );

  return isValid && (isValid.data.detail as accValidationType);
};

// managing form data format
interface formDataFormatType {
  data: bankTransferFormDataType;
  isOTPRequired: boolean;
  transctionCharge: string;
  OTP: string;
  mPin: string;
}
export const formDataFormat = (props: formDataFormatType) => {
  const formData = new FormData();

  formData.append("account_number", props.data.fromAccount);
  formData.append("amount", props.data.transctionAmount);
  formData.append("charge", props.transctionCharge);
  formData.append("destination_bank_id", props.data.DESTBankID);
  formData.append("destination_bank_name", props.data.DESTBankName);
  formData.append("destination_branch_id", props.data.DESTBranchID);
  formData.append("destination_branch_name", props.data.DESTBranchName);
  formData.append("destination_name", props.data.destAccountHolderName);
  formData.append("destination_account_number", props.data.toAccount);
  formData.append("remarks", props.data.remarks);
  formData.append("mPin", props.mPin);
  formData.append("skipValidation", "true");
  if (props.isOTPRequired) {
    formData.append("otp", props.OTP);
  }
  return formData;
};

export const formData_DefaultValue = {
  fromAccount: "",
  toAccount: "",
  DESTBankName: "",
  DESTBankID: "null",
  DESTBranchName: "",
  DESTBranchID: "null",
  destAccountHolderName: "",
  transctionAmount: "",
  remarks: "",
};

export const getTransctionHistory = async (mpin: string, pageNo?: number) => {
  const res = await get<
    apiResponse<
      transctionHistoryType<transactionListType<transferRequestDetailType>>
    >
  >(`api/transactionhistory?mPin=${mpin}&page_no=${pageNo ? pageNo : 1}`);

  return res && res.data.details;
};

export const generatePDF = async (identifier: string) => {
  const res = await get<apiResponse<any>>(
    `/api/gettransactionreceiptpdf?transactionId=${identifier}`
  );
  if (res && res.data.detail === null) {
    return { status: false, message: res.data.message, url: "" };
  } else
    return {
      status: true,
      message: res.data.message,
      url: res.data.detail.URL,
    };
};

export const getDataForErrorModal = (
  data: bankTransferFormDataType,
  transctionCharge: string
) => {
  return {
    fromAccNo: data.fromAccount,
    toAccNo: data.toAccount,
    destAccHolderName: data.destAccountHolderName,
    destBankName: data.DESTBankName,
    destBranchName: data.DESTBranchName,
    transctionAmount: data.transctionAmount,
    transctionCharge: transctionCharge,
  };
};
