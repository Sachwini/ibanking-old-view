import { Button, Modal } from "react-bootstrap";

export interface Props {
  modalShow: boolean;
  handleModalShow: (show: boolean) => void;
  modalFormSubmitHandle: (show: boolean) => void;
  fromAccount: string;
  toAccount: string;
  branch: string;
  amount: string;
  validAccount: boolean;
}

function DetailModal(props: Props) {
  const {
    modalShow,
    handleModalShow,
    modalFormSubmitHandle,
    fromAccount,
    toAccount,
    branch,
    amount,
    validAccount,
  } = props;

  const handleSubmit = (e: any) => {
    modalFormSubmitHandle(e);
    handleModalShow(false);
  };

  return (
    <Modal
      show={modalShow}
      onHide={() => handleModalShow(false)}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ zIndex: 1400 }}
    >
      <Modal.Header closeButton>
        <Modal.Title as="h6">Details of your Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table">
          <tbody>
            <tr>
              <th scope="row">From Account</th>
              <td>{fromAccount}</td>
            </tr>
            <tr>
              <th scope="row">Destination Account</th>
              <td>{toAccount}</td>
            </tr>
            <tr>
              <th scope="row">Valid Account</th>
              <td>
                {validAccount
                  ? "This is Valid Account"
                  : "This is inValid Account"}
              </td>
            </tr>
            {branch ?
              (<tr>
                <th scope="row">Branch</th>
                <td>{branch}</td>
              </tr>):""
} 
            <tr>
              <th scope="row">Amount</th>
              <td>{amount}</td>
            </tr>
          </tbody>
        </table>
        <Button
          variant="primary"
          type="submit"
          style={{ float: "right" }}
          onClick={handleSubmit}
          disabled={!validAccount}
        >
          Submit
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default DetailModal;
