import { Button, Modal } from "react-bootstrap";
import { GiCheckMark } from "react-icons/gi";
import { VscError } from "react-icons/vsc";

export interface Props {
  successModalShow: boolean;
  handleModalShow: (show: boolean) => void;
  responseMessage: {
    status: string;
    message: string;
  };
  okButton: (e: React.FormEvent) => void;
}

const SuccessModal = (props: Props) => {
  const { successModalShow, handleModalShow, responseMessage, okButton } =
    props;

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
          <div>
            <GiCheckMark color="white" size={60} />
            <h4>Success</h4>
          </div>
        ) : (
          <div>
            <VscError color="white" size={60} />
            <h4>Oops !!!</h4>
          </div>
        )}
      </Modal.Header>
      <Modal.Body style={{ padding: "2em", color: "black" }}>
        <div className="mb-4">{responseMessage?.message}</div>
        <Modal.Footer>
          <Button
            onClick={(e) => {
              handleModalShow(false);
              okButton(e);
            }}
            style={{ float: "right", padding: "8px 1.8em" }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};
export default SuccessModal;
