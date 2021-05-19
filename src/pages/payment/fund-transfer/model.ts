// -------------------Bank Transfer Moduls START Here------------------------------
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

// -------------------Bank Transfer Moduls END Here------------------------------

// -------------------Fund Transfer Moduls START Here------------------------------
export interface fundTransfer {
  from_account_number: string;
  to_account_number: string;
  bank_branch_id: string;
  amount: string;
  mPin: string;
  message: string;
}
// -------------------Fund Transfer Moduls END Here------------------------------

// -------------------Broker Payment Moduls START Here------------------------------
export interface brokerPayment {
  accountNumber: string;
  amount: string;
  charge: string;
  brokerCode: string;
  clientName: string;
  clientId: string;
  mobileNumber: string;
  remarks: string;
}
// -------------------Broker Payment Moduls END Here------------------------------
