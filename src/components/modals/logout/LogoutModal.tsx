import React from "react";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";

export interface Props {
  LogoutModalShow: boolean;
  handleModalShow: (show: boolean) => void;
  confirmModalCancleButton: (e: React.FormEvent) => void;
}

const ModalStyle = styled.div`
  .modal_header {
    background: #cbccce;
  }
  .modal_cancel {
    padding: 4px 12px;
    margin-right: 1em;
  }
  .modal_ok {
    float: right;
    padding: 4px 1.7em;
  }
  .modal_body {
    background: #f2f4f7;
  }
`;
function LogoutModal(props: Props) {
  const { LogoutModalShow, handleModalShow, confirmModalCancleButton } = props;
  return (
    <Modal
      show={LogoutModalShow}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ zIndex: 1400 }}
      size="sm"
    >
      <ModalStyle>
        <Modal.Header closeButton className="modal_header">
          <Modal.Title as="h6">Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal_body">
          <div className="mb-4 text-center">
            Are you sure you want to logout?
          </div>
          <div className="d-flex justify-content-center">
            <Button
              className="modal_cancel"
              onClick={() => handleModalShow(false)}
            >
              Cancel
            </Button>
            <Button
              className="modal_ok"
              onClick={(e) => confirmModalCancleButton(e)}
            >
              OK
            </Button>
          </div>
        </Modal.Body>
      </ModalStyle>
    </Modal>
  );
}

export default LogoutModal;
