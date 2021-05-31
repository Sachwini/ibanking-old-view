import { Card, Table } from "react-bootstrap";
import { formatLakh } from "services/numberService";
import "./index.css";

export const FundTransferLimit = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Fund Transfer Limits</Card.Title>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>Description</th>
              <th className="right-aligned">Limits</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Maximum Amount Per Transaction</td>
              <td className="right-aligned">{formatLakh(2000000)}</td>
            </tr>
            <tr>
              <td>Maximum Amount Per Day</td>
              <td className="right-aligned">{formatLakh(2000001)}</td>
            </tr>
            <tr>
              <td>Maximum Amount Per Month</td>
              <td className="right-aligned">{formatLakh(5000000)}</td>
            </tr>
            <tr>
              <td>Minimum Amount Per Transaction</td>
              <td className="right-aligned">{formatLakh(10)}</td>
            </tr>
            <tr>
              <td>Maximum Transaction Per Day</td>
              <td className="right-aligned">{formatLakh(100)}</td>
            </tr>
            <tr>
              <td>Today Total Transaction Count</td>
              <td className="right-aligned">0</td>
            </tr>
            <tr>
              <td>Today Total Transaction Amount</td>
              <td className="right-aligned">0</td>
            </tr>
            <tr>
              <td>This Month Total Transaction Amount</td>
              <td className="right-aligned">0</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
