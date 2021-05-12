import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { get, post } from "services/AjaxService";
import { Typeahead } from "react-bootstrap-typeahead";
import { GetAccountNumber } from "helper/CustomerData";
import { BankList } from "models/BankListType";
import { apiResponse } from "models/apiResponse";

interface bankBranchType {
  id: null | string;
  branchId: string;
  bankId: string;
  refBranchId: null | string;
  branchName: string;
  enabled: null | string;
  lastModifiedOn: null | string;
}

export const BankTransfer = () => {
  const accountNumber = GetAccountNumber();

  const [bankList, setBankList] = useState<BankList[]>([]);
  const [DESTBankName, setDESTBankName] = useState<string>("");
  const [fromAccount, setFromAccount] = useState<string>(accountNumber);
  const [toAccount, setToAccount] = useState<string>("");
  const [DESTAccHolderName, setDESTAccHolderName] = useState<string>("");
  const [DESTBranchList, setDESTBranchList] = useState<bankBranchType[]>([]);
  const [DESTBranchName, setDESTBranchName] = useState<string>("");
  const [bankBranchId, setBankBranchId] = useState<string>("");
  const [transferAmount, setTransferAmount] = useState<string>("");
  const [transctionCharge, setTransctionCharge] = useState<number>(0);
  const [remarks, setRemarks] = useState<string>("");

  const [mpin, setMpin] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();
  const [isRes, setIsRes] = useState<boolean>(false);

  // get Bank NameList for Destination Bank Selection
  let onlyBankName: string[] = [];
  bankList?.map((list) => {
    return onlyBankName.push(list.bankName);
  });

  // getting selected Bank Name's corrosponding id:
  const selectedObj = bankList.find(
    ({ bankName }) => bankName === DESTBankName
  );
  let selectedBankID = selectedObj?.bankId;
  // get bank Crrosponding bank branch
  let onlyBranchName: string[] = [];
  DESTBranchList?.map((list) => {
    return onlyBranchName.push(list.branchName);
  });

  // getting selected Bank Branch Name's corrosponding id:
  const selectedBranchObj = DESTBranchList.find(
    ({ branchName }) => branchName === DESTBranchName
  );
  const selectedBankBranchID = selectedBranchObj?.branchId;
  console.log("selected branch id :", selectedBankBranchID);

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
    console.log("formData : ", formData);

    return formData;
  };

  useEffect(() => {
    let isSubscribed = true;

    // Bank ListLoad
    const loadBankList = async () => {
      const res = await get<apiResponse<BankList[]>>("/api/ips/bank");
      if (isSubscribed) {
        setBankList(res.data.details);
      }
    };

    const loadBankBranch = async () => {
      const res = await get<apiResponse<bankBranchType[]>>(
        `/api/ips/bank/branch?bank_id=${selectedBankID}`
      );
      if (isSubscribed) {
        // setDESTBranchList(res.data.details);
          if (res.data.details !== null) {
            setDESTBranchList(res.data.details);
          }
          // setDESTBranchList(["No Branch found"]); 
      }
    };

    loadBankList();
    loadBankBranch();
    return () => {
      isSubscribed = false;
    };
  }, [DESTBankName]);

  const handleReset = (e: any) => {
    e.preventDefault();
    setToAccount("");
    setBankBranchId("");
    setTransferAmount("");
    setMpin("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // get transction charge
    const charge = await post<apiResponse<number>>(
      `api/ips/scheme/charge?amount=${transferAmount}&destinationBankId=${selectedBankID}`,
      {}
    );
    if (charge) {
      setTransctionCharge(charge.data.details);
      try {
        const data = formDetaTest(charge.data.details);
        const bankTransfer = await post<apiResponse<any>>(
          "api/ips/transfer",
          data
        );
        if (bankTransfer?.statusText) {
          console.log("tansfer response : ", bankTransfer.data);
        }
      } catch (error: any) {
        if (error.response) {
          console.log(error.response.data);
        }
      }
    }
  };

  // console test
  console.log("selected bank id : ", selectedBankID);
  console.log("Transction Charge: ", transctionCharge);

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="bankTransfer">
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
          <Form.Group controlId="bankTransfer">
            <Form.Label className="font-weight-bold">Select Bank</Form.Label>
            <Typeahead
              id="123"
              options={onlyBankName}
              placeholder="Select Destination Bank... "
              onChange={(e) => setDESTBankName(e[0])}
            />
          </Form.Group>
          <Form.Group controlId="bankTransfer">
            <Form.Label className="font-weight-bold">Account Number</Form.Label>
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

          <Form.Group controlId="bankTransfer">
            <Form.Label className="font-weight-bold">
              Select Destination Bank Branch
            </Form.Label>
            <Typeahead
              options={onlyBranchName}
              id="1234"
              placeholder="Choose destination branch..."
              onChange={(e) => setDESTBranchName(e[0])}
            />
          </Form.Group>

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
  );
};
