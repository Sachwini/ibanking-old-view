import { apiResponse } from "models/apiResponse";
import { userDetailType } from "models/for-pages/userAccount_PageModels";
import {
  bankBranchType,
  BankList,
  bankTransferFormDataType,
  getBankBranchListType,
  getBankListType,
} from "pages/payment/fund-transfer/model";
import { get, post } from "services/AjaxService";

export const loadUserDetails = async () => {
  const res = await get<apiResponse<userDetailType>>(
    "api/customerdetails?additionalDetails=true"
  );

  return res && res.data.details;
};

export const GetBankList = async () => {
  const res = await get<apiResponse<BankList[]>>("/api/ips/bank");

  return {
    bankList: res && res.data.details,
    onlyBankNameList: res.data.details.map((item) => {
      return item.bankName;
    }),
  } as getBankListType;
};

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

export const isAccountValid = async (data: bankTransferFormDataType) => {
  // Checking Beneficiary Account Details
  const isValid = await get<apiResponse<any>>(
    `api/account/validation?destinationAccountNumber=${data.toAccount}&destinationAccountName=${data.destAccountHolderName}&destinationBranchId=${data.DESTBranchID}&destinationBankId=${data.DESTBankID}`
  );

  if (
    isValid.data.detail.status === "valid" &&
    isValid.data.detail.matchPercentage === 100
  ) {
    return true;
  } else {
    return {
      status: isValid.data.detail.status,
      message: isValid.data.detail.message,
    };
  }
};
