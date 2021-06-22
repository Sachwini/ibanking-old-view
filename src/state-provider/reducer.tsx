import { StatementDataType } from "pages/user-account/statement/model";
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
  walletDetails: {} !== undefined,
  statementData: {} as StatementDataType,
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
    case "USER_DETAILS":
      return {
        ...state,
        customerDetails: action.customerDetail,
      };

    case "ACCOUNT_STATEMENT":
      return {
        ...state,
        statementData: action.accStatement,
      };

    case "Has_TOKEN":
      return {
        ...state,
        token: action.value,
      };

    case "SWITCH_ACCOUNT":
      return {
        ...state,
        switchAccount: action.value,
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
    case "LOAD_WALLET_DETAILS":
      return {
        ...state,
        walletDetails: action.walletDetails,
      };

    default:
      return state;
  }
};

export default reducer;
