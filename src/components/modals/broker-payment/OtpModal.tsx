import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export interface Props {
  userOTP: (otp: string) => void;
  modalShow: boolean;
  handleModalShow: (show: boolean) => void;
  modalFormSubmitHandle: (e: React.FormEvent) => void;
  resendOtp: () => void;
}

const OtpModal = (props: Props) => {
  const {
    modalShow,
    handleModalShow,
    userOTP,
    modalFormSubmitHandle,
    resendOtp,
  } = props;
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setButtonDisabled(false), 61000);
    console.log("Timer for 61 sec");
  }, [buttonDisabled]);

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
        <Modal.Title as="h6">Submit Your OTP</Modal.Title>
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
              required
              autoComplete="off"
              onChange={(e) => userOTP(e.target.value)}
            />
            <Form.Text className="text-muted">provide your otp</Form.Text>
          </Form.Group>

          <Button
            disabled={buttonDisabled}
            onClick={() => {
              {
                resendOtp();
                setButtonDisabled(true);
              }
            }}
          >
            Resend
          </Button>

          <Button variant="primary" type="submit" style={{ float: "right" }}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OtpModal;
