export interface apiResponse<T> {
  status: string;
  code: string;
  message: string;
  details: T;
  detail: any;
}

export interface transctionHistoryType<tList> {
  lastPage: number;
  transactionList: tList[];
  currentPage: number;
}

export interface transactionListType<r> {
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
  requestDetail: r;
  responseDetail: responseDetailType;
  iconUrl: string;
}

export interface responseDetailType {
  "Result Message": string;
  RefStan: string;
  status: string;
}

export interface transferRequestDetailType {
  destinationBranchName: string;
  destinationAccountNumber: string;
  destinationBankName: string;
  destinationAccountName: string;
}

export interface brokerRequestDetailType {
  customer_address: string;
  amount: string;
  mobile_number: string;
  serviceId: string;
  serviceTo: string;
}
