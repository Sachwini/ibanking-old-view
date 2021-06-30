export interface BankList {
  bankId: string;
  refBankId: string | null;
  bankName: string;
  enabled: string | null;
  lastModifiedOn: string | null;
  swiftCode: string | null;
}

export interface bankBranchType {
  id: string | null;
  branchId: string;
  bankId: string;
  refBranchId: string | null;
  branchName: string;
  enabled: string | null;
  lastModifiedOn: string | null;
}

export interface bankTransferFormDataType {
  fromAccount: string;
  DESTBankName: string;
  DESTBankID: string | "null";
  toAccount: string;
  destAccountHolderName: string;
  DESTBranchName: string;
  DESTBranchID: string | "null";
  transctionAmount: string;
  // transctionCharge: string;
  remarks: string;
}

export interface getBankListType {
  bankList: BankList[];
  onlyBankNameList: string[];
}

export interface getBankBranchListType {
  bankBranchList: bankBranchType[];
  onlyBankBranchNameList: string[];
}
