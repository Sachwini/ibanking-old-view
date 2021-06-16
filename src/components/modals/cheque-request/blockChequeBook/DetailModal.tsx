import { Button, ListGroup, Modal } from "react-bootstrap";
import "../../../modals/index.css";
export interface Props {
  modalShow: boolean;
  handleModalShow: (show: boolean) => void;
  modalFormSubmitHandle: (show: boolean) => void;
  fromAccount: string;
  chequeNumber: string;
  cancleButton: (show: boolean) => void;
}

function DetailModal(props: Props) {
  const {
    modalShow,
    handleModalShow,
    modalFormSubmitHandle,
    fromAccount,
    chequeNumber,
    cancleButton,
  } = props;

  const handleSubmit = (e: any) => {
    modalFormSubmitHandle(e);
    handleModalShow(false);
  };

  return (
    <Modal
      show={modalShow}
      onHide={() => handleModalShow(false)}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ zIndex: 1400 }}
    >
      <Modal.Header className="modal_header">
        <Modal.Title as="h6">Details of your Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "1em" }} className="modal_body">
        <strong className="d-block mb-2">Input Details</strong>
        <div className="d-flex justify-content-between mb-2">
          <span>Account Number: </span>
          <span className="text-muted">{fromAccount}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>cheque Number: </span>
          <span className="text-muted">{chequeNumber}</span>
        </div>
        <Modal.Footer>
          <div className="float-right">
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
              style={{ padding: "7px 12px" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
}

export default DetailModal;
