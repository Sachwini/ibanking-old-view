import { Button, Card, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useState } from "react";

function BillPaymentTransfer() {
  const [options, setOptions] = useState<any>(["a", "b", "c", "d", "e"]);
  const [merchant, setMerchant] = useState<any>(["m1", "m2", "m3", "m4", "m5"]);
  const [payfor, setPayfor] = useState<any>(["c1", "c2", "p3", "a4", "b5"]);
  return (
    <>
      <Card>
        <Card.Body>
          <Form>
            <Form.Group
              controlId="exampleForm.ControlSelect1"
              inputMode="search"
            >
              <Form.Label className="font-weight-bold">From Account</Form.Label>
              <Typeahead
                options={options}
                placeholder="Choose from account..."
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label className="font-weight-bold">
                Merchant Group
              </Form.Label>
              <Typeahead
                options={merchant}
                placeholder="--SELECT OR SEARCH MERCHANT GROUP--"
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label className="font-weight-bold">Pay For</Form.Label>
              <Typeahead
                options={payfor}
                placeholder="--SELECT OR SEARCH MERCHANT--"
              />
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
}

export default BillPaymentTransfer;
