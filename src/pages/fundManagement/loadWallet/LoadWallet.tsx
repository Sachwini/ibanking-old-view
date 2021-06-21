import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { get, post } from "services/AjaxService";
import { GetAccountNumber, GetAllAccountNumber } from "helper/CustomerData";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiResponse } from "models/apiResponse";
import { Col } from "react-bootstrap";
import { PageTitle } from "components/page-title";
import { useStateValue } from "state-provider/StateProvider";
import DetailModal from "components/modals/load-wallet/DetailModal";
import SuccessModal from "components/modals/load-wallet/SuccessModal";

function LoadWallet() {
  const accountNumber = GetAccountNumber();
  const getAllAccountNumber = GetAllAccountNumber();
  const [fromAccount, setFromAccount] = useState<string>(accountNumber);
  const [contact, setContact] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [ValidationResponseMessage, setValidationResponseMessage] = useState({
    message: "",
    status: "",
    customerName: "",
    customerProfileImageUrl: "",
    validationIdentifier: "",
  });
  const [{ walletDetails }] = useStateValue();
  const [detailModalShow, setDetailModalShow] = useState<boolean>(false);
  const [validAccount, setValidAccount] = useState<boolean>(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState({
    status: "",
    message: "",
    details: "",
  });

  const handleReset = (e: any) => {
    setContact("");
    setAmount("");
    setRemarks("");
  };

  const openDetailModal = (e: any) => {
    e.preventDefault();
    setDetailModalShow(true);
  };

  const walletValidate = async () => {
    try {
      const res = await get<any>(
        `api/walletvalidate?walletUsername=${contact}&walletId=${walletDetails?.id}&amount=${amount}`
      );
      if (res?.data.detail.status === "success") {
        setValidAccount(true);
      } else {
        setValidAccount(false);
      }
      if (res) {
        setValidationResponseMessage({
          message: res.data.detail.message,
          status: res.data.detail.status,
          customerName: res.data.detail.customerName,
          customerProfileImageUrl: res.data.detail.customerProfileImageUrl,
          validationIdentifier: res.data.detail.validationIdentifier,
        });
      }
    } catch (error) {
      toast.error("error");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!fromAccount || !contact || !amount || !remarks) {
      toast.error("Incomplete Field");
      return;
    }
    try {
      const res = await post<apiResponse<any>>(
        `api/wallet/load?amount=${amount}&account_number=${fromAccount}&desc_one=${contact}&desc_two=${remarks}&wallet_id=${walletDetails?.id}&validationIdentifier=${ValidationResponseMessage?.validationIdentifier}&skipValidation=true`,
        {}
      );
      if (res) {
        setIsSuccessMessage(true);
        setResponseMessage({
          status: "success",
          message: res.data.message,
          details: res.data.details,
        });
        toast.success(res.data.details);
        console.log(res.data);
      }
    } catch (error) {
      if (error.response) {
        setIsSuccessMessage(true);
        setResponseMessage({
          status: "failure",
          message: error.response.data.message,
          details: error.response.data.details,
        });
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Container>
        <PageTitle
          title="Load Wallet"
          subTitle={`Load balance to ${walletDetails?.name}`}
        />
        <hr />
        <Col sm={12} md={6}>
          <Card className="card_Shadow">
            <Card.Body>
              <Form
                onSubmit={(e) => {
                  openDetailModal(e);
                  walletValidate();
                }}
              >
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label className="font-weight-bold">
                    From Account
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="fromAccount"
                    value={fromAccount}
                    onChange={(e) => setFromAccount(e.target.value)}
                  >
                    {!getAllAccountNumber ? (
                      <option></option>
                    ) : (
                      getAllAccountNumber?.map((accNum: any) => (
                        <option value={accNum} key={accNum}>
                          {accNum}
                        </option>
                      ))
                    )}
                  </Form.Control>
                </Form.Group>
                <div className="form-row">
                  <div className="col">
                    <Form.Group controlId="formGridAddress1">
                      <Form.Label className="font-weight-bold">
                        {walletDetails?.descOneFieldName}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        autoComplete="off"
                        placeholder="Enter your registered userId"
                        name="contact"
                        value={contact}
                        required
                        onChange={(e) => setContact(e.target.value)}
                      />
                      <Form.Text className="text-warning">
                        Please Insure the userID is correct before transaction
                      </Form.Text>
                    </Form.Group>
                  </div>
                </div>

                <Form.Group controlId="formGridAddress1">
                  <Form.Label className="font-weight-bold">Amount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Amount"
                    name="amount"
                    value={amount}
                    required
                    autoComplete="off"
                    min={0}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formGridAddress1">
                  <Form.Label className="font-weight-bold">
                    {walletDetails?.descTwoFieldName}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="remarks..."
                    name="remarks"
                    value={remarks}
                    autoComplete="off"
                    required
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                </Form.Group>
                <Button
                  className="btn btn-warning"
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  className="btn btn-light"
                  style={{ marginLeft: "20px" }}
                  variant="secondary"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Container>

      <ToastContainer />

      <DetailModal
        modalShow={detailModalShow}
        handleModalShow={(event: boolean) => setDetailModalShow(event)}
        ValidationResponseMessage={ValidationResponseMessage}
        validAccount={validAccount}
        modalFormSubmitHandle={handleSubmit}
        cancleButton={(event: boolean) => setDetailModalShow(false)}
      />

      <SuccessModal
        successModalShow={isSuccessMessage}
        handleModalShow={(event: boolean) => setIsSuccessMessage(event)}
        responseMessage={responseMessage}
        okButton={handleReset}
      />
    </>
  );
}

export default LoadWallet;
