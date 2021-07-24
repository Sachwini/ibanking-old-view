import styled, { css } from "styled-components/macro";

interface pageNumberContainerProps {
  align: "flex-start" | "flex-end" | "center";
}
export const PageNumberContainer = styled.div<pageNumberContainerProps>`
  width: 100%;
  display: flex;
  justify-content: ${(props) => props.align};
  align-items: center;
`;

// pagenumberContainer styling going here
interface pageNumberListContainerProps {
  padding?: string;
  bg?: string;
  margin?: string;
}
export const PageNumberListContainer = styled.ul<pageNumberListContainerProps>`
  list-style: none;
  background: ${(props) => (props.bg ? props.bg : "#fafafa")};
  padding: ${(props) => (props.padding ? props.padding : "0.5rem 1rem")};
  margin: ${(props) => (props.margin ? props.margin : "0.5rem")};
  width: fit-content;
`;

// custome pagination styling is going here
interface pageNumberProps {
  active: boolean;
  activeColor?: string;
  activeBg?: string;
  color?: string;
}

export const PageNumberList = styled.li<pageNumberProps>`
  margin: 0 2px;
  padding: 0.3rem 0.8rem;
  cursor: pointer;
  background: transparent;
  font-weight: 500;
  /* opacity: 0.7; */
  text-align: center;
  text-transform: capitalize;
  display: inline-block;
  min-width: 2rem;
  border-radius: 2px;
  transition: all 0.4s;
  color: ${(props) => (props.color ? props.color : "initial")};

  ${(props) =>
    props.active &&
    css`
    /* opacity: 1;  */
      background: ${props.activeBg ? props.activeBg : "#046ffcce"}};
      color: ${props.activeColor ? props.activeColor : "#ffff"}};

      &:hover{
           /* opacity: 1;  */
          background: ${props.activeBg ? props.activeBg : "#046ffcce"}};    
      }    
    `}

  &:hover {
    background: #02020224;

    ${(props) =>
      props.active &&
      css`
        /* opacity: 1;  */
        background: ${props.activeBg ? props.activeBg : "#046ffcce"}};    
    `}
  }

  &:active,
  &:focus {
    opacity: 1;
    background: #bebebe;
    font-weight: 600;
  }

  button {
    padding: -0.3rem -0.8rem;
    border: none;
    background: transparent;
    transition: all 0.2s;
    font-weight: 700;

    &:active {
      padding: -0.3rem -0.8rem;
      background: #bebebe;
    }
  }
`;
