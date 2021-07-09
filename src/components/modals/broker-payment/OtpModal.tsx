import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "../../modals/index.css";

export interface Props {
  modalShow: boolean;
  userOTP: (otp: string) => void;
  otpModalSubmitHandle: () => void;
  handleCancle: (show: boolean) => void;
  resendOtp: () => void;
}

const OtpModal = (props: Props) => {
  const { modalShow, userOTP, otpModalSubmitHandle, handleCancle, resendOtp } =
    props;
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      setTimeout(() => setButtonDisabled(false), 60000);
      console.log("Timer for 60 sec");
    }
    return () => {
      isSubscribed = false;
      clearTimeout();
    };
  }, [buttonDisabled]);

  return (
    <Modal
      show={modalShow}
      onHide={() => handleCancle(false)}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ zIndex: 1400 }}
    >
      <Modal.Header className="modal_header">
        <Modal.Title as="h6">Submit Your OTP</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "1em" }} className="modal_body">
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
        <Modal.Footer>
          <div className="float-right">
            <Button
              variant="secondary"
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

            <Button
              variant="primary"
              style={{ float: "right" }}
              onClick={otpModalSubmitHandle}
            >
              Submit
            </Button>
          </div>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default OtpModal;
