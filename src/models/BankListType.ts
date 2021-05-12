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

export interface bankBranchType2 {
  status: "Failure";
  code: "M0001";
  message: "Branch not available.";
  details: null;
  detail: null;
}
