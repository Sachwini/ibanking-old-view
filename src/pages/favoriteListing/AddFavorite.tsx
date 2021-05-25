import ConfirmModal from "components/modals/favoriteAccount/ConfirmModal";
import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { post } from "services/AjaxService";

const AddFavorite = () => {
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [destinationBankName, setDestinationBankName] = useState<string>("");
  const [destinationAccountHolderName, setDestinationAccountHolderName] = useState<string>("");
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
    }
    };
    if (!accountNumber || !destinationBankName ||!destinationAccountHolderName)
      return
    try {
      const res = await post<any>("/api/saveuserpayment", model);
      if (res) {
        toast.success(res.data.message)
        handleReset(e);
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
      
  };

  

  return (
    <>
      <Container>
        <Card style={{ maxWidth: "90%" }}>
          <Card.Body>
            <Card.Title
              className="card-header"
              style={{ color: "white", background: "#49c70a" }}
            >
              <strong>
                Add Your Favorite Account <br />
              </strong>
            </Card.Title>
            <hr />
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                setDetailModalShow(true);
              }}
            >
              <div className="form-group col-md-6">
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label className="font-weight-normal">
                    Account Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your favorite account number"
                    name="accountNumber"
                    value={accountNumber}
                    required
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="form-row">
                <div className="col">
                  <Form.Group controlId="formGridAddress1">
                    <Form.Label className="font-weight-normal">
                      Destination Account Holder Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Destination Account Holder Name"
                      name="destinationAccountHolderName"
                      value={destinationAccountHolderName}
                      required
                      onChange={(e) =>
                        setDestinationAccountHolderName(e.target.value)
                      }
                    />
                  </Form.Group>
                </div>
                <div className="col">
                  <Form.Group controlId="formGridAddress1">
                    <Form.Label className="font-weight-normal">
                      Destination Bank Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Destination Bank Name"
                      name="destinationBankName"
                      value={destinationBankName}
                      required
                      onChange={(e) => setDestinationBankName(e.target.value)}
                    />
                  </Form.Group>
                </div>
              </div>
              <Button
                className="btn btn-primary"
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
                Reset
              </Button>
              <ToastContainer autoClose={5000} position="top-center" />
            </Form>
          </Card.Body>
        </Card>
      </Container>
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
