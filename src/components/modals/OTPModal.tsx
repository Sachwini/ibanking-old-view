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
  otpModalSubmitHandle: () => void;
  resendOTPHandle: () => void;
  handleCancle: (show: boolean) => void;
}

const OTPModal = (props: Props) => {
  const {
    setOTP,
    otpModalShow,
    otpModalSubmitHandle,
    resendOTPHandle,
    handleCancle,
  } = props;
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<formProps>({
    resolver: yupResolver(otpScheme),
    mode: "all",
  });
  const [OTPInputShow, setOTPInputShow] = useState<boolean>(true);
  const [isOTPResendClicked, setIsOTPResendClicked] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(60);

  useEffect(() => {
    let suscribed = true;
    let myInterval = setInterval(() => {
      if (suscribed && seconds > 0) {
        setSeconds(seconds - 1);
      } else if (suscribed && isOTPResendClicked && seconds <= 1) {
        setIsOTPResendClicked(false);
        setSeconds(60);
      }
    }, 1000);

    return () => {
      suscribed = false;
      clearInterval(myInterval);
    };
  }, [seconds, isOTPResendClicked]);

  useEffect(() => {
    const changeOtp = getValues("otp");

    setOTP(changeOtp);
  }, [watch("otp")]);

  const handleResendOTPButtonClick = () => {
    setIsOTPResendClicked(true);
    resendOTPHandle();
  };

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
        <div className="timer_wrapper">
          <p className="timer_info">
            OTP Resend Option is Enabled In
            <strong className="second_counter">
              {`0 : ${seconds} seconds`}
            </strong>
          </p>
          <div className={`${seconds >= 1 ? "d-none" : "d-block"}`}>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleResendOTPButtonClick}
            >
              Resend
            </Button>
          </div>
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
              className={`${errors.otp ? "d-block pl-1 text-capitalize" : ""}`}
              type="invalid"
            >
              {errors.otp?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button
              variant="outline-danger"
              onClick={() => handleCancle(false)}
            >
              Cancel
            </Button>

            <Button
              variant="outline-success"
              type="submit"
              className="ml-4"
              disabled={errors.otp ? true : false}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </MyOTPModal>
  );
};

export default OTPModal;
