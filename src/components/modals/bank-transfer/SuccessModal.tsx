import { Button, Modal } from "react-bootstrap";
import { GiCheckMark } from "react-icons/gi";
import { VscError } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useStateValue } from "state-provider/StateProvider";
import {
  ErrorModalHeader,
  SuccessModalHeader,
} from "../../../styling/common/ModalStyling";

export interface Props {
  fromAccount: string;
  toAccount: string;
  DESTBankName: string;
  DESTAccHolderName: string;
  DESTBranchName: string;
  transctionAmount: string;
  transctionCharge: string | number;
  mpin: string;
  bankTransferResponse: {
    status: string;
    message: string;
  };
  successModalShow: boolean;
  successModalShowHandle: (show: boolean) => void;
}

const SuccessModal = (props: Props) => {
  const {
    successModalShow,
    successModalShowHandle,
    bankTransferResponse,
    fromAccount,
    toAccount,
    DESTBankName,
    DESTAccHolderName,
    DESTBranchName,
    transctionAmount,
    transctionCharge,
    mpin,
  } = props;
  const [{}, dispatch] = useStateValue();

  const handleInfo = () => {
    dispatch({
      type: "BANK_TRANSFER_DETAILS",
      bankTransferDetails: {
        fromAccount,
        toAccount,
        DESTBankName,
        DESTAccHolderName,
        DESTBranchName,
        transctionAmount,
        transctionCharge,
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
        {bankTransferResponse?.status === "success" ? (
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
        <div className="mb-4">{bankTransferResponse?.message}</div>
      </Modal.Body>

      <Modal.Footer>
        {bankTransferResponse?.status === "success" ? (
          <Link
            to="/bank-transfer-success-confirmation"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <Button
              onClick={() => {
                successModalShowHandle(false);
                handleInfo();
              }}
              style={{ float: "right", padding: "8px 1.8em" }}
            >
              OK
            </Button>
          </Link>
        ) : (
          <Button
            onClick={() => {
              successModalShowHandle(false);
            }}
            style={{ float: "right", padding: "8px 1.8em" }}
          >
            OK
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;
