import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { GetAccountNumber } from "helper/CustomerData";
import { Typeahead } from "react-bootstrap-typeahead";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getBrokerList } from "services/BrokerServices";

interface selectItem {
  label: string;
  value: string;
}

const BrokerPayment = () => {
  const accountNumber = GetAccountNumber();
    const [fromAccount, setFromAccount] = useState<string>(accountNumber);
    const [amount, setAmount] = useState<string>("");
    const [clientName, setClientName] = useState<string>("");
    const [clientId, setClientId] = useState<string>("");
    const [mobileNumber, setMobileNumber] = useState<string>("");
    const [remark, setRemark] = useState<string>("");
    const [broker, setBroker] = useState<selectItem[]>([]);
    const [brokerCode, setBrokerCode] = useState<string>("");

    useEffect(() => {
      let isSubscribed = true;

      const init = async () => {
        const broker = await getBrokerList();
        if (isSubscribed) {
          const brokerData: selectItem[] = [];
          if (broker) {
            broker.forEach((x: any) =>
              brokerData.push({ label: x.name, value: x.code.toString() })
            );
            setBroker(brokerData);
          }
        }
      };
      init();
      return () => {
        isSubscribed = false;
      };
    }, []);
    const handleBrokerCode = (e: any) => {
      try {
        if (e[0].value !== undefined) { 
          setBrokerCode(e[0].value);
        } else {
          setBrokerCode("");
          setBroker([]);
        }
      } catch {} 
    };

    
  return (
    <Container>
      <Card style={{maxWidth:"50%"}}>
        <Card.Body>
          <Card.Title
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <strong>
              Broker Payment <br />
            </strong>
          </Card.Title>
          <hr />
          <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label className="font-weight-bold">From Account</Form.Label>
              <Form.Control
                type="text"
                placeholder="from account"
                name="fromAccount"
                disabled
                value={fromAccount}
                onChange={(e) => setFromAccount(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formGridAddress1">
              <Form.Label className="font-weight-bold">Amount</Form.Label>
              <Form.Control
                type="text"
                placeholder="Amount"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formGridAddress1">
              <Form.Label className="font-weight-bold">
                Select Broker
              </Form.Label>
              <Typeahead
                options={broker}
                id="my-typeahead-id"
                placeholder="Choose your broker..."
                onChange={handleBrokerCode}
              />
            </Form.Group>
            <Form.Group controlId="formGridAddress1">
              <Form.Label className="font-weight-bold">Client Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="clientName"
                name="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formGridAddress1">
              <Form.Label className="font-weight-bold">Client Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="clientId"
                name="clientId"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formGridAddress1">
              <Form.Label className="font-weight-bold">
                Mobile Number
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="mobileNumber"
                name="mobileNumber"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formGridAddress1">
              <Form.Label className="font-weight-bold">Remark</Form.Label>
              <Form.Control
                type="text"
                placeholder="remark"
                name="remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
              />
            </Form.Group>
            <Button
              className="btn btn-warning"
              variant="primary"
              type="submit"
              //   onClick={handleSubmit}
            >
              Submit
              <ToastContainer autoClose={5000} position="top-center" />
            </Button>
            <Button
              className="btn btn-light"
              style={{ marginLeft: "20px" }}
              variant="secondary"
              type="submit"
              //   onClick={handleReset}
            >
              Reset
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BrokerPayment;
