import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { GetAccountNumber } from "helper/CustomerData";
import { Typeahead } from "react-bootstrap-typeahead";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getBrokerList } from "services/BrokerServices";
import { get, post } from "services/AjaxService";
import { brokerPayment } from "../fund-transfer/model";

interface selectItem {
  label: string;
  value: string;
}

export interface serviceChargeItem {
  amount: any;
  code: any;
  details: any;
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
  const [charge, setCharge] = useState<any>(0);
  const [mpin, setMpin] = useState<string>("");

  const getServiceCharges = async () => {
    if (amount !== "" && brokerCode !== "") { 
      const res = await get<serviceChargeItem>(
        "/api/broker/charge?amount=" + amount + "&code=" + brokerCode
      );
      console.log("Amount",amount, "BrokerCode",brokerCode);
      return res && setCharge(res.data.details); 
    }
    return;
  };

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
    getServiceCharges();
    console.log("useEffect called")
    return () => {
      isSubscribed = false;
    };
  }, [brokerCode, amount, charge]);
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

  const handleReset = (e: any) => {
    e.preventDefault();
    setAmount("");
    setClientName("");
    setClientId("");
    setBroker([]);
    setBrokerCode("");
    setCharge(0)
    setMobileNumber("");
    setRemark("");
    setMpin("");
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!fromAccount || !amount || !clientName || !clientId || !mobileNumber || !brokerCode) {
    toast.error("Incomplete field");
    return;
  }
    const model: brokerPayment = {
      accountNumber: fromAccount,
      amount: amount,
      charge: charge,
      brokerCode: brokerCode,
      clientName: clientName,
      clientId: clientId,
      mobileNumber: mobileNumber,
      remarks: remark,
    };
    try {
      const res = await post<any>("/api/broker/payment?mPin=" + mpin, model);
      if (res) {
        toast.success(res.data.message);
        console.log(res.data);
      }
    } catch(error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <Container>
      <Card style={{ maxWidth: "50%" }}>
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
                placeholder="Enter your from account"
                name="fromAccount"
                disabled
                value={fromAccount}
                onChange={(e) => setFromAccount(e.target.value)}
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
              <Form.Text className="text-warning">
                {brokerCode ? `Broker Id: ${brokerCode}`:"Selected None (Please Select One ...)"}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formGridAddress1">
              <Form.Label className="font-weight-bold">Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your Amount"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Form.Text className="text-warning">Charge: {charge}</Form.Text>
            </Form.Group>
            <Form.Group controlId="formGridAddress1">
              <Form.Label className="font-weight-bold">Client Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your clientName"
                name="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formGridAddress1">
              <Form.Label className="font-weight-bold">Client Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your clientId"
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
                placeholder="Enter your mobileNumber"
                name="mobileNumber"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formGridAddress1">
              <Form.Label className="font-weight-bold">Remark</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your remark"
                name="remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formGridAddress1">
              <Form.Label className="font-weight-bold">Mpin</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Mpin"
                name="mpin"
                value={mpin}
                onChange={(e) => setMpin(e.target.value)}
              />
            </Form.Group>
            <Button
              className="btn btn-warning"
              variant="primary"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              className="btn btn-light"
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
  );
};

export default BrokerPayment;
