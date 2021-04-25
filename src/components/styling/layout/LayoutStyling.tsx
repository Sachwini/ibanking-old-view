import styled from "styled-components";

interface LayoutProps {
  width: string;
}

export const LayoutContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const LayoutBodyWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-grow: 1;
`;

export const LayoutSidebar = styled.div<LayoutProps>`
  width: ${(props) => props.width};
`;

export const LayoutContentField = styled.div<LayoutProps>`
  width: calc(100% - ${({ width }) => width});
  padding-top: 2em;
  background: #f1f1f1;
  padding-left: 1em;
  min-height: 100vh;
`;
