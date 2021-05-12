import { apiResponse } from "models/apiResponse";
import { bankBranchType, BankList } from "models/BankListType";
import { useEffect } from "react";
import { get } from "services/AjaxService";

export const getOnlyBankNameList = (banklist: BankList[]) => {
  let onlyBankNameList: string[] = [];
  banklist?.map((list) => onlyBankNameList.push(list.bankName));

  return onlyBankNameList;
};

export const getBankId = (bankList: BankList[], DESTBankName: string) => {
  let selectedBankID = "";
  const selectedObj = bankList.find(
    ({ bankName }) => bankName === DESTBankName
  );
  const id = selectedObj?.bankId;
  if (id) {
    selectedBankID = id;
  } else selectedBankID = "";

  return selectedBankID;
};

// ------------------For Bank Crossponding Branch Calculation--------------------

// export const GetBranch = async(selectedBankID: string) => {
//   let branch: bankBranchType[] = [];

//     const loadBankBranch = async () => {
//       const res = await get<apiResponse<bankBranchType[]>>(
//         `/api/ips/bank/branch?bank_id=${selectedBankID}`
//       );
//       if (res) {
//         branch = res.data.details;
//       }
//     };

//   return branch;
// };

export const getOnlyBranchNameList = (branchList: bankBranchType[]) => {
  // let branchList = GetBranch(selectedBankID);

  // get bank Crrosponding bank branch
  let onlyBranchNameList: string[] = [];
  branchList?.map((list) => onlyBranchNameList.push(list.branchName));

  // test data
  // onlyBranchNameList = ["kalanki Branch", "Balaju Branch"];

  return onlyBranchNameList;
};

export const getBranchId = (
  branchList: bankBranchType[],
  DESTBranchName: string
) => {
  let selectedBankBranchID = "";

  if (branchList === null) {
    selectedBankBranchID = "null";
  } else {
    const selectedBranchObj = branchList.find(
      ({ branchName }) => branchName === DESTBranchName
    );
    const id = selectedBranchObj?.branchId;
    if (id) {
      selectedBankBranchID = id;
    } else selectedBankBranchID = "null";
  }

  return selectedBankBranchID;
};

// export const MyFormDataFormat
