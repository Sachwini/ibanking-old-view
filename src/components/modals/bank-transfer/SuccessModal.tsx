import { generatePDF, getTransctionHistory } from "helper/common_Functions";
import {
  transactionListType,
  transferRequestDetailType,
} from "models/apiResponse";
import { tHistoryDefaultData } from "models/payment_ModalType";
import { useEffect, useState } from "react";
import { Button, Modal, Image } from "react-bootstrap";
import { AiOutlineFilePdf } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { GiCheckMark } from "react-icons/gi";
import { ImArrowRight } from "react-icons/im";
import { useSetRecoilState } from "recoil";
import { baseUrl } from "services/BaseUrl";
import { formatLakh } from "services/numberService";
import { isLoading } from "state-provider/forPageSetting";
import {
  AccountView,
  MySuccessModal,
  MySuccessModalHeader,
  SuccessDetailView,
  ValidationInfo,
} from "styling/for-modal/PaymentModalStyling";

export interface Props {
  mpin: string;
  transctionIdentifier: string;
  successMessage: string;
  successModalShow: boolean;
  handleCancle: (show: boolean) => void;
}

const SuccessModal = (props: Props) => {
  const [tHistoryData, setTHistoryData] =
    useState<transactionListType<transferRequestDetailType>>(
      tHistoryDefaultData
    );
  const setLoading = useSetRecoilState(isLoading);

  useEffect(() => {
    let isSubscribed = true;
    setLoading(true);
    const getData = async () => {
      if (props.successModalShow) {
        const res = await getTransctionHistory(props.mpin);
        if (isSubscribed && res) {
          const data = res.transactionList[0];
          setTHistoryData(data);
        }
      }
    };

    getData();
    setLoading(false);

    return () => {
      isSubscribed = false;
    };
  }, [props.successModalShow]);

  const handleDownload = async () => {
    const res = await generatePDF(props.transctionIdentifier);
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
      aria-labelledby="bank-transfer-success-modal"
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
              <p className="acc_no">{tHistoryData.accountNumber}</p>
            </div>
          </div>

          <div className="indicator">
            <ImArrowRight size="20" />
          </div>

          <div className="toAcc_wrapper">
            {tHistoryData.iconUrl ? (
              <Image
                src={`${baseUrl}/${tHistoryData.iconUrl}`}
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
                {tHistoryData.requestDetail.destinationAccountName}
              </p>
              <p className="acc_no">
                {tHistoryData.requestDetail.destinationAccountNumber}
              </p>
            </div>
          </div>
        </AccountView>

        <SuccessDetailView>
          <p className="detail_heading">benificary details</p>
          <div className="detail_viewWrapper">
            <div className="detail_wrapper">
              <p className="detail_title">Destination Bank</p>
              <p className="detail_text">
                {tHistoryData.requestDetail.destinationBankName}
              </p>
            </div>

            <div className="detail_wrapper">
              <p className="detail_title">Destination Bank Branch</p>
              <p className="detail_text">
                {tHistoryData.requestDetail.destinationBranchName !== "null" &&
                tHistoryData.requestDetail.destinationBranchName !== undefined
                  ? tHistoryData.requestDetail.destinationBranchName
                  : "DeFault Branch"}
              </p>
            </div>

            <div className="detail_wrapper">
              <p className="detail_title">Destination Bank Account No.</p>
              <p className="detail_text">
                {tHistoryData.requestDetail.destinationAccountNumber}
              </p>
            </div>
          </div>
        </SuccessDetailView>

        <SuccessDetailView>
          <p className="detail_heading">Transctions Details</p>

          <div className="detail_viewWrapper">
            <div className="detail_wrapper">
              <p className="detail_title">Transctions Identifier</p>
              <p className="detail_text">
                {tHistoryData.transactionIdentifier}
              </p>
            </div>

            <div className="detail_wrapper">
              <p className="detail_title">service type</p>
              <p className="detail_text">{tHistoryData?.service}</p>
            </div>

            <div className="detail_wrapper">
              <p className="detail_title">Transction date & Time </p>
              <p className="detail_text">{tHistoryData?.date}</p>
            </div>

            <div className="detail_wrapper">
              <p className="detail_title">Transction Amount</p>
              <p className="detail_text">
                <strong>NPR. </strong>
                {formatLakh(tHistoryData.amount - tHistoryData.charge)}
              </p>
            </div>

            <div className="detail_wrapper">
              <p className="detail_title">Transction Charge</p>
              <p className="detail_text">
                <strong>NPR. </strong>
                {tHistoryData.charge}
              </p>
            </div>

            <div className="detail_wrapper">
              <p className="detail_title">Total Amount</p>
              <p className="detail_text">
                <strong>NPR. </strong>
                {formatLakh(tHistoryData.amount)}
              </p>
            </div>

            <div className="detail_wrapper">
              <p className="detail_title">transction Status</p>
              <ValidationInfo
                color="green"
                padding="0 0 0 2px"
                className="d-inline"
              >
                {tHistoryData.responseDetail.status}
              </ValidationInfo>
              <p className="detail_text d-inline pl-1">{tHistoryData.status}</p>
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
