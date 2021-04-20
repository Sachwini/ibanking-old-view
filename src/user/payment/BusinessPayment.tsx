import { Button, Card, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useState } from "react";
import { GoSync } from "react-icons/go";
import "./index.css";

function BusinessPayment() {
  const [bank, setBank] = useState<any>([
    "BankA",
    "BankB",
    "BankC",
    "BankD",
    "BankE",
  ]);
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <>Business Payment</>
            <>
              <GoSync color="green" />
            </>
          </Card.Title>
          <hr />
          <Card.Title style={{ display: "flex", justifyContent: "center" }}>
            <button id="example2">To Mobile Number</button>
            <button id="example1">To Account Number</button>
          </Card.Title>
          <Form>
            <Form.Group
              controlId="exampleForm.ControlSelect1"
              inputMode="search"
            >
              <Form.Label className="font-weight-bold">Select Bank</Form.Label>
              <Typeahead
                options={bank}
                placeholder="Select the bank to transfer"
              />
            </Form.Group>

            <Form.Group controlId="formGridAddress1">
              <Form.Label className="font-weight-bold">Account Name</Form.Label>
              <Form.Control type="text" placeholder="Enter account name" />
            </Form.Group>

            <Form.Group controlId="formGridAddress1">
              <Form.Label className="font-weight-bold">
                Account Number
              </Form.Label>
              <Form.Control type="text" placeholder="Enter account number" />
            </Form.Group>

            <Form.Group controlId="formGridAddress1">
              <Form.Label className="font-weight-bold">
                Invoice Number
              </Form.Label>
              <Form.Control type="text" placeholder="Enter invoice number" />
            </Form.Group>

            <Form.Group controlId="formGridAddress1">
              <Form.Label className="font-weight-bold">Amount</Form.Label>
              <Form.Control type="text" placeholder="Enter amount to send" />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label className="font-weight-bold">
                Select Bank To Debit
              </Form.Label>
              <Typeahead options={bank} placeholder="Select Bank" />
            </Form.Group>

            <Form.Group controlId="formGridAddress1">
              <Form.Label className="font-weight-bold">
                Enter Comments
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Please Enter the description of the transaction"
              />
            </Form.Group>

            <Button
              className="btn btn-primary btn-lg btn-block"
              variant="primary"
              type="submit"
              style={{ background: "#07078f" }}
            >
              Next
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default BusinessPayment;
