import { Button, Card, Form, Table, Container } from "react-bootstrap";
import { PageTitle } from "components/page-title";


function BillPaymentTransfer() {
    return (
      <>
        <Container className="justify-content-center">
          <PageTitle
            title="Bill Payment Trasfer"
            subTitle="Transfer funds to other account"
          />
          <div className="d-flex flex-wrap mt-1">
            <Card className="m-2" style={{ width: "30rem",height:"25rem" }}>
              <Card.Body>
                <Form>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label className="font-weight-bold">
                      From Account
                    </Form.Label>
                    <Form.Control as="select">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label className="font-weight-bold">
                      Merchant Group
                    </Form.Label>
                    <Form.Control as="select">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label className="font-weight-bold">
                      Pay For
                    </Form.Label>
                    <Form.Control as="select">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>
                  </Form.Group>
                  <Button
                    className="btn btn-warning"
                    variant="primary"
                    type="submit"
                  >
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

            <Card className="m-2" style={{ width: "30rem" }}>
              <Card.Title>Customer Profile Transaction Limits</Card.Title>
              <Card.Body>
                <Table responsive="sm">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Limits</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Maximum Amount Per Transaction</td>
                      <td>2000000</td>
                    </tr>
                    <tr>
                      <td>Maximum Amount Per Day</td>
                      <td>2000001</td>
                    </tr>
                    <tr>
                      <td>Maximum Amount Per Month</td>
                      <td>5000000</td>
                    </tr>
                    <tr>
                      <td>Minimum Amount Per Transaction</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>Maximum Transaction Per Day</td>
                      <td>100</td>
                    </tr>
                    <tr>
                      <td>Today Total Transaction Count</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>Today Total Transaction Amount</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>This Month Total Transaction Amount</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </>
    );
}

export default BillPaymentTransfer
