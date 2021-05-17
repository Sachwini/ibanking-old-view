import { Button, ButtonGroup, ListGroup, Modal } from "react-bootstrap";

export interface Props {
  fromAccount: string;
  toAccount: string;
  DESTBankName: string;
  DESTAccHolderName: string;
  DESTBranchName: string;
  transctionAmount: string;
  transctionCharge: string | number;
  confirmModalShow: boolean;
  confirmModalShowHandle: (show: boolean) => void;
  confirmModalCancleButton: (show: boolean) => void;
  // confirmModelSubmitHandle: (e: React.MouseEvent) => void;
}

const ConfirmDetailModal = (props: Props) => {
  return (
    <Modal
      show={props.confirmModalShow}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ zIndex: 1400 }}
    >
      <Modal.Header className="justify-content-center text-uppercase">
        <Modal.Title as="h5">Confirm Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "1em" }}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong className="d-block mb-2">Customer Details</strong>
            <div className="d-flex justify-content-between mb-2">
              <span>Account Number: </span>
              <span className="text-muted">{props.fromAccount}</span>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <strong className="d-block mb-2">Beneficiary Details</strong>

            <div className="d-flex justify-content-between mb-2">
              <span>Account Number: </span>
              <span className="text-muted">{props.toAccount}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Bank Name: </span>
              <span className="text-muted">{props.DESTBankName}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Account Holder Name: </span>
              <span className="text-muted">{props.DESTAccHolderName}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Branch: </span>
              <span className="text-muted">{props.DESTBranchName}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>
                Amount<small>(Rs.)</small>:
              </span>
              <span className="text-muted">{props.transctionAmount}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>
                Charge<small>(Rs.)</small>:
              </span>
              <span className="text-muted">{props.transctionCharge}</span>
            </div>
          </ListGroup.Item>
          <small
            style={{
              color: "green",
              fontStyle: "italic",
              padding: "30px 10px",
            }}
          >
            Benificiary Name Matches With Account Holder Name Do you Want to
            Continue?
          </small>
        </ListGroup>
        <div className="float-right">
          <Button
            onClick={() => props.confirmModalCancleButton(false)}
            style={{ padding: "7px 12px", marginRight: "1em" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => props.confirmModalShowHandle(false)}
            style={{ padding: "7px 12px" }}
          >
            Confirm
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmDetailModal;