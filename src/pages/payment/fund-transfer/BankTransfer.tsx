import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";
import { get, post } from "services/AjaxService";
import { Typeahead } from "react-bootstrap-typeahead";
import { GetAccountNumber, GetAllAccountNumber } from "helper/CustomerData";
import { apiResponse } from "models/apiResponse";
import { Loader } from "pages/static/Loader";
import { toast } from "react-toastify";
import ConfirmDetailModal from "components/modals/bank-transfer/ConfirmDetailModal";
import MpinModal from "components/modals/bank-transfer/MpinModal";
import OTPModal from "components/modals/bank-transfer/OTPModal";
import SuccessModal from "components/modals/bank-transfer/SuccessModal";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { IconStyle } from "styling/common/IconStyling";
import { RiUserStarLine, RiBankLine } from "react-icons/ri";
import { bankBranchType, BankList } from "./model";

export const BankTransfer = () => {
  const accountNumber = GetAccountNumber();
  const getAllAccountNumber = GetAllAccountNumber();

  // For Bank Handle
  const [DESTBankList, setDESTBankList] = useState<BankList[]>([]);
  const [onlyBankNameList, setOnlyBankNameList] = useState<string[]>([]);
  const [DESTBankName, setDESTBankName] = useState<string>("");
  const [DESTBankID, setDESTBankID] = useState<string>("");

  // For Branch Handle
  const [DESTBranchList, setDESTBranchList] = useState<bankBranchType[]>([]);
  const [onlyBranchNameList, setOnlyBranchNameList] = useState<string[]>([]);
  const [DESTBranchName, setDESTBranchName] = useState<string>("");
  const [DESTBranchID, setDESTBranchID] = useState<string>("");

  // Tracting Form Value
  const [fromAccount, setFromAccount] = useState<string>(accountNumber);
  const [toAccount, setToAccount] = useState<string>("");
  const [DESTAccHolderName, setDESTAccHolderName] = useState<string>("");
  const [transctionAmount, setTransctionAmount] = useState<string>("");
  const [transctionCharge, setTransctionCharge] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [favoriteAcc, setFavoriteAcc] = useState<any[]>([]);

  // For ConformDetails Modal Show
  const [confirmModalShow, setConfirmModalShow] = useState<boolean>(false);

  // For mPin taking And Handle
  const [mpin, setMpin] = useState<string>("");
  const [mPinModalShow, setMpinModalShow] = useState<boolean>(false);

  // For OTP Validation And Handle
  const [OTP, setOTP] = useState<string>("");
  const [OTPModalShow, setOTPModalShow] = useState<boolean>(false);
  const [isOTPRequired, SetIsOTPRequired] = useState<boolean>(false);
  const [OTPResponse, setOTPResponse] = useState({ status: "", message: "" });

  // For SuccessMessage Modal View
  const [successModalShow, setSuccessModalShow] = useState<boolean>(false);
  const [fundTransferResponse, setFundTransferResponse] = useState({
    status: "",
    message: "",
    details: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

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

  // Getting Bank List
  useEffect(() => {
    let isSubscribed = true;

    const loadBankList = async () => {
      const res = await get<apiResponse<BankList[]>>("/api/ips/bank");
      if (isSubscribed) {
        let bankList: string[] = [];
        if (res) {
          setDESTBankList(res.data.details);
          const bankData = res.data.details;
          bankData.forEach((item) => {
            bankList.push(item.bankName);
          });
        }
        setOnlyBankNameList(bankList);
      }
    };

    const loadBankBranch = async () => {
      if (DESTBankID) {
        const res = await get<apiResponse<bankBranchType[]>>(
          `/api/ips/bank/branch?bank_id=${DESTBankID}`
        );
        if (
          isSubscribed &&
          res &&
          res.data.message === "Branch not available." &&
          res.data.details === null
        ) {
          setDESTBranchName("null");
          setDESTBranchID("null");
        } else {
          let branch_list: string[] = [];
          const branchData = res.data.details;
          branchData.forEach((item) => {
            branch_list.push(item.branchName);
          });
          setDESTBranchList(res.data.details);
          setOnlyBranchNameList(branch_list);
        }
      }
      return;
    };

    loadBankBranch();
    loadBankList();
    return () => {
      isSubscribed = false;
    };
  }, [DESTBankID]);

  // Get Selected Bank id While on user Bank Select
  const handleBankSelect = (e: string[]) => {
    setDESTBankName(e[0]);

    // finding Bank id
    const obj = DESTBankList.find(({ bankName }) => bankName === e[0]);
    const id = obj?.bankId;
    if (id) {
      setDESTBankID(id);
    } else {
      setDESTBankID("");
    }
  };

  // Get Selected Branch id While User select Branch
  const handleBranchSelect = (e: string[]) => {
    setDESTBranchName(e[0]);

    // finding Branch id
    const obj = DESTBranchList.find(({ branchName }) => branchName === e[0]);
    const id = obj?.branchId;
    if (id) {
      setDESTBranchID(id);
    } else {
      setDESTBranchID("null");
    }
  };

  // Handle Form Submit
  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    if (
      !DESTBankName ||
      !toAccount ||
      !DESTAccHolderName ||
      !transctionAmount ||
      !remarks
    ) {
      toast.error("Incomplete Field");
      return;
    } else {
      // get transction charge
      const charge = await post<apiResponse<number>>(
        `api/ips/scheme/charge?amount=${transctionAmount}&destinationBankId=${DESTBankID}`,
        {}
      );
      if (charge) {
        setTransctionCharge(charge.data.details.toString());
      }

      // Checking Beneficiary Account Details
      try {
        const isValid = await get<apiResponse<any>>(
          `api/account/validation?destinationAccountNumber=${toAccount}&destinationAccountName=${DESTAccHolderName}&destinationBranchId=${DESTBranchID}&destinationBankId=${DESTBankID}`
        );
        if (
          isValid.data.detail.status === "valid" &&
          isValid.data.detail.matchPercentage === 100
        ) {
          // Calling Conformation Modal Dialogue
          setConfirmModalShow(true);
        } else {
          setLoading(false);
          toast.error(isValid.data.detail.message, {
            autoClose: 12000,
          });
        }
      } catch (error: any) {
        if (error.response) {
          setLoading(false);
          toast.error(error.response.data.detail.message, {
            autoClose: 12000,
          });
        }
        return;
      }
    }
    setLoading(false);
  };

  //-------------Conformation Modal Dialouge Handle---------------------//
  const confirmModelSubmitHandle = () => {
    setConfirmModalShow(!confirmModalShow);
    console.log("i'm clicked");

    // Enabling mPin Modal
    setMpinModalShow(true);
  };

  //-------------Handle Mpin Form Modal---------------------//
  const mPinFormSubmitHandle = (e: React.FormEvent) => {
    e.preventDefault();

    // Enabling Mpin Modal Show
    setMpinModalShow(!mPinModalShow);

    // Validating Is otp is Required
    isOtpRequired();
  };

  ////-------------OTPFormHandle Modal---------------------//
  const OTPFormHandle = (e: React.FormEvent) => {
    e.preventDefault();

    // Enabling OTP Modal Show
    setOTPModalShow(!OTPModalShow);

    //Enabling OTP Require At Transction
    enableOTPTransction();
  };

  // ReSend OTP Handle
  const resendOTPHandle = async () => {
    // calling OTP Validation
    const isRequired = await get<apiResponse<any>>(
      `api/otp/request?serviceInfoType=CONNECT_IPS&amount=${transctionAmount}`
    );
    if (isRequired && isRequired.data.detail.otpRequired === true) {
      const res = await post<apiResponse<any>>(
        `api/changeBankTransferOtpStatus?status=true&otp=${OTP}`,
        {}
      );
      if (res) {
        toast.success(res.data.message);
      }
    }
    return;
  };

  // Validating This Transction is required OTP or Not?
  const isOtpRequired = async () => {
    const res = await get<apiResponse<any>>(
      `api/otp/request?serviceInfoType=CONNECT_IPS&amount=${transctionAmount}`
    );
    if (res && res.data.detail.otpRequired === true) {
      SetIsOTPRequired(true);
      setOTPResponse({ status: "success", message: res.data.message });

      // To Enabling OTP required at Transction
      setOTPModalShow(true);
    } else {
      // Enabling Success Message Modal
      setSuccessModalShow(true);
    }
  };

  // Enabling OTP Required at Transction Time True
  const enableOTPTransction = async () => {
    try {
      const res = await post<apiResponse<any>>(
        `api/changeBankTransferOtpStatus?status=true&otp=${OTP}`,
        {}
      );
      if (res) {
        // Calling Fund Transfer API
        fundTransferAPI();
      }
    } catch (error: any) {
      if (
        error.response.data.status === "FAILURE" &&
        error.response.data.status.message ===
          "OTP Expired Please Request a New One"
      ) {
        resendOTPHandle();
        setOTPResponse({
          status: "failed",
          message:
            "OTP Expire!!! New OTP is send to your Phone. Please Enter New One...",
        });
        setOTPModalShow(true);
      } else if (error.response.data.status === "FAILURE") {
        setOTPResponse({
          status: "failed",
          message: error.response.data.message,
        });
        setOTPModalShow(true);
      }
    }
  };

  // Fund Transfer API
  const fundTransferAPI = async () => {
    setLoading(true);

    const data = formDetaTest();
    try {
      //Transfer API fetching start from here
      const bankTransfer = await post<apiResponse<any>>(
        "api/ips/transfer",
        data
      );
      if (bankTransfer) {
        setFundTransferResponse({
          status: "success",
          message: bankTransfer.data.details,
          details: bankTransfer.data.details,
        });
        console.log("tansfer response : ", bankTransfer.data);
      }
    } catch (error) {
      if (error.response) {
        setFundTransferResponse({
          status: "failed",
          message: error.response.data.message,
          details: error.response.data.details,
        });
        setSuccessModalShow(true);
        console.log(error.response.data.message);
      }
    }
    // calling Fund Transfer Response Modal
    setSuccessModalShow(true);

    setLoading(false);
  };

  // storing value into the form data
  const formDetaTest = () => {
    const formData = new FormData();

    formData.append("account_number", fromAccount);
    formData.append("amount", transctionAmount);
    formData.append("charge", transctionCharge);
    formData.append("destination_bank_id", DESTBankID);
    formData.append("destination_bank_name", DESTBankName);
    formData.append("destination_branch_id", DESTBranchID);
    formData.append("destination_branch_name", DESTBranchName);
    formData.append("destination_name", DESTAccHolderName);
    formData.append("destination_account_number", toAccount);
    formData.append("remarks", remarks);
    formData.append("mPin", mpin);
    formData.append("skipValidation", "true");
    if (isOTPRequired) {
      formData.append("otp", OTP);
    }
    return formData;
  };

  const handleReset = (e: any) => {
    e.preventDefault();
    setToAccount("");
    setTransctionAmount("");
    setMpin("");
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
          <Card.Text
            style={{
              padding: "12px",
              fontWeight: "bold",
              backgroundColor: "#436b33",
              color: "#fff",
              fontSize: "110%",
            }}
          >
            {" "}
            My Saved Bank Account ({favoriteAcc ? favoriteAcc.length : "0"})
          </Card.Text>
        </Card>
        <div
          style={{
            padding: "8px",
            background: "#f5f5f5",
            cursor: "pointer",
          }}
        ></div>
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
                      setDESTAccHolderName(
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
                        <div style={{ marginRight: "20px" }}>
                          <RiBankLine size={30} />
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
      <MpinModal
        userMpin={(mPin: string) => setMpin(mPin)}
        mPinModalShow={mPinModalShow}
        mPinFormSubmitHandle={(e) => mPinFormSubmitHandle(e)}
        cancleButton={(event: boolean) => setMpinModalShow(false)}
      />

      <ConfirmDetailModal
        fromAccount={fromAccount}
        toAccount={toAccount}
        DESTBankName={DESTBankName}
        DESTAccHolderName={DESTAccHolderName}
        DESTBranchName={DESTBranchName}
        transctionAmount={transctionAmount}
        transctionCharge={transctionCharge}
        confirmModalShow={confirmModalShow}
        confirmModalShowHandle={(e) => {
          setConfirmModalShow(e);
          confirmModelSubmitHandle();
        }}
        confirmModalCancleButton={(e) => setConfirmModalShow(e)}
      />

      <OTPModal
        userOTP={(otp) => setOTP(otp)}
        OTPModalShow={OTPModalShow}
        OTPResponse={OTPResponse}
        OTPFormHandle={(e) => OTPFormHandle(e)}
        resendOTPHandle={() => resendOTPHandle()}
        cancleButton={(event: boolean) => setOTPModalShow(false)}
      />

      <SuccessModal
        successModalShow={successModalShow}
        bankTransferResponse={fundTransferResponse}
        successModalShowHandle={(e) => setSuccessModalShow(e)}
        fromAccount={fromAccount}
        toAccount={toAccount}
        DESTBankName={DESTBankName}
        DESTAccHolderName={DESTAccHolderName}
        DESTBranchName={DESTBranchName}
        transctionAmount={transctionAmount}
        transctionCharge={transctionCharge}
        mpin={mpin}
      />
      {loading ? (
        <Loader />
      ) : (
        <Card className="card_Shadow">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
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
              <Form.Group controlId="bankTransfer" aria-required>
                <Form.Label className="font-weight-bold">
                  Select Bank
                </Form.Label>
                <Typeahead
                  id="123"
                  options={onlyBankNameList}
                  placeholder="Select Destination Bank... "
                  onChange={handleBankSelect}
                />
              </Form.Group>
              <div className="form-row">
                <div className="col">
                  <Form.Group controlId="bankTransfer">
                    <Form.Label className="font-weight-bold">
                      Account Number
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="destination bank account number..."
                      name="toAccount"
                      value={toAccount}
                      required
                      autoComplete="off"
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
              <Form.Group controlId="bankTransfer">
                <Form.Label className="font-weight-bold">
                  Account Holder Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Account Holder Name..."
                  name="destAccountHilderName"
                  value={DESTAccHolderName}
                  required
                  autoComplete="off"
                  onChange={(e) => setDESTAccHolderName(e.target.value)}
                />
              </Form.Group>

              {onlyBranchNameList.length === 0 ? (
                ""
              ) : (
                <Form.Group controlId="bankTransfer">
                  <Form.Label className="font-weight-bold">
                    Select Destination Bank Branch
                  </Form.Label>
                  <Typeahead
                    options={onlyBranchNameList}
                    id="1234"
                    placeholder="Choose destination branch..."
                    onChange={handleBranchSelect}
                  />
                </Form.Group>
              )}

              <Form.Group controlId="bankTransfer">
                <Form.Label className="font-weight-bold">Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Amount"
                  name="amount"
                  value={transctionAmount}
                  autoComplete="off"
                  required
                  min={0}
                  onChange={(e) => setTransctionAmount(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="bankTransfer">
                <Form.Label className="font-weight-bold">Remarks</Form.Label>
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
                type="submit"
                onClick={handleReset}
              >
                Reset
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </>
  );
};
