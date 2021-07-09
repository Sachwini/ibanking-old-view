import { yupResolver } from "@hookform/resolvers/yup";
import { handleEye } from "helper/fun_modals";
import { useState } from "react";
import { Button, Form, InputGroup, Modal, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  ImageIconWrapper,
  MyModal,
} from "styling/for-modal/PaymentModalStyling";
import { EyeContainer } from "styling/login/LoginStyling";
import { mpinScheme } from "validation-schema/modal_validation";

interface formProps {
  mpin: string;
}

export interface Props {
  mpinModalShow: boolean;
  setMpin: (mPin: string) => void;
  mpinModalSubmitHandle: () => void;
  handleCancle: (show: boolean) => void;
}

const MpinModal = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formProps>({
    resolver: yupResolver(mpinScheme),
    mode: "all",
  });
  const { setMpin, mpinModalShow, mpinModalSubmitHandle, handleCancle } = props;
  const [mPinInputShow, setMpinInputShow] = useState<boolean>(true);

  const onSubmit = (data: formProps) => {
    setMpin(data.mpin);
    mpinModalSubmitHandle();
  };

  return (
    <MyModal
      show={mpinModalShow}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="modal_header">
        <Modal.Title as="h5" className="modal_title">
          Confirm Your Transction PIN
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal_body">
        <ImageIconWrapper>
          <Image src="/images/icons/pincode-icon.png" alt="pincode-icon" />
          <p className="info_heading">
            We Ensure Transctions With Full Security
          </p>
          <p className="info_text">
            enter the Transction PIN No. For your secure payment
          </p>
        </ImageIconWrapper>

        <Form onSubmit={handleSubmit(onSubmit)} className="px-2 pb-2">
          <Form.Group controlId="OTPForm" className="py-3 px-3">
            <InputGroup>
              <Form.Control
                type={`${mPinInputShow ? "password" : "text"}`}
                {...register("mpin")}
                placeholder="Enter transction PIN..."
              />
              <EyeContainer onClick={() => setMpinInputShow(!mPinInputShow)}>
                {handleEye(mPinInputShow)}
              </EyeContainer>
            </InputGroup>

            <Form.Control.Feedback
              className={`${errors.mpin ? "d-block pl-1 text-capitalize" : ""}`}
              type="invalid"
            >
              {errors.mpin?.message}
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
              disabled={errors.mpin ? true : false}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </MyModal>
  );
};

export default MpinModal;
