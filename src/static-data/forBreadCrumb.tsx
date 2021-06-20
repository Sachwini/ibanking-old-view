import { breadCrumbType } from "models/breadCrumbType";

const home = {
  title: "home",
  to: "/",
};

export const forDashboard: breadCrumbType[] = [home];

export const forUserAccountDetails: breadCrumbType[] = [
  home,
  {
    title: "AccountDetail",
    to: "#",
  },
];

export const forUserProfile: breadCrumbType[] = [
  home,
  {
    title: "User Profile",
    to: "#",
  },
];

export const forUserServiceSetting: breadCrumbType[] = [
  home,
  {
    title: "User Service Config",
    to: "#",
  },
];

export const forStatement: breadCrumbType[] = [
  home,

  {
    title: "Statement",
    to: "#",
  },
];

export const forFavouriteAccount: breadCrumbType[] = [
  home,
  {
    title: "Facourite Account",
    to: "#",
  },
];

export const forBrokerPayment: breadCrumbType[] = [
  home,
  {
    title: "Broker Payment",
    to: "#",
  },
];

export const forFundTransfer: breadCrumbType[] = [
  home,
  {
    title: "Fund Transfer",
    to: "#",
  },
];

export const forVendorPayment: breadCrumbType[] = [
  home,
  {
    title: "Vendor Payment",
    to: "#",
  },
];

export const forQuickPay: breadCrumbType[] = [
  home,
  {
    title: "Quick Payment",
    to: "#",
  },
];

export const forChequeRequest: breadCrumbType[] = [
  home,
  {
    title: "Cheque Request",
    to: "#",
  },
];

export const forActivityLog: breadCrumbType[] = [
  home,
  {
    title: "Account Activity",
    to: "#",
  },
];
