import React, { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { GoSync } from "react-icons/go";
import { FaUpload } from "react-icons/fa";
import { Typeahead } from "react-bootstrap-typeahead";

function VendorPayment() {
  const [bank, setBank] = useState<any>([
    "BankA",
    "BankB",
    "BankC",
    "BankD",
    "BankE",
  ]);
  return (
    <Container>
      {/* <PageTitle
        title="Bulk Payment"
        subTitle="upload your excel file to pay"
      /> */}

      <Card>
        <Card.Body>
          <Card.Title
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <strong>
              Bulk Payment <br />
              <small className="text-mute text-capitalize">
                upload your excel file to pay
              </small>
            </strong>
            <GoSync color="green" />
          </Card.Title>
          <hr />
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#a60812",
              border: "none",
            }}
          >
            <FaUpload style={{ marginRight: "1em" }} /> Upload Excel File
          </Button>
          <div
            className="input-group"
            style={{ marginTop: "1em", marginBottom: "3em" }}
          >
            <div className="input-group-prepend">
              <span className="input-group-text" id="">
                #
              </span>
            </div>
            <input
              style={{ maxWidth: "4em" }}
              type="text"
              className="form-control"
            />
            <div className="input-group-prepend">
              <span className="input-group-text" id="">
                Mobile Number
              </span>
            </div>
            <input type="text" className="form-control" />
            <div className="input-group-prepend">
              <span className="input-group-text" id="">
                Amount
              </span>
            </div>
            <input type="text" className="form-control" />
            <div className="input-group-prepend">
              <span className="input-group-text" id="">
                Remarks
              </span>
            </div>
            <input type="text" className="form-control" />
          </div>
          <Form style={{ width: "50%", minWidth: "10em" }}>
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
              <Form.Label className="font-weight-bold">Enter Pin</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter transaction pin"
              />
            </Form.Group>
            <Button
              className="btn btn-primary btn-lg btn-block"
              variant="primary"
              type="submit"
              style={{ background: "#07078f" }}
            >
              Confirm
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default VendorPayment;
