import { apiResponse } from "models/apiResponse";
import {
  getBankBranchList_FundTransferType,
  getBranchFundTransferType,
} from "models/for-pages/fundTransfer_PageModals";
import { get } from "services/AjaxService";

export const GetBankBranchList = async (BankId: string) => {
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
