import { brokerPaymentFormDataType } from "models/for-pages/brokerPayment_PageModels";
import { Button, Modal } from "react-bootstrap";
import { formatLakh } from "services/numberService";
import "../../modals/index.css";

export interface Props {
  transctionCharge: string | number;
  data: brokerPaymentFormDataType;
  modalShow: boolean;
  detailModalSubmitHandle: () => void;
  handleCancle: (show: boolean) => void;
  // handleModalShow: (show: boolean) => void;
}

function BrokerDetailModal(props: Props) {
  const {
    modalShow,
    transctionCharge,
    data,
    detailModalSubmitHandle,
    handleCancle,
  } = props;

  return (
    <Modal
      show={modalShow}
      onHide={() => handleCancle(false)}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ zIndex: 1400 }}
    >
      <Modal.Header className="modal_header" closeButton>
        <Modal.Title as="h6">Details of your Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "1em" }} className="modal_body">
        <strong className="d-block mb-2">Customer Details</strong>
        <div className="d-flex justify-content-between mb-2">
          <span>Account Number: </span>
          <span className="text-muted">{data.fromAccount}</span>
        </div>
        <strong className="d-block mb-2">Payments Details</strong>

        <div className="d-flex justify-content-between mb-2">
          <span>Broker: </span>
          <span className="text-muted">{data.DESTBrokerName}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Client Name: </span>
          <span className="text-muted">{data.clientName}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Client Id: </span>
          <span className="text-muted">{data.clientID}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Mobile Number: </span>
          <span className="text-muted">{data.mobileNumber}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>
            Amount<small>(Rs.)</small>:
          </span>
          <span className="text-muted">
            {formatLakh(parseInt(data.transctionAmount))}
          </span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>
            Charge<small>(Rs.)</small>:
          </span>
          <span className="text-muted">{transctionCharge}</span>
        </div>
        <Modal.Footer>
          <div className="float-right">
            <Button
              variant="secondary"
              style={{ padding: "7px 12px", marginRight: "1em" }}
              onClick={() => handleCancle(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              style={{ padding: "7px 12px" }}
              onClick={() => detailModalSubmitHandle()}
            >
              Submit
            </Button>
          </div>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
}

export default BrokerDetailModal;
