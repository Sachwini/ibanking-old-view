import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { fundTransfer } from "./model";
import { post } from "services/AjaxService";
import { getBankBranches } from "services/BankServices";
import { Typeahead } from "react-bootstrap-typeahead";
import { GetAccountNumber } from "helper/CustomerData";

interface selectItem {
  label: string;
  value: string;
}

export const IBFTForm = () => {
  const accountNumber = GetAccountNumber();
  const [fromAccount, setFromAccount] = useState<string>(accountNumber);
  const [toAccount, setToAccount] = useState<string>("");
  const [bankBranchId, setBankBranchId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [mpin, setMpin] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();
  const [branch, setBranch] = useState<selectItem[]>([]);

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
    setFromAccount("");
    setToAccount("");
    setBankBranchId("");
    setAmount("");
    setMpin("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("form data : ", e);

    if (!fromAccount || !toAccount || !bankBranchId || !amount || !mpin) return;
    setLoading(true);
    const model: fundTransfer = {
      from_account_number: fromAccount,
      to_account_number: toAccount,
      bank_branch_id: bankBranchId,
      amount: amount,
      mPin: mpin,
    };
    // console.log("fundTranfer data", model);

    const res = await post<fundTransfer>(
      "api/fundtransfer?from_account_number=" +
        fromAccount +
        "&to_account_number=" +
        toAccount +
        "&bank_branch_id=" +
        bankBranchId +
        "&amount=" +
        amount +
        "&mPin=" +
        mpin,
      {},
      () => setLoading(false)
    );
    if (res) {
      console.log(res.data);
    }
    handleReset(e);
  };

  return (
    <Card>
      <Card.Body>
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
            <Form.Label className="font-weight-bold">
              Destination Account
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="destination account"
              name="toAccount"
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
            />
            <Form.Text className="text-warning">
              Please Insure the account number is correct before transaction
            </Form.Text>
          </Form.Group>

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
