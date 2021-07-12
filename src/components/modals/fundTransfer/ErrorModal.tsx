import { fundTransfer_errorModalDataType } from "models/payment_ModalType";
import { Button, Modal } from "react-bootstrap";
import { FiUser } from "react-icons/fi";
import { ImArrowRight } from "react-icons/im";
import { VscError } from "react-icons/vsc";
import { formatLakh } from "services/numberService";
import {
  AccountView,
  MySuccessModal,
  MySuccessModalHeader,
  SuccessDetailView,
  ValidationInfo,
} from "styling/for-modal/PaymentModalStyling";

interface Props {
  errorInfoData: fundTransfer_errorModalDataType;
  errorMessage: string;
  errorModalShow: boolean;
  handleCancle: (show: boolean) => void;
}

const SuccessModal = (props: Props) => {
  return (
    <MySuccessModal
      show={props.errorModalShow}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
    >
      <Modal.Header className="modal_header">
        <MySuccessModalHeader color="red">
          <div className="icon_wrapper">
            <VscError size={50} />
          </div>
          <p className="message_wrapper">Failed</p>
        </MySuccessModalHeader>
      </Modal.Header>

      <Modal.Body className="modal_body">
        <AccountView>
          <div className="fromAcc_wrapper">
            <div className="icon_wrapper">
              <FiUser size={40} className="from_acc" />
            </div>

            <div className="acc">
              <p className="name">Your Account</p>
              <p className="acc_no">{props.errorInfoData.fromAccount}</p>
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
              <p className="name">
                {props.errorInfoData.destinationAccountHolderName}
              </p>
              <p className="acc_no">{props.errorInfoData.toAccount}</p>
            </div>
          </div>
        </AccountView>

        <SuccessDetailView>
          <p className="detail_heading">benificary details</p>
          <div className="detail_viewWrapper">
            {/* <div className="detail_wrapper">
              <p className="detail_title">Destination Bank</p>
              <p className="detail_text">{props.errorInfoData.destBankName}</p>
            </div> */}

            <div className="detail_wrapper">
              <p className="detail_title">Destination Bank Branch</p>
              <p className="detail_text">
                {props.errorInfoData.DESTBranchName !== undefined
                  ? props.errorInfoData.DESTBranchName
                  : "DeFault Branch"}
              </p>
            </div>

            <div className="detail_wrapper">
              <p className="detail_title">Destination Bank Account No.</p>
              <p className="detail_text">
                {props.errorInfoData.toAccount
                  ? props.errorInfoData.toAccount
                  : "master Account"}
              </p>
            </div>
          </div>
        </SuccessDetailView>

        <SuccessDetailView>
          <p className="detail_heading">Transctions Details</p>

          <div className="detail_viewWrapper">
            <div className="detail_wrapper">
              <p className="detail_title">Transction Amount</p>
              <p className="detail_text">
                <strong>NPR. </strong>
                {formatLakh(parseInt(props.errorInfoData.amount))}
              </p>
            </div>

            {/* <div className="detail_wrapper">
              <p className="detail_title">Transction Charge</p>
              <p className="detail_text">
                <strong>NPR. </strong>
                {props.errorInfoData.transctionCharge}
              </p>
            </div> */}

            <div className="detail_wrapper">
              <p className="detail_title">Total Amount</p>
              <p className="detail_text">
                <strong>NPR. </strong>
                {formatLakh(
                  parseInt(props.errorInfoData.amount)
                  // +
                  // parseInt(props.errorInfoData.transctionCharge)
                )}
              </p>
            </div>

            <div className="detail_wrapper">
              <p className="detail_title">transction Status</p>
              <ValidationInfo
                color="red"
                padding="0 0 0 2px"
                className="d-inline"
              >
                Failed
              </ValidationInfo>
            </div>
          </div>
        </SuccessDetailView>

        <ValidationInfo color="red">
          <strong className="pr-2 text-bold">
            your transction has been failed Because of: {props.errorMessage}
          </strong>
        </ValidationInfo>

        <Modal.Footer className="modal_footer">
          <Button
            variant="outline-primary"
            className="px-5"
            onClick={() => props.handleCancle(false)}
          >
            DONE
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </MySuccessModal>
  );
};

export default SuccessModal;
