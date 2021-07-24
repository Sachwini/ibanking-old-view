import { brokerPaymentFormDataType } from "models/for-pages/brokerPaymentModels";
import { Button, Modal } from "react-bootstrap";
import { FiUser } from "react-icons/fi";
import { ImArrowRight } from "react-icons/im";
import { VscError } from "react-icons/vsc";
import { formatLakh } from "services/numberService";
import {
  AccountView,
  MySuccessModal,
  SuccessDetailView,
  ValidationInfo,
} from "styling/for-modal/PaymentModalStyling";
import { SuccessModalHeader } from "styling/common/ModalStyling";

interface Props {
  errorInfoData: brokerPaymentFormDataType;
  errorMessage: string;
  errorModalShow: boolean;
  transctionCharge: string;
  handleCancle: (show: boolean) => void;
}

const BrokerErrorModal = (props: Props) => {
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
        <SuccessModalHeader color="red">
          <div className="icon_wrapper">
            <VscError size={50} />
          </div>
          <p className="message_wrapper">Failed</p>
        </SuccessModalHeader>
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
              <p className="name">{props.errorInfoData.DESTBrokerName}</p>
              <p className="acc_no">{props.errorInfoData.brokerCode}</p>
            </div>
          </div>
        </AccountView>

        <SuccessDetailView>
          <p className="detail_heading">benificary details</p>
          <div className="detail_viewWrapper">
            <div className="detail_wrapper">
              <p className="detail_title">Destination Broker</p>
              <p className="detail_text">
                {props.errorInfoData.DESTBrokerName}
              </p>
            </div>

            <div className="detail_wrapper">
              <p className="detail_title">Destination Broker Code</p>
              <p className="detail_text">{props.errorInfoData.brokerCode}</p>
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
                {formatLakh(parseInt(props.errorInfoData.transctionAmount))}
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
                <strong>NPR. </strong>
                {formatLakh(
                  parseInt(props.errorInfoData.transctionAmount) +
                    parseInt(props.transctionCharge)
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

export default BrokerErrorModal;
