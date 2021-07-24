import { brokerPaymentFormDataType } from "models/for-pages/brokerPaymentModels";
import { Button, Modal } from "react-bootstrap";
import { FiUser } from "react-icons/fi";
import { ImArrowRight } from "react-icons/im";
import { formatLakh } from "services/numberService";
import {
  AccountView,
  DetaildView,
} from "styling/for-modal/PaymentModalStyling";
import { CustomModal } from "styling/common/ModalStyling";

export interface Props {
  transctionCharge: string;
  data: brokerPaymentFormDataType;
  modalShow: boolean;
  detailModalSubmitHandle: () => void;
  handleCancle: (show: boolean) => void;
}

function BrokerDetailModal(props: Props) {
  return (
    <CustomModal
      show={props.modalShow}
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
              <p className="name">{props.data.DESTBrokerName}</p>
              <p className="acc_no">Broker Code: {props.data.brokerCode}</p>
            </div>
            <span></span>
          </div>
        </AccountView>

        <DetaildView>
          <div className="detail_wrapper">
            <p className="detail_title">Broker Name</p>
            <p className="detail_text">{props.data.DESTBrokerName}</p>
          </div>

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

        <Modal.Footer className="modal_footer mt-5">
          <Button
            variant="outline-danger"
            className="mr-5"
            onClick={() => props.handleCancle(false)}
          >
            Cancel
          </Button>
          <Button
            variant="outline-success"
            onClick={props.detailModalSubmitHandle}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </CustomModal>
  );
}

export default BrokerDetailModal;
