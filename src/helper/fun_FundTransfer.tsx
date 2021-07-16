import { apiResponse } from "models/apiResponse";
import {
  fundTransferFormDataType,
  getBankBranchList_FundTransferType,
  getBranchFundTransferType,
} from "models/for-pages/fundTransferModels";
import { get } from "services/AjaxService";

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
  } as getBankBranchList_FundTransferType;
};

export const getFundTransferBranchID = (
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
    if (id) {
      return id;
    } else {
      return "null";
    }
  } else return "null";
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
  amount: "",
};
