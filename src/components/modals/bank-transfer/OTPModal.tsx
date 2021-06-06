import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export interface Props {
  userOTP: (otp: string) => void;
  OTPModalShow: boolean;
  OTPResponse: {
    status: string;
    message: string;
  };
  OTPFormHandle: (e: React.FormEvent) => void;
  resendOTPHandle: () => void;
}

const OTPModal = (props: Props) => {
  const { userOTP, OTPModalShow, OTPResponse, OTPFormHandle, resendOTPHandle } =
    props;

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
      <Modal.Header className="justify-content-center">
        <Modal.Title as="h5">Submit Your OTP</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "2em 3em" }}>
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
          <Button
            disabled={buttonDisabled}
            onClick={() => {
              {
                resendOTPHandle();
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

export default OTPModal;
