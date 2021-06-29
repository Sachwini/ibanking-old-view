import { userDetailType } from "models/for-pages/userAccount_PageModels";
import { atom, selector } from "recoil";
import { getBearerToken } from "services/AuthService";

const token = getBearerToken();

export const isUserLoggedIN = atom({
  key: "is_user_logged_IN",
  default: (token !== undefined && token === "") as boolean,
});

export const userDetails = atom({
  key: "user_details",
  default: {
    fullName: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    mobileNumber: "",
    email: "",

    state: "",
    city: "",
    addressOne: "",
    addressTwo: "",

    bank: "",
    bankBranch: "",
    bankBranchCode: "",
    bankCode: "",

    alertType: false,
    mobileBanking: false,
    smsService: false,
    appVerification: false,
    beneficiaryFlag: false,
    deviceToken: "",
    accountDetail: [
      {
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
      },
    ],
    oauthTokenCount: 0,
    firebaseToken: false,

    otpString: "",
    bankTransferOtp: false,
    registered: false,
  } as userDetailType,
});

// Get Account types on the basis of condition
interface bankAccountType {
  mainCode: string[];
  accNo: string[];
}

export const getBankAccNo = selector({
  key: "get_bank_acc_no",
  get: ({ get }) => {
    // const accountList: bankAccountType = { mainCode: [], accNo: [] };
    let collection = new Map();
    const userDetailsData = get(userDetails);

    userDetailsData.accountDetail.map((acc) => {
      collection.set(acc.mainCode, acc.accountNumber);
    });

    let accountList: bankAccountType[] = Array.from(
      collection,
      ([mainCode, accNo]) => ({
        mainCode,
        accNo,
      })
    );

    return accountList;
  },
});
