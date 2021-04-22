import { Card, Table } from "react-bootstrap";
import "./index.css";

function FundTranfCharge() {
  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>IPS Charge Slab</Card.Title>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>TXN SLAB(NPR)</th>
              <th>FEE (NPR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10-500</td>
              <td>2</td>
            </tr>
            <tr>
              <td>500-5000</td>
              <td>5</td>
            </tr>
            <tr>
              <td>5000-50000</td>
              <td>10</td>
            </tr>
            <tr>
              <td>50000-2000000</td>
              <td>15</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default FundTranfCharge;
