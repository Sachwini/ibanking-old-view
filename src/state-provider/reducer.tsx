import { getBearerToken } from "services/AuthService";

const token = getBearerToken();

export const initialState = {
  isMenuButtonClick: true,
  menuHeaderId: "account",
  menuListId: "",
  isLogin: false,
  customerDetails: {},
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "MENU_CLICKED":
      return {
        isMenuButtonClick: action.value,
      };

    case "MENU_HEADER_ID":
      return {
        menuHeaderId: action.headerID,
      };

    case "MENU_LIST_ID":
      return {
        menuListId: action.listID,
      };

    case "IS_LOGIN":
      return {
        isLogin: action.value,
      };
    case "Has_TOKEN":
      return {
        token: action.value,
      };

    case "USER_DETAILS":
      return {
        customerDetails: action.customerDetail,
      };

    default:
      return state;
  }
};

export default reducer;
