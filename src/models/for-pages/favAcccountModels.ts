export interface favAccType {
  id: number;
  reminderType: string;
  serviceInfoType: string;
  associatedId: null;
  created: string;
  reminderDate: string;
  data: favAccListType;
}

export interface favAccListType {
  destinationAccountHolderName: string;
  destinationAccountNumber: string;
  destinationBankName: string;
}
