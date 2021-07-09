export interface apiResponse<T> {
  status: string;
  code: string;
  message: string;
  details: T;
  detail: any;
}

export interface transctionHistoryType {
  lastPage: number;
  transactionList: transactionListType[];
  currentPage: number;
}

export interface transactionListType {
  amount: number;
  service: string;
  serviceTo: string;
  accountNumber: string;
  transactionIdentifier: string;
  date: string;
  status: string;
  airlinesPdfUrl: any;
  sessionId: any;
  id: number;
  createdDate: string;
  destination: string;
  charge: number;
  requestDetail: requestDetailType;
  responseDetail: responseDetailType;
  iconUrl: string;
}

export interface requestDetailType {
  destinationBranchName: string;
  destinationAccountNumber: string;
  destinationBankName: string;
  destinationAccountName: string;
}

export interface responseDetailType {
  "Result Message": string;
  RefStan: string;
  status: string;
}
