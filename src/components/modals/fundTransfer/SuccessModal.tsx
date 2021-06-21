import { Button, Modal } from "react-bootstrap";
import { GiCheckMark } from "react-icons/gi";
import { VscError } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useStateValue } from "state-provider/StateProvider";
import {
  ErrorModalHeader,
  SuccessModalHeader,
} from "styling/common/ModalStyling";

export interface Props {
  successModalShow: boolean;
  handleModalShow: (show: boolean) => void;
  fromAccount: string;
  toAccount: string;
  destinationAccountHolderName: string;
  branch: string;
  amount: string;
  mpin: string;
  responseMessage: {
    status: string;
    message: string;
  };
}

const SuccessModal = (props: Props) => {
  const {
    successModalShow,
    handleModalShow,
    responseMessage,
    fromAccount,
    toAccount,
    amount,
    branch,
    destinationAccountHolderName,
    mpin,
  } = props;
  const [{}, dispatch] = useStateValue();

  const handleInfo = () => {
    dispatch({
      type: "FUND_TRANSFER_DETAILS",
      fundTransferDetails: {
        fromAccount,
        toAccount,
        amount,
        destinationAccountHolderName,
        branch,
        mpin,
      },
    });
  };
  return (
    <Modal
      show={successModalShow}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ zIndex: 1400 }}
    >
      <Modal.Header className="justify-content-center p-0">
        {responseMessage?.status === "success" ? (
          <SuccessModalHeader>
            <GiCheckMark color="white" size={60} />
            <h4>Success</h4>
          </SuccessModalHeader>
        ) : (
          <ErrorModalHeader>
            <VscError color="white" size={60} />
            <h4>Oops !!!</h4>
          </ErrorModalHeader>
        )}
      </Modal.Header>
      <Modal.Body style={{ padding: "2em", color: "black" }}>
        <div className="mb-4">{responseMessage?.message}</div>
        <Modal.Footer>
          {responseMessage?.status === "success" ? (
            <Link
              to="/fund-transfer-success-confirmation"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Button
                onClick={() => {
                  handleModalShow(false);
                  handleInfo();
                }}
                style={{ float: "right", padding: "8px 1.8em" }}
              >
                OK
              </Button>
            </Link>
          ) : (
            <Button
              onClick={() => handleModalShow(false)}
              style={{ float: "right", padding: "8px 1.8em" }}
            >
              OK
            </Button>
          )}
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessModal;
