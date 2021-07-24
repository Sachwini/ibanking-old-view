import { Modal } from "react-bootstrap";
import styled from "styled-components/macro";

export const ChequeRequestContainer = styled.div`
  margin: 0.6rem;
  .chequeBlock_upperHeaderWrapper,
  .chequeRequest_upperHeaderWrapper {
    display: flex;
    justify-content: space-between;
    padding: 1rem;

    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 900;
    color: white;
  }

  .chequeBlock_upperHeaderWrapper {
    background: #ff0000;
  }

  .chequeRequest_upperHeaderWrapper {
    background: #00c070;
  }

  .date {
    font-weight: bold;
    opacity: 0.6;
    text-align: center;
    margin: 1rem 0 0.6rem;
  }
`;

export const ChequeModalContainer = styled(Modal)`
  .success_headerText,
  .danger_headerText {
    font-weight: bold;
    font-size: 18px;
    text-transform: uppercase;
    text-decoration: underline;
    text-decoration-thickness: 3px;

    text-align: center;
    margin: 1.5rem 0 0;
    letter-spacing: initial;
  }

  .danger_headerText {
    text-decoration-color: green;
    color: red;
  }

  .success_headerText {
    text-decoration-color: red;
    color: green;
  }

  .date {
    font-weight: bold;
    opacity: 0.6;
    text-align: center;
    margin: 0.2rem 0 0.6rem;
    font-size: 12px;
  }

  .detail_wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    font-size: 14px;

    .label,
    .value {
      text-transform: capitalize;
      font-weight: bold;
      opacity: 0.6;
    }

    .value {
      opacity: 0.7;
    }
  }

  .info_wrapper {
    text-align: center;
    font-size: 14px;
    color: #0cb336;
    margin: 2.5rem 0 0;
    background-color: #fafafa8d;
  }
`;
