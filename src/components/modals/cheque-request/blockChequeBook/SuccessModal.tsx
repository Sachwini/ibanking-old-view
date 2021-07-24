import { Button, Modal } from "react-bootstrap";
import { GiCheckMark } from "react-icons/gi";
import { VscError } from "react-icons/vsc";
import {
  ModalBody,
  ModalFooter,
  SuccessModalHeader,
} from "styling/common/ModalStyling";
import { MySuccessModal } from "styling/for-modal/PaymentModalStyling";

export interface Props {
  successModalShow: boolean;
  handleModalShow: (show: boolean) => void;
  responseMessage: {
    status: boolean;
    message: string;
  };
}

const SuccessModal = (props: Props) => {
  const { successModalShow, handleModalShow, responseMessage } = props;
  return (
    <MySuccessModal
      show={successModalShow}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="modal_header">
        {responseMessage?.status === true ? (
          <SuccessModalHeader color="green">
            <div className="icon_wrapper">
              <GiCheckMark size={50} />
            </div>
            <p className="message_wrapper">Success</p>
          </SuccessModalHeader>
        ) : (
          <SuccessModalHeader color="red">
            <div className="icon_wrapper">
              <VscError size={50} />
            </div>
            <p className="message_wrapper">Failed</p>
          </SuccessModalHeader>
        )}
      </Modal.Header>

      <ModalBody padding="2rem">
        <div className="mb-4">{responseMessage?.message}</div>
      </ModalBody>

      <ModalFooter padding="0.5rem 1rem 1rem">
        <Button
          onClick={() => {
            handleModalShow(false);
          }}
          className="px-5 mr-2 text-uppercase fw-700"
          variant="outline-primary"
        >
          Dismiss
        </Button>
      </ModalFooter>
    </MySuccessModal>
  );
};

export default SuccessModal;
