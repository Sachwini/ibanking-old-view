import { apiResponse } from "models/apiResponse";
import { accValidationType } from "models/for-pages/bankTransferModels";
import {
  fundTransferFormDataType,
  getBankBranchData_FundTransferType,
  getBranchFundTransferType,
} from "models/for-pages/fundTransferModels";
import { get, post } from "services/AjaxService";

export const getBranchList = async () => {
  const res = await get<apiResponse<getBranchFundTransferType[]>>(
    `/get/bankbranches?`
  );

  return {
    branchList: res && res.data.details,
    onlyBranchNameList:
      res &&
      res.data.details.map((item) => {
        return item.name;
      }),
  } as getBankBranchData_FundTransferType;
};

export const getBranchDetail = (
  branchName: string | undefined,
  branchList: getBranchFundTransferType[] | undefined
) => {
  if (
    branchList &&
    branchList !== undefined &&
    branchName !== undefined &&
    branchName !== ""
  ) {
    const obj = branchList.find(({ name }) => name === branchName);
    const id = obj?.id;
    const branchCode = obj?.branchCode;

    if (id && branchCode) {
      return {
        branchId: id,
        branchCode: branchCode,
      };
    }
  } else
    return {
      branchId: "null",
      branchCode: "",
    };
};

export const accountValidation = async (data: fundTransferFormDataType) => {
  console.log("data getting? ", data);
  try {
    const res = await get<accValidationType>(
      `/api/account/validation?destinationAccountNumber=${data.toAccount}&destinationAccountName=${data.destinationAccountHolderName}&destinationBranchId=${data.DESTBranchID}`
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

export const fundTransfer = async (
  data: fundTransferFormDataType,
  isotpRequired: boolean,
  otp: string,
  mpin: string
) => {
  if (isotpRequired) {
    const res = await post<apiResponse<any>>(
      `/api/fundtransfer?from_account_number=${
        data.fromAccount
      }&to_account_number=${
        data.DESTBranchCode + data.toAccount
      }&bank_branch_id=${data.DESTBranchID}&amount=${
        data.amount
      }&mPin=${mpin}&remarks=${data.remarks}&otp=${otp}`,
      {}
    );

    if (res) {
      return res && res.data;
    }
  } else {
    const res = await post<apiResponse<any>>(
      `/api/fundtransfer?from_account_number=${
        data.fromAccount
      }&to_account_number=${
        data.DESTBranchCode + data.toAccount
      }&bank_branch_id=${data.DESTBranchID}&amount=${
        data.amount
      }&mPin=${mpin}&remarks=${data.remarks}`,
      {}
    );
    if (res) {
      return res && res.data;
    }
  }
};

export const getDataFor_FundTransferErrorModal = (
  data: fundTransferFormDataType
) => {
  return {
    fromAccount: data.fromAccount,
    DESTBranchName: data.DESTBranchName,
    toAccount: data.toAccount,
    destinationAccountHolderName: data.destinationAccountHolderName,
    DESTBranchID: data.DESTBranchID,
    amount: data.amount,
  };
};

export const fundTransfer_formData_DefaultValue = {
  fromAccount: "",
  DESTBranchName: "",
  toAccount: "",
  destinationAccountHolderName: "",
  DESTBranchID: "null",
  DESTBranchCode: "",
  amount: "",
  remarks: "",
};
