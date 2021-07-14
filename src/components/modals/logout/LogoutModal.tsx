import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";

export interface Props {
  LogoutModalShow: boolean;
  logoutModalSubmitHandle: () => void;
  handleCancle: (e: boolean) => void;
}

const ModalStyle = styled.div`
  .modal__header {
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
  .modal__body {
    background: #f2f4f7;
  }
`;
function LogoutModal(props: Props) {
  const { LogoutModalShow, logoutModalSubmitHandle, handleCancle } = props;
  return (
    <Modal
      show={LogoutModalShow}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="sm"
    >
      <ModalStyle>
        <Modal.Header className="modal__header">
          <Modal.Title as="h6">Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal__body">
          <div className="mb-4 text-center">
            Are you sure you want to logout?
          </div>
          <div className="d-flex justify-content-center">
            <Button
              variant="secondary"
              className="modal_cancel"
              onClick={() => handleCancle(false)}
            >
              Cancel
            </Button>
            <Button className="modal_ok" onClick={logoutModalSubmitHandle}>
              OK
            </Button>
          </div>
        </Modal.Body>
      </ModalStyle>
    </Modal>
  );
}

export default LogoutModal;
