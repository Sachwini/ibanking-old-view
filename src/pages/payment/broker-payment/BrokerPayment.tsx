import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { GetAccountNumber } from "helper/CustomerData";
import { Typeahead } from "react-bootstrap-typeahead";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getBrokerList } from "services/BrokerServices";
import { get, post } from "services/AjaxService";
import { brokerPayment } from "../fund-transfer/model";
import MpinModal from "components/modals/fundTransfer/MpinModal";
import BrokerDetailModal from "components/modals/broker-payment/BrokerDetailModal";
import { Loader } from "pages/static/Loader";
import SuccessModal from "components/modals/broker-payment/SuccessModal";
import { apiResponse } from "models/apiResponse";
import OtpModal from "components/modals/broker-payment/OtpModal";
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
  const [brokerName, setBrokerName] = useState<string>("");
  const [charge, setCharge] = useState<any>(0);
  const [mpin, setMpin] = useState<string>("");
  const [detailModalShow, setDetailModalShow] = useState<boolean>(false);
  const [mpinModalShow, setMpinModalShow] = useState<boolean>(false);
  const [otpRequired, setOtpRequired] = useState<boolean>(false);
  const [fullDetails, setFullDetails] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [isSuccessMessage, setIsSucessMessage] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState({
    status: "",
    message: "",
  });
  const [loading, setLoading] = useState<boolean>(true);

  const getServiceCharges = async () => {
    if (amount !== "" && brokerCode !== "") {
      const res = await get<serviceChargeItem>(
        "/api/broker/charge?amount=" + amount + "&code=" + brokerCode
      );
      console.log("Amount", amount, "BrokerCode", brokerCode);
      return res && setCharge(res.data.details);
    }
    return;
  };

  //for request Otp
  const requestOtp = async () => {
    const req = await get<apiResponse<any>>(
      "api/otp/request?serviceInfoType=CONNECT_IPS&associatedId&amount=" +
        amount
    );
    if (req && req.data.detail.otpRequired === true) {
      const res = await post<apiResponse<any>>(
        `api/changeBankTransferOtpStatus?status=true&otp=${otp}`,
        {}
      );
    }
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
          setLoading(false);
        }
      }
    };
    init();
    console.log("useEffect called");
    return () => {
      isSubscribed = false;
    };
  }, []);

  const handleBrokerCode = (e: any) => {
    try {
      if (e[0].value !== undefined) {
        setBrokerCode(e[0].value);
        setBrokerName(e[0].label);
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
    setBrokerCode("");
    setCharge(0);
    setMobileNumber("");
    setRemark("");
    setMpin("");
  };

  const openDetailModel = (e: any) => {
    e.preventDefault();
    setDetailModalShow(true);
  };

  const handleSubmit = async () => {
    if (
      !fromAccount ||
      !amount ||
      !clientName ||
      !clientId ||
      !mobileNumber ||
      !brokerCode
    ) {
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

    let url = "";
    if (parseFloat(amount) > 5000) {
      url = "/api/broker/payment?mPin=" + mpin + "&otp=" + otp;
    } else {
      url = "/api/broker/payment?mPin=" + mpin;
    }
    try {
      const res = await post<any>(url, model);
      if (res) {
        setIsSucessMessage(true);
        setResponseMessage({ status: "success", message: res.data.message });
        toast.success(res.data.details);
        console.log(res.data);
      }
    } catch (error) {
      if (error.response) {
        setIsSucessMessage(true);
        setResponseMessage({
          status: "failure",
          message: error.response.data.message,
        });
        toast.error(error.response.data.message);
      }
    }
  };

  const handleOtpRequired = () => {
    if (parseFloat(amount) <= 5000) {
      {
        setOtpRequired(false);
        handleSubmit();
      }
    } else if (parseFloat(amount) > 5000) {
      setOtpRequired(true);
      requestOtp();
    }
  };

  const changeOtpStatus = async () => {
    try {
      const res = post<any>(
        "api/changeBankTransferOtpStatus?status=true&otp=" + otp,
        {}
      );
      if (res) {
        handleSubmit();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const hasInfo = () => {
    if (
      !fromAccount ||
      !amount ||
      !clientName ||
      !clientId ||
      !mobileNumber ||
      !brokerCode
    ) {
      setFullDetails(false);
    } else {
      setFullDetails(true);
    }
  };

  return (
    <>
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <Card style={{ maxWidth: "90%" }}>
            <Card.Body>
              <Card.Title
                className="card-header"
                style={{ color: "white", background: "#49c70a" }}
              >
                <strong>
                  Broker Payment <br />
                </strong>
              </Card.Title>
              <hr />
              <Form
                onSubmit={(e) => {
                  openDetailModel(e);
                  hasInfo();
                  getServiceCharges();
                }}
              >
                <div className="form-group col-md-6">
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
                      <option value={accountNumber}>{accountNumber}</option>
                      <option value="...">...</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="formGridAddress1">
                    <Form.Label className="font-weight-normal">
                      Select Broker
                    </Form.Label>
                    <Typeahead
                      options={broker}
                      id="my-typeahead-id"
                      placeholder="Choose your broker..."
                      onChange={handleBrokerCode}
                    />
                    <Form.Text className="text-info">
                      {brokerCode
                        ? `Broker Id: ${brokerCode}`
                        : "selected none (please select one... )"}
                    </Form.Text>
                  </Form.Group>
                </div>

                <div className="form-row">
                  <div className="col">
                    <Form.Group controlId="formGridAddress1">
                      <Form.Label className="font-weight-normal">
                        Client Id
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your clientId"
                        name="clientId"
                        value={clientId}
                        required
                        autoComplete="off"
                        onChange={(e) => setClientId(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className="col">
                    <Form.Group controlId="formGridAddress1">
                      <Form.Label className="font-weight-normal">
                        Client Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your clientName"
                        name="clientName"
                        value={clientName}
                        required
                        autoComplete="off"
                        onChange={(e) => setClientName(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col">
                    <Form.Group controlId="formGridAddress1">
                      <Form.Label className="font-weight-normal">
                        Mobile Number
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your mobileNumber"
                        name="mobileNumber"
                        value={mobileNumber}
                        required
                        autoComplete="off"
                        onChange={(e) => setMobileNumber(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className="col">
                    <Form.Group controlId="formGridAddress1">
                      <Form.Label className="font-weight-normal">
                        Amount
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter your Amount"
                        name="amount"
                        value={amount}
                        required
                        min={0}
                        autoComplete="off"
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </div>
                <Form.Group controlId="formGridAddress1">
                  <Form.Label className="font-weight-normal">Remark</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your remark"
                    name="remark"
                    value={remark}
                    required
                    autoComplete="off"
                    onChange={(e) => setRemark(e.target.value)}
                  />
                </Form.Group>
                <Button
                  className="btn btn-primary"
                  variant="primary"
                  type="submit"
                >
                  Transfer
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
        )}
      </Container>
      {detailModalShow ? (
        <BrokerDetailModal
          modalShow={detailModalShow}
          handleModalShow={(event: boolean) => setDetailModalShow(event)}
          modalFormSubmitHandle={(event: boolean) => setMpinModalShow(true)}
          fromAccount={fromAccount}
          toAccount={broker ? brokerName : ""}
          amount={amount}
          charge={charge}
          clientName={clientName}
          clientId={clientId}
          mobileNumber={mobileNumber}
          validDetails={fullDetails}
          confirmModalCancleButton={(event: boolean) =>
            setDetailModalShow(false)
          }
        />
      ) : (
        ""
      )}
      {mpinModalShow ? (
        <MpinModal
          modalShow={mpinModalShow}
          handleModalShow={(event: boolean) => setMpinModalShow(event)}
          mpin={(mpin: string) => setMpin(mpin)}
          modalFormSubmitHandle={handleOtpRequired}
        />
      ) : (
        ""
      )}
      {otpRequired ? (
        <OtpModal
          modalShow={otpRequired}
          handleModalShow={(event: boolean) => setOtpRequired(event)}
          userOTP={(otp: string) => setOtp(otp)}
          modalFormSubmitHandle={changeOtpStatus}
          resendOtp={() => requestOtp}
        />
      ) : (
        ""
      )}
      {isSuccessMessage ? (
        <SuccessModal
          successModalShow={isSuccessMessage}
          handleModalShow={(e) => setIsSucessMessage(e)}
          responseMessage={responseMessage}
          fromAccount={fromAccount}
          toAccount={broker ? brokerName : ""}
          amount={amount}
          charge={charge}
          clientId={clientId}
          clientName={clientName}
          mobileNumber={mobileNumber}
          mpin={mpin}
        />
      ) : (
        ""
      )}
    </>
  );
};
export default BrokerPayment;
