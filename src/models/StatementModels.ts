export interface StatementDataType {
  openingBalance: number;
  closingBalance: number;
  fromDate: string;
  toDate: string;
  accountNumber: string;
  accountType: string;
  address: string;
  pdfUrl: null | string;
  accountStatementDtos: Sdetails[];
}

export interface Sdetails {
  transactionDate: string;
  remarks: string;
  debit: number | null;
  credit: number | null;
  balance: number | null;
}
