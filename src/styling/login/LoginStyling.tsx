import { Card, Container } from "react-bootstrap";
import styled from "styled-components/macro";

export const LoginContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  flex-direction: column;
  position: relative;

  .image_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: linear-gradient(
      120deg,
      ${(props) => props.theme.secondary} 50%,
      ${(props) => props.theme.primary} 50%
    );
  }

  .login_logo {
    width: 120px;
    height: 120px;
    margin-top: -3rem;
    border-radius: 50%;
    border: 4px solid ${(props) => props.theme.primary};
    /* border-right-color: ${(props) => props.theme.secondary};
    border-bottom-color: ${(props) => props.theme.secondary}; */
  }

  .login_header_text {
    margin: 0;
    margin-top: 1rem;
    font-size: 26px;
    font-weight: bolder;
    color: white;
  }

  /*-------Bootstrap Form Style Customization------------*/
  .form-control {
    width: 100%;
    font-size: 1rem;
    height: 2.6rem;
    padding-right: 2.5rem;
    font-weight: 500;
    border-color: ${(props) => props.theme.primary};

    &:focus {
      color: ${(props) => props.theme.primary};
      background-color: #fff;
      border-color: ${(props) => props.theme.secondary};
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
    }

    &::placeholder {
      font-weight: normal;
      color: #a1a1a1dc;
    }
  }
`;

export const LoginWrapper = styled.div`
  /* border: 1px solid ${(props) => props.theme.primary}; */
  border: 2px solid #f0f0f0;

  .input_wrapper {
    padding-left: 2rem;
    display: flex;
    align-items: center;
    background: ${(props) => props.theme.bgColor};
  }

  input {
    height: 20px;
    width: 20px;
  }

  label {
    padding-left: 1rem;
    padding-top: 5px;
  }
`;

export const EyeContainer = styled.span`
  margin-right: 1.5rem;
  margin-left: -2.5rem;
  z-index: 50;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PoweredBy = styled.div`
  padding: 2rem 1rem 1rem;

  .text_wrapper {
    text-align: center;
    font-weight: bold;
    margin: 0;

    &::after {
      content: ":";
      padding: 0 5px;
    }
  }

  .bold {
    padding-top: 2px;
    font-weight: 500;
  }

  .underline {
    padding-bottom: 5px;
    border-bottom: 3px solid #e2e2e2;
  }
`;
