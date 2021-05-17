import React from 'react'
import { Button, Form, Modal } from "react-bootstrap";

export interface Props {
  mpin: (mpin: string) => void;
  modalShow: boolean;
  handleModalShow: (show: boolean) => void;
  modalFormSubmitHandle: (e: React.FormEvent) => void;
}

const MpinModal = (props: Props) => {
    const { modalShow, handleModalShow, mpin, modalFormSubmitHandle } = props;
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
        <Modal.Title as="h6">Submit Your Transaction pin</Modal.Title>
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
              placeholder="Your Transaction Pin"
              required
              onChange={(e) => mpin(e.target.value)}
            />
            <Form.Text className="text-muted">
              provide your transaction pin
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit" style={{ float: "right" }}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MpinModal
