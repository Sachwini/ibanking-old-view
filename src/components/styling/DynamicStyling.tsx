import styled from "styled-components";

interface SideBarProps {
  customWidth: string;
  BgColor: string;
}

export const SidebarStyle = styled.div<SideBarProps>`
  width: ${(props) => props.customWidth};
  min-height: 100vh;
  position: fixed;
  background: ${(props) => props.BgColor};
  color: white;
  padding: auto;
  z-index: 1200;
`;
