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
  DESTBranchName: string | "null";
  DESTBranchID: string | "null";
  transctionAmount: string;
  remarks: string;
}

export interface getBankListType {
  bankList: BankList[];
  onlyBankNameList: string[];
}

export interface getBankBranchDataType {
  bankBranchList: bankBranchType[];
  onlyBankBranchNameList: string[];
}

export interface accValidationType {
  status: string;
  code: string;
  message: string;
  details: any;
  detail: {
    status: string;
    message: string;
    matchPercentage: number;
  };
}

export const getBankListDefaultValue = {
  bankList: [
    {
      bankId: "",
      refBankId: "",
      bankName: "",
      enabled: "",
      lastModifiedOn: "",
      swiftCode: "",
    },
  ],
  onlyBankNameList: [],
};

export const getBankBranchDataDefaultValue = {
  bankBranchList: [
    {
      id: "",
      branchId: "",
      bankId: "",
      refBranchId: "",
      branchName: "",
      enabled: "",
      lastModifiedOn: "",
    },
  ],
  onlyBankBranchNameList: [],
};

export const accValidationDefaultValue = {
  status: false,
  message: "Something Going Wrong, Please Try Again. Thank You...",
};
