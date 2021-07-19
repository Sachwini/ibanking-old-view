import { GetBankList } from "helper/fun_BankTransfer";
import {
  getBankListDefaultValue,
  getBankListType,
} from "models/for-pages/bankTransferModels";
import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useRecoilValue } from "recoil";
import { getBankAccNo } from "state-provider/globalUserData";
import { CustomForm } from "styling/common/FormStyling";
import { v4 as uuidv4 } from "uuid";

const ToBankAccount = () => {
  const [validated, setValidated] = useState(false);
  const bankAcclist = useRecoilValue(getBankAccNo);
  const [bankListData, setBankListData] = useState<getBankListType>(
    getBankListDefaultValue
  );

  useEffect(() => {
    let isSubscribed = true;

    const loadBankList = async () => {
      const res = await GetBankList();
      if (res && isSubscribed) {
        setBankListData(res);
      }
    };

    loadBankList();
    return () => {
      isSubscribed = false;
    };
  }, []);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Card className="card_Shadow">
      <Card.Body>
        <CustomForm noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="fromAccount" className="form_group">
            <Form.Label>From Account</Form.Label>
            <Form.Control as="select" required>
              {bankAcclist?.map((Acc) => {
                return (
                  <option value={Acc.accNo} key={uuidv4()}>
                    {Acc.mainCode}
                  </option>
                );
              })}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              account is required
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="destbankname" className="form_group">
            <Form.Label>Select Bank</Form.Label>
            <Typeahead
              options={bankListData.onlyBankNameList}
              placeholder="Select the bank to transfer"
            />
            <Form.Control.Feedback type="invalid">
              destinationbank name is required
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="destAccountNo" className="form_group">
            <Form.Label>Destination Account Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="destination account number..."
              autoComplete="off"
              required
            />
            <Form.Control.Feedback type="invalid">
              destination account number is required
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="invoiceNo" className="form_group">
            <Form.Label>Invoice Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter invoice No..."
              autoComplete="off"
              required
            />
            <Form.Control.Feedback type="invalid">
              invoice number is required
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="amount" className="form_group">
            <Form.Label className="font-weight-bold">Amount</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter amount to send..."
              autoComplete="off"
              required
            />
            <Form.Control.Feedback type="invalid">
              amount is required
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="remarks" className="form_group">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
              type="text"
              placeholder="remarks..."
              autoComplete="off"
              required
            />
            <Form.Control.Feedback type="invalid">
              remarks is required
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Send
          </Button>
        </CustomForm>
      </Card.Body>
    </Card>
  );
};

export default ToBankAccount;
