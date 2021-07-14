import styled from "styled-components/macro";

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
  padding-top: 1em;
  padding-left: 1em;
  padding-bottom: 1em;
  background: #fff;
`;

export const FooterWrapper = styled.div<LayoutProps>`
  width: calc(100% - ${({ width }) => width});
  padding: 1rem 1rem 0.5rem;
  background-color: ${(props) => props.theme.bgColor};

  margin: 0;
  margin-left: auto;
  margin-top: 5rem;
`;
