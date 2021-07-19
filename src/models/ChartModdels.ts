export interface charDataType {
  status: string;
  code: string;
  message: string;
  details: any;
  detail: chartDetailType;
}

export interface chartDetailType {
  openingBalance: number;
  closingBalance: number;
  minimumBalance: number;
  maximumBalance: number;
  balanceList: chartBalanceListType[];
  accountStatementList: chartBalanceListType[];
}

export interface chartBalanceListType {
  day: number;
  balance: number;
}

export interface chartStatementList {
  transactionDate: string;
  remarks: string;
  debit: null | number;
  credit: null | number;
  balance: number;
}

export interface balanceDetailType {
  openingBalance: number;
  closingBalance: number;
  minimumBalance: number;
  maximumBalance: number;
}

export const balanceDetailDefaultValue = {
  openingBalance: 0,
  closingBalance: 0,
  minimumBalance: 0,
  maximumBalance: 0,
};
