import { Card, Table } from "react-bootstrap";
import "./index.css";

function FundTranfCharge() {
  
  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>MBank Charge Slab</Card.Title>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>TXN SLAB(NPR)</th>
              <th>FEE (NPR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>100-5000</td>
              <td>5</td>
            </tr>
            <tr>
              <td>5001-50000</td>
              <td>10</td>
            </tr>
            <tr>
              <td>50001-100000</td>
              <td>20</td>
            </tr>
            <tr>
              <td>100001-1000000</td>
              <td>40</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default FundTranfCharge;
