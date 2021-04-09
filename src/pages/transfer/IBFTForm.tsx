import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

export const IBFTForm = () => {
  const [val, setVal] = useState<any>({});

    return (
      <>
    <Card>
      <Card.Body>
        <Form onChange={setVal}>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label className="font-weight-bold">From Account</Form.Label>
            <Form.Control as="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formGridAddress1">
            <Form.Label className="font-weight-bold">
              Destination Account
            </Form.Label>
            <Form.Control type="text" placeholder="destination account" /> 
            <Form.Text className="text-muted">
              <div className="text-warning">
                Please Insure the account number is correct before transaction
              </div>
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formGridAddress1">
            <Form.Label className="font-weight-bold">
              Account Holder's Name
            </Form.Label>
            <Form.Control type="text" placeholder="Account holder Name" />
          </Form.Group>

          <Form.Group controlId="formGridAddress1">
            <Form.Label className="font-weight-bold">Amount</Form.Label>
            <Form.Control type="text" placeholder="Amount" />
          </Form.Group>

          <Form.Group controlId="formGridAddress1">
            <Form.Label className="font-weight-bold">Remark</Form.Label>
            <Form.Control type="text" placeholder="Remark" />
          </Form.Group>

          <Button className="btn btn-warning" variant="primary" type="submit">
            Submit
          </Button>

          <Button
            className="btn btn-light"
            style={{ marginLeft: "20px" }}
            variant="secondary"
            type="submit"
          >
            Reset
          </Button>
        </Form>
      </Card.Body>
      
      </Card>
      </>
  );
};
