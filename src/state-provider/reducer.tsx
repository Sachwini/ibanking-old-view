import { getBearerToken } from "services/AuthService";

const token = getBearerToken();

export const initialState = {
  isMenuButtonClick: true,
  menuHeaderId: "account",
  menuListId: "",
  isLogin: token !== undefined,
  customerDetails: {} !== undefined,
  fundTransferDetails: {},
  bankTransferDetails: {},
  brokerPaymentDetails: {},
  switchAccount: 0,
  breadCrumbData: [],
  pageTitle: {},
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "MENU_CLICKED":
      return {
        ...state,
        isMenuButtonClick: action.value,
      };

    case "MENU_HEADER_ID":
      return {
        ...state,
        menuHeaderId: action.headerID,
      };

    case "MENU_LIST_ID":
      return {
        ...state,
        menuListId: action.listID,
      };

    case "IS_LOGIN":
      return {
        ...state,
        isLogin: action.value,
      };
    case "Has_TOKEN":
      return {
        ...state,
        token: action.value,
      };
    case "BREAD_CRUMB":
      return {
        ...state,
        breadCrumbData: action.breadCrumbsData,
      };
    case "PAGE_TITLE":
      return {
        ...state,
        pageTitle: action.pageTitleData,
      };
    case "SWITCH_ACCOUNT":
      return {
        ...state,
        switchAccount: action.value,
      };

    case "USER_DETAILS":
      return {
        ...state,
        customerDetails: action.customerDetail,
      };
    case "FUND_TRANSFER_DETAILS":
      return {
        ...state,
        fundTransferDetails: action.fundTransferDetails,
      };
    case "BANK_TRANSFER_DETAILS":
      return {
        ...state,
        bankTransferDetails: action.bankTransferDetails,
      };
    case "BROKER_PAYMENT_DETAILS":
      return {
        ...state,
        brokerPaymentDetails: action.brokerPaymentDetails,
      };

    default:
      return state;
  }
};

export default reducer;
