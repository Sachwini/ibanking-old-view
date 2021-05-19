import { Button, Modal, ListGroup } from "react-bootstrap";

export interface Props {
  modalShow: boolean;
  handleModalShow: (show: boolean) => void;
  modalFormSubmitHandle: (show: boolean) => void;
  fromAccount: string;
  toAccount: string;
  amount: string;
  validDetails: boolean;
  confirmModalCancleButton: (show: boolean) => void;
}

function BrokerDetailModal(props: Props) {
  const {
    modalShow,
    handleModalShow,
    modalFormSubmitHandle,
    fromAccount,
    toAccount,
    amount,
    confirmModalCancleButton,
    validDetails,
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
        <Modal.Title as="h6">Details of your Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "1em" }}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong className="d-block mb-2">Customer Details</strong>
            <div className="d-flex justify-content-between mb-2">
              <span>Account Number: </span>
              <span className="text-muted">{fromAccount}</span>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <strong className="d-block mb-2">Beneficiary Details</strong>

            <div className="d-flex justify-content-between mb-2">
              <span>Broker: </span>
              <span className="text-muted">{toAccount}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>
                Amount<small>(Rs.)</small>:
              </span>
              <span className="text-muted">{amount}</span>
            </div>
          </ListGroup.Item>
          {/* <small
            style={{
              color: "green",
              fontStyle: "italic",
              padding: "30px 10px",
            }}
          >
            Benificiary Name Matches With Account Holder Name Do you Want to
            Continue?
          </small> */}
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
            disabled={!validDetails}
          >
            Submit
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default BrokerDetailModal;
