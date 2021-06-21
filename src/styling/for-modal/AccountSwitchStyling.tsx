import styled, { css } from "styled-components/macro";

// Account Wrapper styling going form here
interface accountWrapperProps {
  active?: string;
}
export const AccountWrapper = styled.div<accountWrapperProps>`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0.5rem;
  padding-left: 1rem;
  margin: 0.8rem 0;
  background: ${(props) => (props.active === "yes" ? "#b6e7d7" : "#f9f9f9")};
  border-radius: 5px;
  cursor: pointer;

  ${(props) =>
    props.active === "yes" &&
    css`
      .active_span {
        padding: 10px;
        background-color: green;
        border-radius: 50%;
        position: relative;
        left: -1.9rem;
        top: -0.8rem;
        transition: all 0.5s;
      }

      transition: all 0.5s;
    `}

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: ${(props) => (props.active === "yes" ? "#b6e7d7" : "#eeeeee")};
  }
`;

// icon wrapper styling going from here

export const IconWrapper = styled.div<accountWrapperProps>`
  border-radius: 50%;
  border: 2px solid
    ${(props) =>
      props.active === "yes" ? props.theme.primary : props.theme.secondary};
  padding: 0.5rem;
  font-weight: bolder;
  margin-right: 1rem;

  ${(props) =>
    props.active === "yes" &&
    css`
      transition: all 0.5s;
    `}
`;

export const AccountInfoWrapper = styled.div`
  .account_number {
    font-weight: bold;
    margin: 0;
  }

  .account_type {
    opacity: 0.6;
    margin: 0;
  }
`;
