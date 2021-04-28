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
  transition: width 0.6s ease-in-out;
`;

export const LayoutContentField = styled.div<LayoutProps>`
  min-height: calc(100vh - 80px);
  width: calc(100% - ${({ width }) => width});
  padding-top: 2em;
  padding-left: 1em;
  padding-bottom: 1em;
  background: #fff;
`;
