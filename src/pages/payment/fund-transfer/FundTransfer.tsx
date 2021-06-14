import { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { get, post } from "services/AjaxService";
import { getBankBranches } from "services/BankServices";
import { Typeahead } from "react-bootstrap-typeahead";
import { GetAccountNumber, GetAllAccountNumber } from "helper/CustomerData";
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
import { Loader } from "pages/static/Loader";

interface selectItem {
  label: string;
  value: string;
}

export const FundTransfer = () => {
  const accountNumber = GetAccountNumber();
  const getAllAccountNumber = GetAllAccountNumber();
  const [fromAccount, setFromAccount] = useState<string>(accountNumber);
  const [toAccount, setToAccount] = useState<string>("");
  const [bankBranchId, setBankBranchId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [mpin, setMpin] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [branch, setBranch] = useState<selectItem[]>([]);
  const [mpinModalShow, setMpinModalShow] = useState<boolean>(false);
  const [detailModalShow, setDetailModalShow] = useState<boolean>(false);
  const [destinationAccountHolderName, setDestinationAccountHolderName] =
    useState<string>("");
  const [validAccount, setValidAccount] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [otpRequired, setOtpRequired] = useState<boolean>(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState({
    status: "",
    message: "",
    // details: "",
  });
  const [
    accountValidationResponseMessage,
    setAccountValidationResponseMessage,
  ] = useState({
    message: "",
    matchPercentage: "",
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
        const res = await get<any>(
          "api/account/validation?destinationAccountNumber=" +
            toAccount +
            "&destinationAccountName=" +
            destinationAccountHolderName +
            "&destinationBranchId=" +
            bankBranchId
        );
        setAccountValidationResponseMessage({
          message: res.data.detail.message,
          matchPercentage: res.data.detail.matchPercentage,
        });
        return res && setValidAccount(true);
      }
    } catch (error) {
      setValidAccount(false);
      setAccountValidationResponseMessage({
        message: error.response.data.detail.message,
        matchPercentage: error.response.data.detail.matchPercentage,
      });
    }
  };

  //for request Otp
  const requestOtp = async () => {
    const req = await get<apiResponse<any>>(
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
          setLoading(false);
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
    e.preventDefault();
    if (!fromAccount || !toAccount || !bankBranchId || !amount || !mpin) {
      toast.error("Incomplete field");
      return;
    }

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
      const res = await post<any>(url, "");
      if (res) {
        setIsSuccessMessage(true);
        setResponseMessage({
          status: "success",
          message: res.data.message,
        });
      }
    } catch (error) {
      if (error.response) {
        toast.error("Error");
        setIsSuccessMessage(true);
        setResponseMessage({
          status: "failure",
          message: error.response.data.message,
        });
        console.log("ERROR message", error.response.data.message);
      }
    }
  };

  const handleOtpRequired = (e: any) => {
    // e.preventDefault();
    if (parseFloat(amount) <= 5000) {
      {
        {
          setOtpRequired(false);
          handleSubmit(e);
        }
      }
    } else if (parseFloat(amount) > 5000) {
      setOtpRequired(true);
      requestOtp();
    }
  };

  const changeOtpStatus = async (e: any) => {
    e.preventDefault();
    try {
      const res = await post<any>(
        "api/changeBankTransferOtpStatus?status=true&otp=" + otp,
        {}
      );
      if (res) {
        handleSubmit(e);
      }
    } catch (error) {
      toast.error("catch inside changeOTP", error.response.data.message);
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
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        {/* <Col xs={3}> */}
                        <div style={{ marginRight: "20px" }}>
                          <RiBankLine size={30} />
                          {/* </Col> */}
                        </div>
                        <div>
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
                        </div>
                      </div>
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
      {loading ? (
        <Loader />
      ) : (
        <Card className="card_Shadow">
          <Card.Body>
            <Form
              onSubmit={(e) => {
                openDetailModel(e);
                accountValidation();
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
                    : "selected none (please select one... )"}
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
                  autoComplete="off"
                  min={0}
                  onChange={(e) => setAmount(e.target.value)}
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
      )}
      <DetailModal
        modalShow={detailModalShow}
        handleModalShow={(event: boolean) => setDetailModalShow(event)}
        modalFormSubmitHandle={(event: boolean) => setMpinModalShow(true)}
        fromAccount={fromAccount}
        toAccount={toAccount}
        destinationAccountHolderName={destinationAccountHolderName}
        branch={branch[0]?.label}
        amount={amount}
        validAccount={validAccount}
        accountValidationResponseMessage={accountValidationResponseMessage}
        confirmModalCancleButton={(event: boolean) => setDetailModalShow(false)}
      />
      <MpinModal
        modalShow={mpinModalShow}
        handleModalShow={(event: boolean) => setMpinModalShow(event)}
        mpin={(mpin: string) => setMpin(mpin)}
        modalFormSubmitHandle={handleOtpRequired}
        cancleButton={(event: boolean) => setMpinModalShow(false)}
      />
      <OtpModal
        modalShow={otpRequired}
        handleModalShow={(event: boolean) => setOtpRequired(event)}
        userOTP={(otp: string) => setOtp(otp)}
        modalFormSubmitHandle={changeOtpStatus}
        resendOtp={() => requestOtp()}
        cancleButton={(event: boolean) => setOtpRequired(false)}
      />
      <SuccessModal
        successModalShow={isSuccessMessage}
        handleModalShow={(e) => setIsSuccessMessage(e)}
        fromAccount={fromAccount}
        branch={branch[0]?.label}
        toAccount={toAccount}
        destinationAccountHolderName={destinationAccountHolderName}
        amount={amount}
        responseMessage={responseMessage}
        mpin={mpin}
      />
    </>
  );
};
