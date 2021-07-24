import { localDate } from "helper/DateConfig";
import { Button, Image } from "react-bootstrap";
import { ChequeModalContainer } from "styling/ChequeStyling";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "styling/common/ModalStyling";

export interface Props {
  modalShow: boolean;
  fromAccount: string;
  chequeLeaves: string;

  modalSubmitHandle: () => void;
  handleCancle: (show: boolean) => void;
}

function DetailModal(props: Props) {
  return (
    <ChequeModalContainer
      show={props.modalShow}
      onHide={() => props.handleCancle(false)}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalHeader padding="1.5rem 1.5rem 0" closeButton>
        <div>
          <Image
            src="/images/baner.png"
            alt="baner image"
            height="50px"
            width="80%"
          />
          <p className="success_headerText">New CheckBook Request</p>
          <p className="date">{localDate()}</p>
        </div>
      </ModalHeader>

      <ModalBody padding="1.5rem 2rem 1.5rem">
        <strong className="d-block mb-2">
          New Check Book Request Details:
        </strong>

        <div className="detail_wrapper">
          <span className="label">Account Number: </span>
          <span className="value">{props.fromAccount}</span>
        </div>

        <div className="detail_wrapper">
          <span className="label">Cheque Leaves: </span>
          <span className="value">{props.chequeLeaves}</span>
        </div>
      </ModalBody>

      <ModalFooter padding="0.5 1rem">
        <Button
          variant="outline-success"
          onClick={props.modalSubmitHandle}
          className="px-4 mr-2"
        >
          Processed
        </Button>
      </ModalFooter>
    </ChequeModalContainer>
  );
}

export default DetailModal;
