import { Button, Modal } from "react-bootstrap";
import { GiCheckMark } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { useStateValue } from "state-provider/StateProvider";

export interface Props {
  successModalShow: boolean;
  handleModalShow: (show: boolean) => void;
  fromAccount: string;
  toAccount: string;
  amount: string;
  charge: string;
  clientId: string;
  clientName: string;
  mobileNumber: string;
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
    charge,
    clientId,
    clientName,
    mobileNumber,
    mpin,
  } = props;
  const [{}, dispatch] = useStateValue();

  const handleInfo = () => {
    dispatch({
      type: "BROKER_PAYMENT_DETAILS",
      brokerPaymentDetails: {
        fromAccount,
        toAccount,
        amount,
        charge,
        clientId,
        clientName,
        mobileNumber,
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
        {responseMessage.status === "success" ? (
          <div
            style={{
              width: "100%",
              height: "100px",
              background: "#44ab76",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <GiCheckMark color="white" size={30} fontWeight="800" />
          </div>
        ) : (
          <div
            style={{
              height: "70px",
              width: "70px",
              background: "#de795f",
              borderRadius: "50%",
            }}
          >
            <MdClose color="white" size={30} fontWeight="800" />
          </div>
        )}
      </Modal.Header>
      <Modal.Body style={{ padding: "2em" }}>
        <div className="mb-4">{responseMessage.message}</div>
        {responseMessage.status === "success" ? (
          <Link
            to="/broker-payment-success-confirmation"
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
      </Modal.Body>
    </Modal>
  );
};

export default SuccessModal;
