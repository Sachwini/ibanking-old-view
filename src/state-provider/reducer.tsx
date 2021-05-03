import { getBearerToken } from "services/AuthService";

const token = getBearerToken();

export const initialState = {
  isMenuButtonClick: true,
  menuHeaderId: "account",
  menuListId: "",
  isLogin: token !== undefined,
  customerDetails: {} !== undefined,
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

    case "USER_DETAILS":
      return {
        ...state,
        customerDetails: action.customerDetail,
      };

    default:
      return state;
  }
};

export default reducer;
