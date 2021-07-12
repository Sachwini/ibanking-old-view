import { generatePDF } from "helper/GetData";
import { transactionListType } from "models/apiResponse";
import { Button, Modal, Image } from "react-bootstrap";
import { AiOutlineFilePdf } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { GiCheckMark } from "react-icons/gi";
import { ImArrowRight } from "react-icons/im";
import { baseUrl } from "services/BaseUrl";
import { formatLakh } from "services/numberService";
import {
  AccountView,
  MySuccessModal,
  MySuccessModalHeader,
  SuccessDetailView,
  ValidationInfo,
} from "styling/for-modal/PaymentModalStyling";

export interface Props {
  successMessage: string;
  successModalShow: boolean;
  handleCancle: (show: boolean) => void;
  mpin: string;
  tHistoryData: transactionListType;
}

const SuccessModal = (props: Props) => {
  const handleDownload = async () => {
    const res = await generatePDF(props.tHistoryData.transactionIdentifier);
    if (res.status === true) {
      window.open(`${baseUrl}${res.url}`);
    } else {
      console.log("pdf message error: ", res);
    }
  };

  return (
    <MySuccessModal
      show={props.successModalShow}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
    >
      <Modal.Header className="modal_header">
        <MySuccessModalHeader color="green">
          <div className="icon_wrapper">
            <GiCheckMark size={50} />
          </div>
          <p className="message_wrapper">Success</p>
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
              <p className="acc_no">{props.tHistoryData.accountNumber}</p>
            </div>
          </div>

          <div className="indicator">
            <ImArrowRight size="20" />
          </div>

          <div className="toAcc_wrapper">
            {props.tHistoryData.iconUrl ? (
              <Image
                src={`${baseUrl}/${props.tHistoryData.iconUrl}`}
                roundedCircle
                height="50px"
                width="50px"
              />
            ) : (
              <div className="icon_wrapper">
                <FiUser size={40} className="from_acc" />
              </div>
            )}

            <div className="acc">
              <p className="name">
                {props.tHistoryData.requestDetail.destinationAccountName}
              </p>
              <p className="acc_no">
                {props.tHistoryData.requestDetail.destinationAccountNumber}
              </p>
            </div>
          </div>
        </AccountView>

        <SuccessDetailView>
          <p className="detail_heading">benificary details</p>
          <div className="detail_viewWrapper">
            <div className="detail_wrapper">
              <p className="detail_title">Destination Bank Branch</p>
              <p className="detail_text">
                {props.tHistoryData.requestDetail.destinationBranchName !==
                  "null" &&
                props.tHistoryData.requestDetail.destinationBranchName !==
                  undefined
                  ? props.tHistoryData.requestDetail.destinationBranchName
                  : "DeFault Branch"}
              </p>
            </div>

            <div className="detail_wrapper">
              <p className="detail_title">Destination Branch Account No.</p>
              <p className="detail_text">{props.tHistoryData.destination}</p>
            </div>
          </div>
        </SuccessDetailView>

        <SuccessDetailView>
          <p className="detail_heading">Transaction Details</p>

          <div className="detail_viewWrapper">
            <div className="detail_wrapper">
              <p className="detail_title">Transaction Identifier</p>
              <p className="detail_text">
                {props.tHistoryData.transactionIdentifier}
              </p>
            </div>

            <div className="detail_wrapper">
              <p className="detail_title">service type</p>
              <p className="detail_text">{props.tHistoryData?.service}</p>
            </div>

            <div className="detail_wrapper">
              <p className="detail_title">Transaction date & Time </p>
              <p className="detail_text">{props.tHistoryData?.date}</p>
            </div>

            <div className="detail_wrapper">
              <p className="detail_title">Transaction Amount</p>
              <p className="detail_text">
                <strong>NPR. </strong>
                {formatLakh(
                  props.tHistoryData.amount - props.tHistoryData.charge
                )}
              </p>
            </div>

            <div className="detail_wrapper">
              <p className="detail_title">Transaction Charge</p>
              <p className="detail_text">
                <strong>NPR. </strong>
                {props.tHistoryData.charge}
              </p>
            </div>

            <div className="detail_wrapper">
              <p className="detail_title">Total Amount</p>
              <p className="detail_text">
                <strong>NPR. </strong>
                {formatLakh(props.tHistoryData.amount)}
              </p>
            </div>

            <div className="detail_wrapper">
              <p className="detail_title">Transaction Status</p>
              <ValidationInfo
                color="green"
                padding="0 0 0 2px"
                className="d-inline"
              >
                {props.tHistoryData.responseDetail.status}
              </ValidationInfo>
              <p className="detail_text d-inline pl-1">
                {props.tHistoryData.status}
              </p>
            </div>
          </div>
        </SuccessDetailView>

        <ValidationInfo color="green">
          <strong className="pr-2 text-bold">{props.successMessage}</strong>
        </ValidationInfo>

        <Modal.Footer className="modal_footer">
          <div className="download_wrapper" onClick={handleDownload}>
            <p className="icon_wrapper">
              <AiOutlineFilePdf size={30} />
            </p>
            <p className="download_text">Download Details</p>
          </div>
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
