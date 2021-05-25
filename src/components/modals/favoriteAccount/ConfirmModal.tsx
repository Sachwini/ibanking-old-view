import { Button, Modal, ListGroup } from "react-bootstrap";

export interface Props {
  modalShow: boolean;
  handleModalShow: (show: boolean) => void;
  modalFormSubmitHandle: (show: boolean) => void;
  accountNumber: string;
  destinationBankName: string;
  destinationAccountHolderName: string; 
  confirmModalCancleButton: (show: boolean) => void;
}

function ConfirmModal(props: Props) {
  const {
    modalShow,
    handleModalShow,
    modalFormSubmitHandle,
    accountNumber,
    destinationBankName,
    destinationAccountHolderName,
    confirmModalCancleButton,
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
      <Modal.Header closeButton>
        <Modal.Title as="h6">Details of your Favorite Account</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "1em" }}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong className="d-block mb-2">Account Details</strong>
            <div className="d-flex justify-content-between mb-2">
              <span>Account Number: </span>
              <span className="text-muted">{accountNumber}</span>
            </div>
          {/* </ListGroup.Item>
          <ListGroup.Item> */}
            <div className="d-flex justify-content-between mb-2">
              <span>Destination Account Holder Name: </span>
              <span className="text-muted">{destinationAccountHolderName}</span>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="d-flex justify-content-between mb-2">
              <span>Destination BankName: </span>
              <span className="text-muted">{destinationBankName}</span>
            </div>
          </ListGroup.Item>
        </ListGroup>
        <div className="float-right">
          <Button
            onClick={() => confirmModalCancleButton(false)}
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
            Confirm
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ConfirmModal;
