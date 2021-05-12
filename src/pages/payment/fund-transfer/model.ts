export interface fundTransfer {
  from_account_number: string;
  to_account_number: string;
  bank_branch_id: string;
  amount: string;
  mPin: string;
  message: string;
}

export interface brokerPayment {
  accountNumber:string,
	amount:string,
	charge:string,
	brokerCode:string,
	clientName:string,
	clientId:string,
	mobileNumber:string,
	remarks:string,
}