import { GetAccountNumber } from "helper/CustomerData";
import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { post } from "services/AjaxService";
import { getBankList } from "services/BankServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface selectItem {
  label: string;
  value: string;
}

export interface serviceChargeItem {
  amount: any;
  destinationBankId: any;
  details: any;
}

export const BankTransfer = () => {
  const accountNumber = GetAccountNumber();
  const [fromAccount, setFromAccount] = useState<string>(accountNumber);
  const [bank, setBank] = useState<selectItem[]>([]);
  const [bankId, setBankId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [charge, setCharge] = useState<any>(0);
  const [remark, setRemark] = useState<string>("");
  const [mpin, setMpin] = useState<string>("");
  const [destinationAccountHolderName, setDestinationAccountHolderName] =
    useState<string>("");
  const [destinationAccount, setDestinationAccount] = useState<string>("");

  const getServiceCharge = async () => {
    if (amount !== "" && bankId !== "") {
      const res = await post<serviceChargeItem>(
        "/api/ips/scheme/charge?amount=" +
          amount +
          "&destinationBankId=" +
          bankId,
        {}
      );
      console.log("Amount", amount, "BankId", bankId);
      return res && setCharge(res.data.details);
    }
    return;
  };

  useEffect(() => {
    let isSubscribed = true;
    const init = async () => {
      const bank = await getBankList();
      if (isSubscribed) {
        const bankData: selectItem[] = [];
        if (bank) {
          bank.forEach((x: any) =>
            bankData.push({ label: x.bankName, value: x.bankId.toString() })
          );
          setBank(bankData);
        }
      }
    };
    init();
    getServiceCharge();
    return () => {
      isSubscribed = false;
    };
  }, [amount, bankId, charge]);

  const handleBankId = (e: any) => {
    try {
      if (e[0].value !== undefined) {
        setBankId(e[0].value);
      } else {
        setBankId("");
        setBank([]);
      }
    } catch {}
  };

  const handleReset = (e: any) => {
    e.preventDefault();
    setAmount("");
    setBank([]);
    setBankId("");
    setCharge(0);
    setDestinationAccount("");
    setDestinationAccountHolderName("");
    setRemark("");
    setMpin("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      !fromAccount ||
      !amount ||
      !bank ||
      !mpin ||
      !destinationAccountHolderName ||
      !destinationAccount
    ) {
      toast.error("Incomplete field");
      return;
    }
    const formData = new FormData();

    formData.append("account_number", fromAccount);
    formData.append("amount", amount);
    formData.append("charge", charge);
    formData.append("destination_bank_id", bankId);
    formData.append("destination_bank_name", bank[0].label);
    formData.append("destination_name", destinationAccountHolderName);
    formData.append("destination_account_number", destinationAccount);
    formData.append("remarks", remark);
    formData.append("mPin", mpin);
    formData.append("skipValidation", "true");

    console.log("formData", formData.getAll); 

    try {
      const res = await post<any>("/api/ips/transfer", formData);
      if (res) {
        toast.success(res.data.details);
        console.log(res.data);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Form>
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
                id="my-typeahead-id"
                options={bank}
                placeholder="Select Destination Bank... "
                onChange={handleBankId}
              />
              <Form.Text className="text-warning">
                {bankId
                  ? `Bank Id: ${bankId}`
                  : "Selected None (Please Select One ...)"}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="bankTransfer">
              <Form.Label className="font-weight-bold">
                Account Number
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="destination bank account number..."
                name="destinationAccount"
                value={destinationAccount}
                required
                onChange={(e) => setDestinationAccount(e.target.value)}
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
                value={destinationAccountHolderName}
                required
                onChange={(e) =>
                  setDestinationAccountHolderName(e.target.value)
                }
              />
            </Form.Group>

            <Form.Group controlId="bankTransfer">
              <Form.Label className="font-weight-bold">Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Amount"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Form.Text className="text-warning">Charge: {charge}</Form.Text>
            </Form.Group>

            <Form.Group controlId="bankTransfer">
              <Form.Label className="font-weight-bold">Remarks</Form.Label>
              <Form.Control
                type="text"
                placeholder="remark..."
                name="remark"
                value={remark}
                required
                onChange={(e) => setRemark(e.target.value)}
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
              onClick={handleSubmit}
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
            <ToastContainer autoClose={5000} position="top-center" />
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
