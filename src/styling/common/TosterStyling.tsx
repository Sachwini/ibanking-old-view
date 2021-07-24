import { Toast } from "react-bootstrap";
import styled, { css } from "styled-components/macro";

// toster styling ging here
interface tosterProps {
  state?: string;
}

export const CusomToster = styled(Toast)`
  position: fixed;
  left: 40%;
  top: 1rem;
  z-index: 1300;

  max-width: fit-content;
  max-height: fit-content;
  min-width: 25rem;
  min-height: 7rem;

  background: #ffff;
  box-shadow: 0px 5px 30px 2px rgba(0, 0, 0, 0.28);

  /* border: 1px groove
    ${(props) => (props.borderColor ? props.borderColor : "green")}; */

  ${(props) =>
    props.state === "error" &&
    css`
      box-shadow: 0px 5px 30px 1px rgba(255, 0, 0, 0.18);
      border: 2px groove rgba(255, 0, 0, 0.863);

      .message_title {
        color: red;
        text-decoration: 6px underline green;
      }
    `}

  ${(props) =>
    props.state === "success" &&
    css`
      box-shadow: 0px 5px 20px 1px rgba(3, 255, 100, 0.493);
      border: 2px groove rgba(0, 255, 115, 0.849);

      .message_title {
        color: green;
        text-decoration: 4px underline red;
      }
    `}


  .toster_header {
    padding: 0.7rem 0.5rem 0.2rem;
    padding-right: 1rem;
    text-transform: capitalize;

    img {
      height: 30px;
      object-fit: content;
      margin-right: 0.6rem;
    }

    .brand_name {
      margin: auto;
      font-size: 13px;
      font-weight: bold;
      margin-right: 1rem;
      letter-spacing: 1px;
      word-spacing: 5px;
      text-transform: uppercase;
    }

    button {
      font-size: 30px;
      margin-left: 1rem;
    }
  }

  .tost_body {
    padding: 1rem 2rem 2rem;
    text-align: center;
    text-transform: capitalize;

    .message_title {
      /* text-decoration: ${(props) =>
        props.state === "success"
          ? "6px underline red"
          : "6px underline green"}; */

      text-transform: uppercase;
      font-size: 20px;
      letter-spacing: 2px;
      font-weight: bold;
      /* color: ${(props) =>
        props.state === "success" ? "#00f08c" : "red"}; */
      padding-top: 0.5rem;
    }

    .message_text {
      margin-top: 0.5rem;
      font-weight: bold;
      opacity: 0.6;
    }
  }
`;
