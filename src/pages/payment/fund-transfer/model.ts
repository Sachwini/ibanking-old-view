// -------------------Fund Transfer Moduls START Here------------------------------
export interface fundTransfer {
  from_account_number: string;
  to_account_number: string;
  bank_branch_id: string;
  amount: string;
  mPin: string;
  message: string;
  details: string;
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

export interface TransactionLimit {
  title: string;
  perTransactionLimit: number;
  dailyCountLimit: number;
  remainingDailyCount: number;
  dailyAmountLimit: number;
  remainingDailyAmount: number;
  monthlyAmountLimit: number;
  remainingMonthlyAmount: number;
}

export interface fundTransferFormDataType {
  fromAccount: string;
  DESTBranchName: string;
  toAccount: string;
  destinationAccountHolderName: string;
  DESTBranchID: string | "null";
  amount: string;
}

