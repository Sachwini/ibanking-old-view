import { formatLakh } from "services/numberService";
import { Sdetails } from "models/StatementModels";
import { v4 as uuidv4 } from "uuid";
import { Table } from "react-bootstrap";
import { useState } from "react";

const StatementTable = (props: {
  data: Sdetails[];
  openingBalance: number;
}) => {
  const [calculatedBalance, setCalculatedBalance] = useState(
    props.openingBalance
  );

  const handleBalance = (sdata: Sdetails) => {
    if (sdata.credit) {
      setCalculatedBalance(calculatedBalance - sdata.credit);
    } else if (sdata.debit) {
      setCalculatedBalance(calculatedBalance + sdata.debit);
    }
  };

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Statement Reference</th>
          <th>Debit</th>
          <th>Credit</th>
          <th>Balance</th>
        </tr>
      </thead>

      <tbody>
        {props.data.map((item) => {
          return (
            <tr key={uuidv4()}>
              <td>{item.transactionDate}</td>
              <td>{item.remarks}</td>
              <td style={{ textAlign: "right" }}>
                {formatLakh(item.debit || 0)}
              </td>
              <td style={{ textAlign: "right" }}>
                {formatLakh(item.credit || 0)}
              </td>
              <td style={{ textAlign: "right" }}>
                {formatLakh(item.balance || 0)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default StatementTable;
