import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "../../modals/index.css";

export interface Props {
  userOTP: (otp: string) => void;
  OTPModalShow: boolean;
  OTPResponse: {
    status: string;
    message: string;
  };
  OTPFormHandle: (e: React.FormEvent) => void;
  resendOTPHandle: () => void;
  cancleButton: (show: boolean) => void;
}

const OTPModal = (props: Props) => {
  const {
    userOTP,
    OTPModalShow,
    OTPResponse,
    OTPFormHandle,
    resendOTPHandle,
    cancleButton,
  } = props;

  const [OTPInputShow, setOTPInputShow] = useState<boolean>(true);

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setButtonDisabled(false), 61000);
    console.log("Timer for 61 sec");
  }, [buttonDisabled]);

  return (
    <Modal
      show={OTPModalShow}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ zIndex: 1400, padding: "1em" }}
    >
      <Modal.Header closeButton className="modal_header">
        <Modal.Title as="h5">Submit Your OTP</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "2em 3em" }} className="modal_body">
        <Form
          onSubmit={(e) => {
            OTPFormHandle(e);
          }}
        >
          <Form.Group controlId="OTPForm" style={{ padding: "1em 0" }}>
            <InputGroup>
              <Form.Control
                type={`${OTPInputShow ? "password" : "text"}`}
                placeholder="Provide Your OTP"
                required
                autoComplete="off"
                onChange={(e) => userOTP(e.target.value)}
              />
              <span
                style={{
                  marginLeft: "-1.8em",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 50,
                  cursor: "pointer",
                }}
                onClick={() => setOTPInputShow(!OTPInputShow)}
              >
                {OTPInputShow ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </InputGroup>
            {OTPResponse.status === "failed" ? (
              <Form.Text
                style={{
                  color: "red",
                  paddingTop: "10px",
                  textAlign: "center",
                }}
              >
                {OTPResponse.message}
              </Form.Text>
            ) : (
              <Form.Text className="pt-3 text-muted text-center">
                {OTPResponse.message}
              </Form.Text>
            )}
          </Form.Group>
          <Modal.Footer>
            <div className="float-right">
              <Button
                variant="light"
                disabled={buttonDisabled}
                className="float-left"
                style={{ padding: "7px 12px", marginRight: "130px" }}
                onClick={() => {
                  {
                    resendOTPHandle();
                    setButtonDisabled(true);
                  }
                }}
              >
                Resend
              </Button>

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
                style={{ float: "right", marginRight: "-0.9em" }}
              >
                Submit
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OTPModal;
