export interface userDetail {
  fullName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  mobileNumber: string;
  email: string;

  state: string;
  city: string;
  addressOne: string;
  addressTwo: string;

  bank: string;
  bankBranch: string;
  bankBranchCode: string;
  bankCode: string;

  alertType: boolean;
  mobileBanking: boolean;
  smsService: boolean;
  appVerification: boolean;
  beneficiaryFlag: boolean;
  deviceToken: string;
  accountDetail: userAccount[];
  oauthTokenCount: number;
  firebaseToken: boolean;

  otpString: string;
  bankTransferOtp: boolean;
  registered: boolean;
}

export interface userAccount {
  interestRate: string;
  accountType: string;
  branchName: string;
  accruedInterest: string;
  accountNumber: string;
  accountHolderName: string;
  availableBalance: string;
  branchCode: string;
  mainCode: string;
  minimumBalance: string;
  clientCode: string;
  mobileBanking: string;
  sms: string;
  id: string;
  primary: string;
}
