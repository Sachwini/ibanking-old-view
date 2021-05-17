import { Button, Modal } from "react-bootstrap";
import { GiCheckMark } from "react-icons/gi";
import { MdClose } from "react-icons/md";

export interface Props {
  fundTransferResponse: {
    status: string;
    message: string;
  };
  successModalShow: boolean;
  successModalShowHandle: (show: boolean) => void;
}

const SuccessModal = (props: Props) => {
  return (
    <Modal
      show={props.successModalShow}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ zIndex: 1400 }}
    >
      <Modal.Header className="justify-content-center p-0">
        {props.fundTransferResponse.status === "success" ? (
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
        <div className="mb-4">{props.fundTransferResponse.message}</div>
        <Button
          onClick={() => props.successModalShowHandle(false)}
          style={{ float: "right", padding: "8px 1.8em" }}
        >
          OK
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessModal;
