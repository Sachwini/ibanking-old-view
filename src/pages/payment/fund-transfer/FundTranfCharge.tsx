import { Card, Table } from "react-bootstrap";
import "./index.css";

function FundTranfCharge() {
  return (
    <Card className="mt-3 card_Shadow">
      <Card.Body>
        <Card.Title>MBank Charge Slab</Card.Title>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>TXN SLAB(NPR)</th>
              <th className="right-aligned">FEE (NPR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>100 - 5,000</td>
              <td className="right-aligned">5</td>
            </tr>
            <tr>
              <td>5,001 - 5,0000</td>
              <td className="right-aligned">10</td>
            </tr>
            <tr>
              <td>50,001 - 1,00,000</td>
              <td className="right-aligned">20</td>
            </tr>
            <tr>
              <td>1,00,001 - 10,00,000</td>
              <td className="right-aligned">40</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default FundTranfCharge;
