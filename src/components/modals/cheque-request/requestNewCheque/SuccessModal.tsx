import {
  ErrorModalHeader,
  SuccessModalHeader,
} from "components/modals/ModalStyling";
import { Button, Modal } from "react-bootstrap";
import { GiCheckMark } from "react-icons/gi";
import { VscError } from "react-icons/vsc";

export interface Props {
  successModalShow: boolean;
  handleModalShow: (show: boolean) => void;
  responseMessage: {
    status: string;
    message: string;
    details: string;
  };
}

const SuccessModal = (props: Props) => {
  const { successModalShow, handleModalShow, responseMessage } = props;
  return (
    <Modal
      show={successModalShow}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ zIndex: 1400 }}
    >
      <Modal.Header className="justify-content-center p-0">
        {responseMessage?.status === "success" ? (
          <SuccessModalHeader>
            <GiCheckMark color="white" size={60} />
            <h4>Success</h4>
          </SuccessModalHeader>
        ) : (
          <ErrorModalHeader>
            <VscError color="white" size={60} />
            <h4>Oops !!!</h4>
          </ErrorModalHeader>
        )}
      </Modal.Header>
      <Modal.Body style={{ padding: "2em" }}>
        <div className="mb-4">{responseMessage?.message}</div>
        <div className="mb-4">{responseMessage?.details}</div>
        <Button
          onClick={() => {
            handleModalShow(false);
          }}
          style={{ float: "right", padding: "8px 1.8em" }}
        >
          OK
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessModal;
