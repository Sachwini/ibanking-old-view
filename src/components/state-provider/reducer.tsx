export const initialState = {
  isMenuButtonClick: true,
  menuHeaderId: "account",
  menuListId: "",
  isLogin: false,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "MENU_CLICKED":
      return {
        isMenuButtonClick: action.value,
      };

    case "MENU_HEADER_ID":
      return {
        menuHeaderId: action.value,
      };

    case "MENU_LIST_ID":
      return {
        menuListId: action.value,
      };

    case "IS_LOGIN":
      return {
        isLogin: action.value,
      };
    case "Has_TOKEN":
      return {
        token: action.value
      }

    default:
      return state;
  }
};

export default reducer;
