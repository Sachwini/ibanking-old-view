import { Modal } from "react-bootstrap";
import styled from "styled-components";

export const SuccessModalHeader = styled.div`
  display: flex;
  width: 100%;
  height: 150px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  background: #44ab76;
`;
export const ErrorModalHeader = styled.div`
  display: flex;
  width: 100%;
  height: 150px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  background: #db211b;
`;

export const ModalHeader = styled(Modal.Header)`
  /* background-color: #f0f0f0; */
  padding: 0.5rem 1rem;
  font-weight: bold;
  align-items: center;

  button {
    font-size: 30px;
  }
`;

export const ModalBody = styled(Modal.Body)`
  padding: 0.5rem;
`;

export const ModalFooter = styled(Modal.Footer)`
  align-items: center;
  border: none;

  button {
    width: 100%;
    font-weight: bolder;
    letter-spacing: 1.5px;
    font-size: 18px;
    background-color: #f5f5f5;
    border: none;
    color: green;
  }
`;
