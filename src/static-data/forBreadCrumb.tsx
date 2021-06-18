import { breadCrumbType } from "models/breadCrumbType";

const home = {
  title: "home",
  to: "/",
};

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
