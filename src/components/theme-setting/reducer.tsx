export const initialState = {
  menuButton: false,
  //   user: null,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "MENU_CLICKED":
      return {
        menuButton: action.value,
      };

    default:
      return state;
  }
};

export default reducer;
