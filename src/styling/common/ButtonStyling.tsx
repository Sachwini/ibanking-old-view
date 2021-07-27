import styled from "styled-components/macro";

interface ButtonProps {
  color?: string;
  hoverColor?: string;
  radious?: string;
  padding?: string;
  bg?: string;
  width?: string;
}

export const MyButton = styled.button<ButtonProps>`
  border: none;
  text-align: center;

  background: ${(props) => (props.bg ? props.bg : props.theme.secondary)};
  color: ${(props) => (props.color ? props.color : "#f1f1f1")};
  padding: ${(props) => (props.padding ? props.padding : "0.5rem 0.8rem")};

  border-radius: 0.35rem;
  width: ${(props) => (props.width ? props.width : "")};

  font-weight: bolder;
  letter-spacing: 2px;
  font-size: 18px;

  &:hover {
    opacity: 0.9;
    transition: all 0.4s;
  }

  &:active {
    background: ${(props) => props.theme.primary};
    animation-delay: 1s;
  }
`;

// simple button styling going here
interface buttonWrapperProps {
  padding?: string;
}

export const ButtonWrapper = styled.div<buttonWrapperProps>`
  text-align: center;
  padding: ${(props) => (props.padding ? props.padding : "0.5rem")};

  .btn_ctrl {
    font-weight: bold;
    text-transform: uppercase;
    border: 1px solid ${(props) => props.theme.secondary};

    &:hover {
      border: 1px solid transparent;
    }
  }
`;
