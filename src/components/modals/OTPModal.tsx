import { yupResolver } from "@hookform/resolvers/yup";
import { handleEye } from "helper/fun_modals";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  ImageIconWrapper,
  MyOTPModal,
} from "styling/for-modal/PaymentModalStyling";
import { EyeContainer } from "styling/login/LoginStyling";
import { otpScheme } from "validation-schema/modal_validation";

interface formProps {
  otp: string;
}

export interface Props {
  setOTP: (otp: string) => void;
  otpModalShow: boolean;
  isErrorInOTPResponse: {
    isError: boolean;
    message: string;
  };
  otpModalSubmitHandle: () => void;
  resendOTPHandle: () => void;
  handleCancle: (show: boolean) => void;
}

const OTPModal = (props: Props) => {
  const {
    setOTP,
    otpModalShow,
    isErrorInOTPResponse,
    otpModalSubmitHandle,
    resendOTPHandle,
    handleCancle,
  } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formProps>({
    resolver: yupResolver(otpScheme),
    mode: "all",
  });
  const [OTPInputShow, setOTPInputShow] = useState<boolean>(true);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      setTimeout(() => setButtonDisabled(false), 60000);
    }
    return () => {
      isSubscribed = false;
    };
  }, [buttonDisabled]);

  const onSubmit = (data: formProps) => {
    setOTP(data.otp);
    otpModalSubmitHandle();
  };

  return (
    <MyOTPModal
      show={otpModalShow}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="modal_header">
        <Modal.Title as="h5" className="modal_title">
          Confirm Transfer
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal_body">
        <div className="timer">
          <p>
            OTP Resend Option is Enabled In
            <span className="font-weight-bold px-2">12</span> seconds
          </p>
          <Button
            variant="outline-primary"
            size="sm"
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
        </div>

        <ImageIconWrapper>
          <Image src="/images/icons/otp-icon.png" alt="otp-icon" />
          <p className="info_heading">
            We Ensure Transctions With Full Security
          </p>
          <p className="info_text">
            enter the OTP that has been sent to your registered device and emeil
          </p>
        </ImageIconWrapper>

        <Form onSubmit={handleSubmit(onSubmit)} className="px-2 pb-2">
          <Form.Group controlId="OTPForm" className="py-3 px-3">
            <InputGroup>
              <Form.Control
                type={`${OTPInputShow ? "password" : "text"}`}
                {...register("otp")}
                placeholder="Enter OTP..."
              />
              <EyeContainer onClick={() => setOTPInputShow(!OTPInputShow)}>
                {handleEye(OTPInputShow)}
              </EyeContainer>
            </InputGroup>

            <Form.Control.Feedback
              className={`${
                errors.otp || isErrorInOTPResponse.isError === true
                  ? "d-block pl-1 text-capitalize"
                  : ""
              }`}
              type="invalid"
            >
              {errors.otp?.message} {isErrorInOTPResponse.message}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button
              variant="outline-danger"
              onClick={() => handleCancle(false)}
            >
              Cancel
            </Button>

            <Button variant="outline-success" type="submit" className="ml-4">
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </MyOTPModal>
  );
};

export default OTPModal;
