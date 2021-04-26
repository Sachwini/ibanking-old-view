// our site default Theme it is apply when customer doesnot set their theme color:
export const defaultTheme = {
  primaryColor: "#01083d",
  secondaryColor: "#069b3f",
};

export const defaultTextColor = {
  primaryTextColor: "#fff",
  secondaryTextColor: "#01083d",
};

// Getting Customer Theme color if they set it:
const userThemeColor = {
  primaryColor: "#444",
  secondaryColor: "",
};

const userTextColor = {
  primaryTextColor: "",
  secondaryTextColor: "",
};

// setting our custome theme to for Customer login Dashboard according to the theme
// color which can be default if customer doesn't provide their own Theme color
export const theme = {
  primary: userThemeColor.primaryColor
    ? userThemeColor.primaryColor
    : defaultTheme.primaryColor,

  secondary: userThemeColor.secondaryColor
    ? userThemeColor.secondaryColor
    : defaultTheme.secondaryColor,

  textPrimaryColor: defaultTextColor.primaryTextColor,
  textSecondaryColor: defaultTextColor.secondaryTextColor,
  alert: "red",
};
