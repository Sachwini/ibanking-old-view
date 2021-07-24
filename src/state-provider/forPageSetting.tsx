import { ReactNode } from "react";
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

export const isLoading = atom({
  key: "is_loading",
  default: false as boolean,
});

// toaster setting is here
export interface tosterType {
  isTost: boolean;
  state: string;
  message: string | ReactNode;
}

export const tosterSetting = atom({
  key: "toaster_settings",
  default: {
    isTost: false,
    state: "",
    message: "Thank You for being with us 🙂",
  } as tosterType,
});

export const isFavAccAdded = atom({
  key: "is_favAcc_added",
  default: false as boolean,
});
