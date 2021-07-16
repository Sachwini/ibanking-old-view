import {
  userAccountType,
  userDetailType,
} from "models/for-pages/userAccountModels";
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

export const allAccListDetail = selector({
  key: "all_acc_list_detail",
  get: ({ get }) => {
    const userDetailsData = get(userDetails);
    return userDetailsData.accountDetail;
  },
});

export const setSelectedAccDetail = atom({
  key: "selected_account_details",
  default: {
    isSelected: false,
    selectedAccDetails: {},
  } as {
    isSelected: boolean;
    selectedAccDetails: userAccountType;
  },
});

export const getSelectedAcc = selector({
  key: "account_list",
  get: ({ get }) => {
    const userDetailsData = get(allAccListDetail);
    const selectedAccount = get(setSelectedAccDetail);

    const primaryAccountObj = userDetailsData.find(
      ({ primary }) => primary.toLowerCase() === "true"
    );
    const activeAccount = primaryAccountObj ? primaryAccountObj : {};
    // const activeAccount = userDetailsData[0];

    if (selectedAccount.isSelected) {
      return selectedAccount.selectedAccDetails as userAccountType;
    } else {
      return activeAccount as userAccountType;
    }
  },
});

export const getName_Salutation = selector({
  key: "get_user_salutation",
  get: ({ get }) => {
    const userDetailsData = get(userDetails);

    if (userDetailsData.gender.toLowerCase() === "male") {
      return { salutation: "Mr.", name: userDetailsData.fullName };
    } else if (userDetailsData.gender.toLowerCase() === "female") {
      return { salutation: "Mis.", name: userDetailsData.fullName };
    } else return { salutation: "", name: userDetailsData.fullName };
  },
});
