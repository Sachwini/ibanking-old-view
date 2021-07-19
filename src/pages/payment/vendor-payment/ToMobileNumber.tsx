import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { getBankAccNo } from "state-provider/globalUserData";
import { CustomForm } from "styling/common/FormStyling";
import { v4 as uuidv4 } from "uuid";

const ToMobileNumber = () => {
  const [validated, setValidated] = useState(false);
  const bankAcclist = useRecoilValue(getBankAccNo);

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

          <Form.Group controlId="destMobile" className="form_group">
            <Form.Label>Destination Mobile Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="destination mobile number..."
              autoComplete="off"
              required
            />
            <Form.Control.Feedback type="invalid">
              destination mobile number is required
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

export default ToMobileNumber;
