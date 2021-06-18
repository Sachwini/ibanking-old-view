import styled from "styled-components/macro";

export const StaticBarContainer = styled.div`
  padding: 0.5rem 0.5rem 1.5rem;
  margin: 0;
`;

export const StaticBarWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dddddd;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

interface PageTitleProps {
  padding?: string;
}

export const PageTitleContainer = styled.div<PageTitleProps>`
  padding: ${(props) => (props.padding ? props.padding : "0.5rem 0 1rem")};
  .page__title {
    font-size: 17.5px;
    font-weight: bold;
    opacity: 0.8;
    margin: 0;
    padding-bottom: 0.3rem;
    text-transform: capitalize;
  }

  .page_subTitle {
    font-size: 13px;
    opacity: 0.5;
    font-weight: bold;
    margin-bottom: 0.9rem;
  }
`;

// bread crumb styling going here
interface breadCrumbProps {
  bgCtrl: string;
}
export const BreadCrumbSection = styled.div<breadCrumbProps>`
  display: inline-flex;
  flex-wrap: nowrap;

  font-weight: bold;
  text-transform: capitalize;
  background-color: ${(props) =>
    props.bgCtrl === "yes" ? "#f5f5f5cf" : "transparent"};
  padding: 0.5rem 2rem;

  a {
    text-decoration: none;
    font-size: 15px;
    /* color: ${(props) => props.theme.primary}; */

    &:hover {
      color: ${(props) => props.theme.secondary};
    }

    &::after {
      content: "/";
      color: ${(props) => props.theme.primary};
      font-weight: bolder;
      padding: 0 5px;
      text-decoration: none;
    }

    &:last-child {
      font-size: 15px;
      /* color: ${(props) => props.theme.secondary}; */
      color: #4d4d4dcf;

      &::after {
        content: none;
        vertical-align: middle;
      }
    }
  }
`;

export const UserDetect = styled.strong`
  /* color: ${(props) => props.theme.secondary}; */
  color: #007bff;
  opacity: 1;
  padding: 0 5px;
  border-bottom: 1px dotted ${(props) => props.theme.primary};
  font-size: 15px;
`;
