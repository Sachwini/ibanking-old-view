export interface userDetailType {
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
  accountDetail: userAccountType[];
  oauthTokenCount: number;
  firebaseToken: boolean;

  otpString: string;
  bankTransferOtp: boolean;
  registered: boolean;
}

export interface userAccountType {
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

export const activeAccDefaultValue = {
  interestRate: "",
  accountType: "",
  branchName: "",
  accruedInterest: "",
  accountNumber: "",
  accountHolderName: "",
  availableBalance: "",
  branchCode: "",
  mainCode: "",
  minimumBalance: "",
  clientCode: "",
  mobileBanking: "",
  sms: "",
  id: "",
  primary: "",
};

// change mpin type
export interface changeMpinType {
  currentMpin: string;
  newMpin: string;
  confirmMpin: string;
}

export interface changeMpinErrorType {
  message: string;
  password: string;
  repassword: string;
  oldPassword: string;
}
