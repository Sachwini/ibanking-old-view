export const initialState = {
  isMenuButtonClick: true,
  menuHeaderId: "account",
  menuListId: "",
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

    default:
      return state;
  }
};

export default reducer;
