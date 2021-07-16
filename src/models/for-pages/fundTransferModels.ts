export interface getBranchFundTransferType {
  id: number;
  name: string;
  address: string;
  branchCode: string;
  bank: string;
  city: string;
  checker: boolean;
  maker: boolean;
  state: string;
  bankId: number;
  bankCode: string;
  email: string;
  branchId: string;
  latitude: string;
  longitude: string;
  nchl: string;
  fax: string;
  telephoneNumber: string;
  branchManager: string;
}

export interface getBankBranchList_FundTransferType {
  branchList: getBranchFundTransferType[];
  onlyBranchNameList: string[];
}

export interface fundTransferFormDataType {
  fromAccount: string;
  DESTBranchName: string;
  toAccount: string;
  destinationAccountHolderName: string;
  DESTBranchID: string | "null";
  amount: string;
}
