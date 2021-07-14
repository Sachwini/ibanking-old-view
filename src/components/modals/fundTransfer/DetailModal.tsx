import { Button, Modal } from "react-bootstrap";
import { formatLakh } from "services/numberService";

export interface Props {
  modalShow: boolean;
  handleModalShow: (show: boolean) => void;
  modalFormSubmitHandle: (show: boolean) => void;
  fromAccount: string;
  toAccount: string;
  destinationAccountHolderName: string;
  branch: string;
  amount: string;
  validAccount: boolean;
  accountValidationResponseMessage: {
    message: string;
    matchPercentage: string;
  };
  confirmModalCancleButton: (show: boolean) => void;
}

function DetailModal(props: Props) {
  const {
    modalShow,
    handleModalShow,
    modalFormSubmitHandle,
    fromAccount,
    toAccount,
    destinationAccountHolderName,
    branch,
    amount,
    validAccount,
    accountValidationResponseMessage,
    confirmModalCancleButton,
  } = props;

  const handleSubmit = (e: any) => {
    modalFormSubmitHandle(e);
    handleModalShow(false);
  };

  return (
    <>
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
          <Modal.Title as="h6">Details of your Transaction </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "1em" }} className="modal_body">
          <strong className="d-block mb-2">Customer Details</strong>
          <div className="d-flex justify-content-between mb-2">
            <span>Account Number: </span>
            <span className="text-muted">{fromAccount}</span>
          </div>
          <strong className="d-block mb-2">Beneficiary Details</strong>

          <div className="d-flex justify-content-between mb-2">
            <span>Account Number: </span>
            <span className="text-muted">{toAccount}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Destination AccountHolder Name: </span>
            <span className="text-muted">{destinationAccountHolderName}</span>
          </div>
          {branch ? (
            <div className="d-flex justify-content-between mb-2">
              <span> Branch Name: </span>
              <span className="text-muted">{branch}</span>
            </div>
          ) : (
            ""
          )}
          <div className="d-flex justify-content-between mb-2">
            <span>
              Amount<small>(Rs.)</small>:
            </span>
            <span className="text-muted">{formatLakh(parseInt(amount))}</span>
          </div>
          {accountValidationResponseMessage ? (
            <div className={validAccount ? "success_text" : "error_text"}>
              {accountValidationResponseMessage?.message}
            </div>
          ) : (
            ""
          )}
          {accountValidationResponseMessage ? (
            <div>
              Match Percentage:{" "}
              {accountValidationResponseMessage?.matchPercentage}
            </div>
          ) : (
            ""
          )}
          <Modal.Footer>
            <div className="float-right">
              <Button
                variant="secondary"
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
                disabled={!validAccount}
              >
                Submit
              </Button>
            </div>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DetailModal;
