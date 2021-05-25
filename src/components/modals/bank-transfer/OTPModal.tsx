import React, { useState } from "react";
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
  const [showRequestOTPAgain, setShowRequestOTPAgain] =
    useState<boolean>(false);
  const [counter, setCounter] = useState<number>(90);

  // React.useEffect(() => {
  //   setInterval(() => {
  //     setCounter(counter - 1);
  //   }, 1000);
  //   return () => clearInterval(1000);
  // }, [counter]);

  const showOTPRequest = () => {
    setTimeout(() => {
      setShowRequestOTPAgain(!showRequestOTPAgain);
    }, 90000);
  };

  if (OTPResponse.message === "failed") {
    showOTPRequest();
  }

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

          {showRequestOTPAgain ? (
            <div className="py-3">
              <small className="d-block py-2">Not Getting OTP On Mobile?</small>
              <span
                style={{
                  fontSize: "10px",
                  padding: "6px",
                  backgroundColor: "#0fa181",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => resendOTPHandle()}
              >
                Request Again
              </span>
            </div>
          ) : (
            // <span>Request Again For OTP Enabling in {counter} seconds </span>
            ""
          )}

          <Button variant="primary" type="submit" style={{ float: "right" }}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OTPModal;
