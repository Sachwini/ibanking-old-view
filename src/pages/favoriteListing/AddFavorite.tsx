import ConfirmModal from "components/modals/favoriteAccount/ConfirmModal";
import { PageTitle } from "components/page-title";
import { useState } from "react";
import { Button, Card, Col, Container, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { post } from "services/AjaxService";

const AddFavorite = () => {
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [destinationBankName, setDestinationBankName] = useState<string>("");
  const [destinationAccountHolderName, setDestinationAccountHolderName] =
    useState<string>("");
  const [detailModalShow, setDetailModalShow] = useState<boolean>(false);

  const handleReset = (e: any) => {
    setAccountNumber("");
    setDestinationBankName("");
    setDestinationAccountHolderName("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const model: any = {
      reminderType: "OneTime",
      serviceInfoType: "CONNECT_IPS",
      data: {
        destinationAccountNumber: accountNumber,
        destinationBankName: destinationBankName,
        destinationAccountHolderName: destinationAccountHolderName,
      },
    };
    if (!accountNumber || !destinationBankName || !destinationAccountHolderName)
      return;
    try {
      const res = await post<any>("/api/saveuserpayment", model);
      if (res) {
        toast.success(res.data.message);
        handleReset(e);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <PageTitle
        title="Add Your Favorite Account"
        subTitle="Manage and add your Favorite listing &hearts;"
      />
      <hr />
      <Col sm={12} md={6}>
        <Card className="card_Shadow" style={{ marginTop: "2rem" }}>
          <Card.Body>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                setDetailModalShow(true);
              }}
            >
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label className="font-weight-bold">
                  Account Number
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your favorite account number"
                  name="accountNumber"
                  value={accountNumber}
                  required
                  autoComplete="off"
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formGridAddress1">
                <Form.Label className="font-weight-bold">
                  Destination Account Holder Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Destination Account Holder Name"
                  name="destinationAccountHolderName"
                  value={destinationAccountHolderName}
                  required
                  autoComplete="off"
                  onChange={(e) =>
                    setDestinationAccountHolderName(e.target.value)
                  }
                />
              </Form.Group>
              <Form.Group controlId="formGridAddress1">
                <Form.Label className="font-weight-bold">
                  Destination Bank Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Destination Bank Name"
                  name="destinationBankName"
                  value={destinationBankName}
                  required
                  autoComplete="off"
                  onChange={(e) => setDestinationBankName(e.target.value)}
                />
              </Form.Group>
              <hr />
              <div className="mt-2">
                <Button
                  className="btn btn-warning"
                  variant="primary"
                  type="submit"
                >
                  Add
                </Button>
                <Button
                  className="btn btn-secondary"
                  style={{ marginLeft: "20px" }}
                  variant="secondary"
                  type="submit"
                  onClick={handleReset}
                >
                  Cancel
                </Button>
              </div>
              <ToastContainer autoClose={5000} position="top-center" />
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <ConfirmModal
        modalShow={detailModalShow}
        handleModalShow={(event) => setDetailModalShow(event)}
        modalFormSubmitHandle={handleSubmit}
        accountNumber={accountNumber}
        destinationBankName={destinationBankName}
        destinationAccountHolderName={destinationAccountHolderName}
        confirmModalCancleButton={(event) => setDetailModalShow(false)}
      />
    </>
  );
};

export default AddFavorite;
