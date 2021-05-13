import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { get, post } from "services/AjaxService";
import { Typeahead } from "react-bootstrap-typeahead";
import { GetAccountNumber } from "helper/CustomerData";
import { bankBranchType, BankList } from "models/BankListType";
import { apiResponse } from "models/apiResponse";
import {
  getBankId,
  getBranchId,
  getOnlyBankNameList,
  getOnlyBranchNameList,
} from "helper/BankTransferHelper";
import { Loader } from "pages/static/Loader";
import { toast } from "react-toastify";
import BankTransferModal from "./BankTransferModal";

export interface OTPType {
  otpRequired: boolean;
}

export const BankTransfer = () => {
  const accountNumber = GetAccountNumber();

  const [bankList, setBankList] = useState<BankList[]>([]);
  const [DESTBankName, setDESTBankName] = useState<string>("");
  const [fromAccount, setFromAccount] = useState<string>(accountNumber);
  const [toAccount, setToAccount] = useState<string>("");
  const [DESTAccHolderName, setDESTAccHolderName] = useState<string>("");
  const [DESTBranchList, setDESTBranchList] = useState<bankBranchType[]>([]);
  const [DESTBranchName, setDESTBranchName] = useState<string>("null");
  const [transferAmount, setTransferAmount] = useState<string>("");
  const [transctionCharge, setTransctionCharge] = useState<number>(0);
  const [remarks, setRemarks] = useState<string>("");
  const [handleBranchResponse, setHandleBranchResponse] = useState<string>("");
  const [isOTPRequired, SetIsOTPRequired] = useState<boolean>(false);
  const [otp, setOTP] = useState<string>("");

  const [mpin, setMpin] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [modalShow, setModalShow] = useState<boolean>(false);

  // required field Decleration
  let onlyBankNameList: string[] = [];
  let selectedBankID: string = "";
  let onlyBranchNameList: string[] = [];
  let selectedBankBranchID: string = "";

  // Getting Bank List
  useEffect(() => {
    let isSubscribed = true;

    const loadBankList = async () => {
      const res = await get<apiResponse<BankList[]>>("/api/ips/bank");
      if (isSubscribed) {
        setBankList(res.data.details);
      }
    };
    loadBankList();
    return () => {
      isSubscribed = false;
    };
  }, []);

  // getting Bank List and Selected Bank ID
  if (bankList.length !== 0 && onlyBankNameList.length === 0) {
    onlyBankNameList = getOnlyBankNameList(bankList);
  }
  if (DESTBankName && selectedBankID === "") {
    selectedBankID = getBankId(bankList, DESTBankName);
  }

  // getting Bank Branch List from API
  const loadBankBranch = async () => {
    const res = await get<apiResponse<bankBranchType[]>>(
      `/api/ips/bank/branch?bank_id=${selectedBankID}`
    );
    if (
      res &&
      res.data.message === "Branch not available." &&
      res.data.details === null
    ) {
      selectedBankBranchID = "null";
      setHandleBranchResponse("null");
    } else {
      setDESTBranchList(res.data.details);
    }
  };

  // getting selected Bank Branch List
  if (
    selectedBankID &&
    DESTBranchList !== null &&
    handleBranchResponse !== "null"
  ) {
    loadBankBranch();
  }
  // getting Branch ID & handling Branch ID
  if (DESTBranchList !== null) {
    onlyBranchNameList = getOnlyBranchNameList(DESTBranchList);
  }
  if (DESTBranchName) {
    selectedBankBranchID = getBranchId(DESTBranchList, DESTBranchName);
  }

  const handleSelectBank = (e: string[]) => {
    setDESTBankName(e[0]);
    setHandleBranchResponse("");
  };

  const fundTransferAPI = async (charge: number) => {
    try {
      const data = formDetaTest(charge);

      //Transfer API fetching start from here
      const bankTransfer = await post<apiResponse<any>>(
        "api/ips/transfer",
        data
      );
      if (bankTransfer) {
        toast.success(bankTransfer.data.details);
        console.log("tansfer response : ", bankTransfer.data);
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
        toast.error(error.response.data.details);
      }
    }
  };

  // storing value into the form data
  const formDetaTest = (charge: number) => {
    const formData = new FormData();

    formData.append("account_number", fromAccount);
    formData.append("amount", transferAmount);
    formData.append("charge", `${charge.toString()}`);
    formData.append(
      "destination_bank_id",
      selectedBankID ? selectedBankID : ""
    );
    formData.append("destination_bank_name", DESTBankName);
    formData.append(
      "destination_branch_id",
      selectedBankBranchID ? selectedBankBranchID : ""
    );
    formData.append("destination_branch_name", DESTBranchName);
    formData.append("destination_name", DESTAccHolderName);
    formData.append("destination_account_number", toAccount);
    formData.append("remarks", remarks);
    formData.append("mPin", mpin);
    formData.append("skipValidation", "true");

    if (isOTPRequired) {
      formData.append("otp", otp);
    }
    return formData;
  };

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    // get transction charge
    const charge = await post<apiResponse<number>>(
      `api/ips/scheme/charge?amount=${transferAmount}&destinationBankId=${selectedBankID}`,
      {}
    );
    if (charge) {
      setTransctionCharge(charge.data.details);
    }

    // calling OTP API to check OTP is Required or not
    const otp = await get<apiResponse<OTPType>>(
      `api/otp/request?serviceInfoType=CONNECT_IPS&amount=${transferAmount}`
    );
    if (otp.data.detail.otpRequired) {
      SetIsOTPRequired(otp.data.detail.otpRequired);
      setModalShow(true);
    } else {
      fundTransferAPI(charge.data.details);
    }
    setLoading(false);
  };

  const modalFormSubmitHandle = (e: React.FormEvent) => {
    e.preventDefault();
    fundTransferAPI(transctionCharge);
    console.log("you reached here bro");
  };

  const handleReset = (e: any) => {
    e.preventDefault();
    setToAccount("");
    setTransferAmount("");
    setMpin("");
  };

  return (
    <>
      <BankTransferModal
        modalShow={modalShow}
        handleModalShow={(event: boolean) => setModalShow(event)}
        userOTP={(otp: string) => setOTP(otp)}
        modalFormSubmitHandle={(e) => modalFormSubmitHandle(e)}
      />
      {loading ? (
        <Loader />
      ) : (
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="bankTransfer">
                <Form.Label className="font-weight-bold">
                  From Account
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="from account"
                  name="fromAccount"
                  disabled
                  value={fromAccount}
                  onChange={(e) => setFromAccount(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="bankTransfer">
                <Form.Label className="font-weight-bold">
                  Select Bank
                </Form.Label>
                <Typeahead
                  id="123"
                  options={onlyBankNameList}
                  placeholder="Select Destination Bank... "
                  onChange={handleSelectBank}
                />
              </Form.Group>
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
                  onChange={(e) => setToAccount(e.target.value)}
                />
                <Form.Text className="text-warning">
                  Please Insure the account number is correct before transaction
                </Form.Text>
              </Form.Group>
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
                    onChange={(e) => setDESTBranchName(e[0])}
                  />
                </Form.Group>
              )}

              <Form.Group controlId="bankTransfer">
                <Form.Label className="font-weight-bold">Amount</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Amount"
                  name="amount"
                  value={transferAmount}
                  required
                  onChange={(e) => setTransferAmount(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="bankTransfer">
                <Form.Label className="font-weight-bold">Remarks</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="remarks..."
                  name="remarks"
                  value={remarks}
                  required
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="bankTransfer">
                <Form.Label className="font-weight-bold">mPin</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="mPin"
                  name="mpin"
                  value={mpin}
                  onChange={(e) => setMpin(e.target.value)}
                />
              </Form.Group>

              <Button
                className="btn btn-warning"
                variant="primary"
                type="submit"
                // onClick={handleSubmit}
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
