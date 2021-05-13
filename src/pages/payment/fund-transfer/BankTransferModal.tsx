import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

export interface Props {
  userOTP: (otp: string) => void;
  modalShow: boolean;
  handleModalShow: (show: boolean) => void;
  modalFormSubmitHandle: (e: React.FormEvent) => void;
}

const BankTransferModal = (props: Props) => {
  const { modalShow, handleModalShow, userOTP, modalFormSubmitHandle } = props;

  return (
    <Modal
      show={modalShow}
      onHide={() => handleModalShow(false)}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ zIndex: 1400 }}
    >
      <Modal.Header closeButton>
        <Modal.Title as="h6">Submit Your OPT</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            modalFormSubmitHandle(e);
            handleModalShow(false);
          }}
        >
          <Form.Group controlId="modalForm">
            <Form.Control
              type="text"
              placeholder="otp..."
              onChange={(e) => userOTP(e.target.value)}
              className=""
            />
            <Form.Text className="text-muted">provide your otp</Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit" style={{ float: "right" }}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BankTransferModal;
