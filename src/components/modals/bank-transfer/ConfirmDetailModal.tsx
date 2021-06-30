import { bankTransferFormDataType } from "models/for-pages/bankTransfer_models";
import { Button, Modal } from "react-bootstrap";
import { formatLakh } from "services/numberService";
import "../../modals/index.css";

export interface Props {
  data: bankTransferFormDataType;
  transctionCharge: string | number;
  confirmModalShow: boolean;
  confirmModalShowHandle: (show: boolean) => void;
  confirmModalCancleButton: (show: boolean) => void;
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
      <Modal.Header className="modal_header">
        <Modal.Title as="h5">Confirm Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "1em" }} className="modal_body">
        <strong className="d-block mb-2">Customer Details</strong>
        <div className="d-flex justify-content-between mb-2">
          <span>Account Number: </span>
          <span className="text-muted">{props.data.fromAccount}</span>
        </div>
        <strong className="d-block mb-2">Beneficiary Details</strong>

        <div className="d-flex justify-content-between mb-2">
          <span>Account Number: </span>
          <span className="text-muted">{props.data.toAccount}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Bank Name: </span>
          <span className="text-muted">{props.data.DESTBankName}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Account Holder Name: </span>
          <span className="text-muted">{props.data.destAccountHolderName}</span>
        </div>
        {props.data.DESTBranchName && (
          <div className="d-flex justify-content-between mb-2">
            <span>Branch: </span>
            <span className="text-muted">{props.data.DESTBranchName}</span>
          </div>
        )}

        <div className="d-flex justify-content-between mb-2">
          <span>
            Amount<small>(Rs.)</small>:
          </span>
          <span className="text-muted">
            {formatLakh(parseInt(props.data.transctionAmount))}
          </span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>
            Charge<small>(Rs.)</small>:
          </span>
          <span className="text-muted">{props.transctionCharge}</span>
        </div>
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
        <Modal.Footer>
          <div className="float-right">
            <Button
              variant="secondary"
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
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmDetailModal;
