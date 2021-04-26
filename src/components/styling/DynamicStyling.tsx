import styled, { css } from "styled-components";

interface SideBarProps {
  customWidth: string;
}

interface MenuListProps {
  status: string;
}

export const SidebarStyle = styled.div<SideBarProps>`
  width: ${(props) => props.customWidth};
  min-height: 100vh;
  position: fixed;
  background: ${(props) => props.theme.primary};
  color: white;
  padding: auto;
  z-index: 1200;
`;

export const SideBarText = styled.span<MenuListProps>`
  color: ${(props) => props.theme.textPrimaryColor};

  &:hover {
    color: ${(props) => props.theme.secondary};
  }
  ${({ status }) =>
    status === "active" &&
    css`
      margin-left: -1.2em;
      margin-right: 1em;
      border-left: 3px solid red;
    `}
`;
