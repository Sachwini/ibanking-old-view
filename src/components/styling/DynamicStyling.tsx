import styled, { css } from "styled-components";
import { defaultTheme, defaultTextColor } from "./DefaultTheme";
interface SideBarProps {
  customWidth: string;
}

const userThemeColor = {
  primaryColor: "gray",
  secondaryColor: "purple",
};

export const theme = {
  primary: userThemeColor.primaryColor
    ? userThemeColor.primaryColor
    : defaultTheme.primaryColor,
  secondary: userThemeColor.secondaryColor
    ? userThemeColor.secondaryColor
    : defaultTheme.secondaryColor,
  textPrimaryColor: defaultTextColor.primaryTextColor,
  font: "Cursive",
  alert: "red",
};

export const SidebarStyle = styled.div<SideBarProps>`
  width: ${(props) => props.customWidth};
  min-height: 100vh;
  position: fixed;
  background: ${(props) => props.theme.primary};
  color: white;
  padding: auto;
  z-index: 1200;
`;

export const SideBarText: any = styled.span`
  color: ${(props) => props.theme.textPrimaryColor};

  &:hover {
    color: ${(props) => props.theme.secondary};
  }
`;
