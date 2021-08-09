import { configDataType } from "models/apiResponse";
import { atom } from "recoil";

export const clientCofigData = atom({
  key: "client_config_data",
  default: {
    name: "",
    themeColorPrimary: "",
    themeColorSecondary: "",
    bannerUrl: "",
    logoUrl: "",
    clientID: "",
    clientSecret: "",
    address: "",
    contactNumber: "",
    facebookUrl: "",
    registerUrl: "",
    email: "",
    websiteUrl: "",
  } as configDataType,
});
