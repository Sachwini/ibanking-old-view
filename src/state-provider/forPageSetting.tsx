import { atom } from "recoil";

export const isMenuButtonClicked = atom({
  key: "manu_click_handle",
  default: false as boolean,
});

export const menuActiveHeaderID = atom({
  key: "active_header_ID",
  default: "account" as string,
});

export const menuActiveListID = atom({
  key: "active_lis_ID",
  default: "" as string,
});
