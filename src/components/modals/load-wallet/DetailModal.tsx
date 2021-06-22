import React from "react";
import { Button, Modal } from "react-bootstrap";
import "../../modals/index.css";

export interface Props {
  modalShow: boolean;
  handleModalShow: (show: boolean) => void;
  modalFormSubmitHandle: (e: React.FormEvent) => void;
  ValidationResponseMessage: {
    message: string;
    customerName: string;
    customerProfileImageUrl: string;
    validationIdentifier: string;
  };
  validAccount: boolean;
  cancleButton: (show: boolean) => void;
}

function DetailModal(props: Props) {
  const {
    modalShow,
    handleModalShow,
    modalFormSubmitHandle,
    ValidationResponseMessage,
    validAccount,
    cancleButton,
  } = props;

  const handleSubmit = (e: any) => {
    modalFormSubmitHandle(e);
    handleModalShow(false);
  };

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => handleModalShow(false)}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ zIndex: 1400 }}
      >
        <Modal.Header className="modal_header">
          <Modal.Title as="h6">Details of your Transaction </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "1em" }} className="modal_body">
          <strong className="d-block mb-2">Account Details</strong>
          <div className="d-flex justify-content-between mb-2">
            <span>Customer Name: </span>
            <span className="text-muted">
              {ValidationResponseMessage?.customerName}
            </span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">
              {ValidationResponseMessage?.customerProfileImageUrl}
            </span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">
              {ValidationResponseMessage?.message}
            </span>
          </div>
          {validAccount ? (
            <div className="success_text">This is valid Account</div>
          ) : (
            <div className="error_text">This is invalid Account</div>
          )}
          <Modal.Footer>
            <div className="float-right">
              <Button
                variant="secondary"
                onClick={() => cancleButton(false)}
                style={{ padding: "7px 12px", marginRight: "1em" }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                style={{ padding: "7px 12px" }}
                onClick={handleSubmit}
                disabled={!validAccount}
              >
                Confirm
              </Button>
            </div>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DetailModal;
