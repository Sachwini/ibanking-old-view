// our site default Theme it is apply when customer doesnot set their theme color:
export const defaultTheme = {
  primaryColor: "#01083d",
  secondaryColor: "#069b3f",
};

// Getting Customer Theme color if they set it:
const userThemeColor = {
  primaryColor: "",
  secondaryColor: "",
};

// setting our custome theme to for Customer login Dashboard according to the theme
// color which can be default if customer doesn't provide their own Theme color

export const theme = {
  // ---------Default Theme color defining START Here--------
  primary: userThemeColor.primaryColor
    ? userThemeColor.primaryColor
    : defaultTheme.primaryColor,

  secondary: userThemeColor.secondaryColor
    ? userThemeColor.secondaryColor
    : defaultTheme.secondaryColor,
  // ---------Default Theme color defining END Here-----------

  alert: "red",
};

export type ThemeType = typeof theme;
