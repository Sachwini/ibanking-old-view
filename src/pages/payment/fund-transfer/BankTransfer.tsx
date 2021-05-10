import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { fundTransfer } from "./model";
import { get, post } from "services/AjaxService";
import { getBankBranches } from "services/BankServices";
import { Typeahead } from "react-bootstrap-typeahead";
import { GetAccountNumber } from "helper/CustomerData";
import { BankList } from "models/BankListType";
import { apiResponse } from "models/apiResponse";

export const BankTransfer = () => {
  const accountNumber = GetAccountNumber();

  const [bankList, setBankList] = useState<BankList[]>([]);
  const [DESTBankName, setDESTBankName] = useState<string>("");
  const [fromAccount, setFromAccount] = useState<string>(accountNumber);
  const [toAccount, setToAccount] = useState<string>("");
  const [DESTAccHolderName, setDESTAccHolderName] = useState<string>("");
  const [DESTBranch, setDESTBranch] = useState<string[]>([]);
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
  const selectedBankID = selectedObj?.bankId;

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
      const res = await get<apiResponse<any>>(
        `/api/ips/bank/branch?bank_id=${selectedBankID}`
      );
      if (isSubscribed) {
        if (res.data.details !== null) {
          setDESTBranch(res.data.details);
        }
        setDESTBranch(["No Branch found"]);
      }
    };

    loadBankList();
    loadBankBranch();
    return () => {
      isSubscribed = false;
    };
  }, [DESTBankName]);

  const handleAmount = async (e: any) => {
    setTransferAmount(e.target.value);
  };

  const handleBranchID = (e: any) => {
    try {
      if (e[0].value !== undefined) {
        setBankBranchId(e[0].value);
      } else {
        setBankBranchId("");
        setDESTBranch([]);
      }
    } catch {}
  };

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
      const bankTransfer = await post<apiResponse<any>>("api/ips/transfer", {
        account_number: fromAccount,
        amount: transferAmount,
        charge: `${charge.data.details.toString()}`,
        destination_bank_id: selectedBankID,
        destination_bank_name: DESTBankName,
        destination_branch_id: "175",
        destination_branch_name: "kalanki branch",
        destination_name: DESTAccHolderName,
        destination_account_number: toAccount,
        scheme_id: "1",
        remarks: remarks,
        skipValidation: "true",
      });
      if (bankTransfer) {
        console.log("tansfer response : ", bankTransfer.data);
      }
    }
  };

  // console test
  console.log(selectedBankID);
  console.log("Destination Branch: ", DESTBranch);
  console.log("Transction Charge: ", transctionCharge);

  return (
    <Card>
      <Card.Body>
        <Form>
          <Form.Group controlId="bankTransfer">
            <Form.Label className="font-weight-bold">From Account</Form.Label>
            <Form.Control
              type="number"
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
              type="number"
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
              options={DESTBranch}
              id="1234"
              placeholder="Choose destination branch..."
              onChange={handleBranchID}
            />
          </Form.Group>

          <Form.Group controlId="bankTransfer">
            <Form.Label className="font-weight-bold">Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Amount"
              name="amount"
              value={transferAmount}
              required
              onChange={handleAmount}
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

          {/* <Form.Group controlId="bankTransfer">
            <Form.Label className="font-weight-bold">mPin</Form.Label>
            <Form.Control
              type="text"
              placeholder="mPin"
              name="mpin"
              value={mpin}
              onChange={(e) => setMpin(e.target.value)}
            />
          </Form.Group> */}

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
        </Form>
      </Card.Body>
    </Card>
  );
};
