import { bankTransferFormDataType } from "models/for-pages/bankTransfer_models";
import { Button, Modal } from "react-bootstrap";
import { FiUser } from "react-icons/fi";
import { ImArrowRight } from "react-icons/im";
import { formatLakh } from "services/numberService";
import {
  AccountView,
  CustomModal,
  DetaildView,
  ValidationInfo,
} from "styling/for-modal/PaymentModalStyling";

export interface Props {
  data: bankTransferFormDataType;
  transctionCharge: string;
  confirmModalShow: boolean;
  confirmModalSubmitHandle: () => void;
  handleCancle: (show: boolean) => void;
  accValidationStatus: {
    status: boolean;
    message: string;
  };
}

const ConfirmDetailModal = (props: Props) => {
  console.log(props.confirmModalShow);

  return (
    <CustomModal
      show={props.confirmModalShow}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
    >
      <Modal.Header className="modal_header">
        <Modal.Title as="h5" className="modal_title">
          Confirm Payment Details
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal_body">
        <AccountView>
          <div className="fromAcc_wrapper">
            <div className="icon_wrapper">
              <FiUser size={40} className="from_acc" />
            </div>

            <div className="acc">
              <p className="name">Your Account</p>
              <p className="acc_no">{props.data.fromAccount}</p>
            </div>
          </div>

          <div className="indicator">
            <ImArrowRight size="20" />
          </div>

          <div className="toAcc_wrapper">
            <div className="icon_wrapper">
              <FiUser size={40} className="from_acc" />
            </div>

            <div className="acc">
              <p className="name">{props.data.destAccountHolderName}</p>
              <p className="acc_no">{props.data.toAccount}</p>
            </div>
            <span></span>
          </div>
        </AccountView>

        <DetaildView>
          <div className="detail_wrapper">
            <p className="detail_title">Bank Name</p>
            <p className="detail_text">{props.data.DESTBankName}</p>
          </div>

          {props.data.DESTBranchName && (
            <div className="detail_wrapper">
              <p className="detail_title">Destination Branch Name</p>
              <p className="detail_text">{props.data.DESTBranchName}</p>
            </div>
          )}

          <div className="detail_wrapper">
            <p className="detail_title">Transction Amount</p>
            <p className="detail_text">
              <strong>NPR. </strong>
              {formatLakh(parseInt(props.data.transctionAmount))}
            </p>
          </div>

          <div className="detail_wrapper">
            <p className="detail_title">Transction Charge</p>
            <p className="detail_text">
              <strong>NPR. </strong>
              {props.transctionCharge}
            </p>
          </div>

          <div className="detail_wrapper">
            <p className="detail_title">Total Amount</p>
            <p className="detail_text">
              {formatLakh(
                parseInt(props.data.transctionAmount) +
                  parseInt(props.transctionCharge)
              )}
            </p>
          </div>
        </DetaildView>

        <ValidationInfo
          color={`${props.accValidationStatus.status ? "green" : "red"}`}
          align="center"
          padding="5rem 0 0.7rem"
        >
          {props.accValidationStatus.status ? (
            <span>
              <strong className="pr-2 text-bold">CONGRATULATIONS!!!</strong>
              provided details match with your credentials. Validation Message:
              {props.accValidationStatus.message}
            </span>
          ) : (
            <span>
              <strong className="pr-2 text-bold">SORRY!!!</strong> Provided
              Details Does Not Match with Credentials. Validation Message:{" "}
              {props.accValidationStatus.message}
            </span>
          )}
        </ValidationInfo>

        <Modal.Footer className="modal_footer">
          <Button
            variant="outline-danger"
            className="mr-5"
            onClick={() => props.handleCancle(false)}
          >
            Cancel
          </Button>
          <Button
            variant="outline-success"
            onClick={props.confirmModalSubmitHandle}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </CustomModal>
  );
};

export default ConfirmDetailModal;
