import { apiResponse } from "models/apiResponse";
import {
  accValidationType,
  bankBranchType,
  BankList,
  bankTransferFormDataType,
  getBankBranchDataType,
  getBankListType,
} from "models/for-pages/bankTransferModels";
import { get, post } from "services/AjaxService";

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
  } as getBankBranchDataType;
};

// Get destination Bank  id for BankTransfer
export const getDESTBankID = (
  bankname: string | undefined,
  bankList: BankList[] | undefined
) => {
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

// get transction charges
export const getTransctionCharge = async (
  amount: string,
  destBankId: string
) => {
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
  try {
    const res = await get<accValidationType>(
      `api/account/validation?destinationAccountNumber=${data.toAccount}&destinationAccountName=${data.destAccountHolderName}&destinationBankId=${data.DESTBankID}&destinationBranchId=${data.DESTBranchID}`
    );

    if (res && res.data.detail.status.toLowerCase() === "valid") {
      return {
        status: true,
        message: res.data.detail.message,
      };
    } else {
      return {
        status: false,
        message: res.data.detail.message,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: error.response.data.message,
    };
  }
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
  formData.append(
    "destination_branch_name",
    props.data.DESTBranchName === undefined ? "null" : props.data.DESTBranchName
  );
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
  DESTBranchName: "null",
  DESTBranchID: "null",
  destAccountHolderName: "",
  transctionAmount: "",
  remarks: "",
};

export const getDataFor_BankTransferErrorModal = (
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
