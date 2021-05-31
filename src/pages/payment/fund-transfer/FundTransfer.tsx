import { useEffect, useState } from "react";
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";
import { fundTransfer } from "./model";
import { get, post } from "services/AjaxService";
import { getBankBranches } from "services/BankServices";
import { Typeahead } from "react-bootstrap-typeahead";
import { GetAccountNumber } from "helper/CustomerData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiResponse } from "models/apiResponse";
import DetailModal from "components/modals/fundTransfer/DetailModal";
import MpinModal from "components/modals/fundTransfer/MpinModal";
import OtpModal from "components/modals/fundTransfer/OtpModal";
import SuccessModal from "components/modals/fundTransfer/SuccessModal";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { RiUserStarLine, RiBankLine } from "react-icons/ri";
import { IconStyle } from "styling/common/IconStyling";

interface selectItem {
  label: string;
  value: string;
}

export const FundTransfer = () => {
  const accountNumber = GetAccountNumber();
  const [fromAccount, setFromAccount] = useState<string>(accountNumber);
  const [toAccount, setToAccount] = useState<string>("");
  const [bankBranchId, setBankBranchId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [mpin, setMpin] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();
  const [branch, setBranch] = useState<selectItem[]>([]);
  const [mpinModalShow, setMpinModalShow] = useState<boolean>(false);
  const [detailModalShow, setDetailModalShow] = useState<boolean>(false);
  const [destinationAccountHolderName, setDestinationAccountHolderName] =
    useState<string>("");
  const [validAccount, setValidAccount] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [otpRequired, setOtpRequired] = useState<boolean>(false);
  const [isSuccessMessage, setIsSucessMessage] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState({
    status: "",
    message: "",
  });
  const [favoriteAcc, setFavoriteAcc] = useState<any[]>([]);

  //For account Validation
  const accountValidation = async () => {
    try {
      if (
        toAccount !== "" &&
        destinationAccountHolderName !== "" &&
        bankBranchId !== ""
      ) {
        const res = get<any>(
          "api/account/validation?destinationAccountNumber=" +
            toAccount +
            "&destinationAccountName=" +
            destinationAccountHolderName +
            "&destinationBranchId=" +
            bankBranchId
        );
        return res && setValidAccount(true);
      }
    } catch {
      setValidAccount(false);
    }
  };

  //for request Otp
  const requestOtp = async () => {
    const res = get<apiResponse<any>>(
      "api/otp/request?serviceInfoType=CONNECT_IPS&associatedId&amount=" +
        amount
    );
  };

  // for loading favorite accout
  const favAcc = async () => {
    try {
      const res = await get<any>(
        "/api/userSavedPayment?serviceInfoType=CONNECT_IPS"
      );
      if (res) {
        setFavoriteAcc(res.data.details);
        console.log(favoriteAcc);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isSubscribed = true;

    const init = async () => {
      const branch = await getBankBranches();
      if (isSubscribed) {
        const branchData: selectItem[] = [];
        if (branch) {
          branch.forEach((x: any) =>
            branchData.push({ label: x.name, value: x.id.toString() })
          );
          setBranch(branchData);
        }
      }
    };
    init();
    return () => {
      isSubscribed = false;
    };
  }, []);

  //for setting the value for bankId
  const handleBranchID = (e: any) => {
    try {
      if (e[0].value !== undefined) {
        setBankBranchId(e[0].value);
      } else {
        setBankBranchId("");
        setBranch([]);
      }
    } catch {}
  };

  const handleReset = (e: any) => {
    e.preventDefault();
    setToAccount("");
    setBankBranchId("");
    setAmount("");
    setDestinationAccountHolderName("");
  };

  const openDetailModel = (e: any) => {
    e.preventDefault();
    setDetailModalShow(true);
  };

  const handleSubmit = async (e: any) => {
    if (!fromAccount || !toAccount || !bankBranchId || !amount || !mpin) {
      toast.error("Incomplete field");
      return;
    }
    setLoading(true);

    const model: fundTransfer = {
      from_account_number: fromAccount,
      to_account_number: toAccount,
      bank_branch_id: bankBranchId,
      amount: amount,
      mPin: mpin,
      message: "",
    };
    console.log("fundTranfer data", model);

    let url = "";
    if (parseFloat(amount) > 5000) {
      url =
        "api/fundtransfer?from_account_number=" +
        fromAccount +
        "&to_account_number=" +
        toAccount +
        "&bank_branch_id=" +
        bankBranchId +
        "&amount=" +
        amount +
        "&mPin=" +
        mpin +
        "&otp=" +
        otp;
    } else {
      url =
        "api/fundtransfer?from_account_number=" +
        fromAccount +
        "&to_account_number=" +
        toAccount +
        "&bank_branch_id=" +
        bankBranchId +
        "&amount=" +
        amount +
        "&mPin=" +
        mpin;
    }
    try {
      const res = await post<fundTransfer>(url, {}, () => setLoading(false));
      if (res) {
        setIsSucessMessage(true);
        setResponseMessage({ status: "success", message: res.data.message });
        toast.success(res.data.message);
        console.log(res.data);
      }
      handleReset(e);
    } catch (error) {
      setIsSucessMessage(true);
      setResponseMessage({
        status: "failure",
        message: error.response.data.message,
      });
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  const handleOtpRequired = () => {
    if (parseFloat(amount) <= 5000) {
      setOtpRequired(false);
      handleSubmit(e);
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
        handleSubmit(e);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const UserProfile = (
    <Popover id="popover-basic">
      <Popover.Content
        style={{
          padding: "0",
          maxHeight: "20rem",
          minWidth: "10rem",
          overflowY: "auto",
          whiteSpace: "pre-wrap",
        }}
      >
        <Card> 
          <Card.Header
            style={{
              fontWeight: "bold",
              backgroundColor: "#436b33",
              color: "#fff",
              fontSize: "110%",
              width: "100%",
            }}
          >
            {" "}
            My Saved Bank Account ({favoriteAcc ? favoriteAcc.length : "0"})
          </Card.Header>
        </Card>
        <div
          style={{
            padding: "8px",
            background: "#f5f5f5bc",
            cursor: "pointer",
          }}
          onClick={() => {
            favAcc();
          }}
        >
          {favoriteAcc
            ? favoriteAcc.map((fav, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setToAccount(fav.data.destinationAccountNumber);
                      setDestinationAccountHolderName(
                        fav.data.destinationAccountHolderName
                      );
                    }}
                  >
                    <Container>
                      <Row>
                        <Col xs={3}>
                          <RiBankLine size={30} />
                        </Col>
                        <Col>
                          <div
                            style={{
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            {fav.data.destinationBankName}
                          </div>
                          <div style={{ fontSize: "110%" }}>
                            {fav.data.destinationAccountNumber}
                          </div>
                          {fav.data.destinationAccountHolderName ? (
                            <div
                              style={{ fontSize: "small", fontWeight: "bold" }}
                            >
                              {fav.data.destinationAccountHolderName}
                            </div>
                          ) : (
                            ""
                          )}
                          <hr />
                        </Col>
                      </Row>
                    </Container>
                  </div>
                );
              })
            : ""}
        </div>
      </Popover.Content>
    </Popover>
  );

  return (
    <>
      <Card>
        <Card.Body>
          <Form
            onSubmit={(e) => {
              openDetailModel(e);
              accountValidation();
            }}
          >
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
            <div className="form-row">
              <div className="col">
                <Form.Group controlId="formGridAddress1">
                  <Form.Label className="font-weight-bold">
                    Destination Account
                  </Form.Label>
                  <Form.Control
                    type="text"
                    autoComplete="off"
                    placeholder="destination account"
                    name="toAccount"
                    value={toAccount}
                    required
                    onChange={(e) => setToAccount(e.target.value)}
                  />
                  <Form.Text className="text-warning">
                    Please Insure the account number is correct before
                    transaction
                  </Form.Text>
                </Form.Group>
              </div>
              <div className="pl-4 d-flex align-items-center">
                <OverlayTrigger
                  transition={false}
                  trigger="click"
                  placement="bottom"
                  overlay={UserProfile}
                  rootClose
                >
                  <IconStyle hover>
                    <RiUserStarLine size={30} onClick={(e) => favAcc()} />
                  </IconStyle>
                </OverlayTrigger>
              </div>
            </div>
            <Form.Group controlId="formGridAddress1">
              <Form.Label className="font-weight-bold">
                Select Destination Bank Branch
              </Form.Label>
              <Typeahead
                options={branch}
                id="my-typeahead-id"
                placeholder="Choose destination branch..."
                onChange={handleBranchID}
              />
              <Form.Text className="text-warning">
                {bankBranchId
                  ? `bankBranchId: ${bankBranchId}`
                  : "Selected none (Please select one... )"}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formGridAddress1">
              <Form.Label className="font-weight-bold">
                Destination AccountHolder Name
              </Form.Label>
              <Form.Control
                type="text"
                autoComplete="off"
                placeholder="Enter your Destination AccountHolder Name"
                name="destinationAccountHolderName"
                value={destinationAccountHolderName}
                required
                onChange={(e) =>
                  setDestinationAccountHolderName(e.target.value)
                }
              />
            </Form.Group>
            <Form.Group controlId="formGridAddress1">
              <Form.Label className="font-weight-bold">Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Amount"
                name="amount"
                value={amount}
                required
                min={0}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>
            <Button
              className="btn btn-warning"
              variant="primary"
              type="submit"
              // onClick={(e) => {
              //   openDetailModel(e);
              //   accountValidation();
              // }}
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
          </Form>
        </Card.Body>
      </Card>
      {detailModalShow ? (
        <DetailModal
          modalShow={detailModalShow}
          handleModalShow={(event: boolean) => setDetailModalShow(event)}
          modalFormSubmitHandle={(event: boolean) => setMpinModalShow(true)}
          fromAccount={fromAccount}
          toAccount={toAccount}
          destinationAccountHolderName={destinationAccountHolderName}
          branch={branch[0].label}
          amount={amount}
          validAccount={validAccount}
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
        />
      ) : (
        ""
      )}
      {isSuccessMessage ? (
        <SuccessModal
          successModalShow={isSuccessMessage}
          handleModalShow={(e) => setIsSucessMessage(e)}
          responseMessage={responseMessage}
        />
      ) : (
        ""
      )}
    </>
  );
};
function e(e: any) {
  throw new Error("Function not implemented.");
}
