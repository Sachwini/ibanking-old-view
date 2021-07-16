// load wallet page types
export interface walletListType {
  id: number;
  name: string;
  descOneFieldName: string;
  descOneFieldType: string;
  descOneFixedLength: boolean;
  descOneLength: number;
  descOneMinLength: number;
  descOneMaxLength: number;
  descTwoFieldName: string;
  descTwoFieldType: string;
  descTwoFixedLength: boolean;
  descTwoLength: string;
  descTwoMinLength: number;
  descTwoMaxLength: number;
  icon: string;
  accountHead: string;
  accountNumber: string;
  minAmount: string;
  maxAmount: string;
  status: string;
}

export interface loadFundWalletType {
  account_number: string;
  amount: string;
  desc_one: string;
  desc_two: string;
  wallet_id: string;
  validationIdentifier: string;
  skipValidation: boolean;
}

export interface loadWalletFormDataType {
  fromAccount: string;
  contact: string;
  amount: string;
  remarks: string;
}
