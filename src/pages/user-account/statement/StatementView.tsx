import { Loader } from "pages/static/Loader";
import { useState } from "react";
import { Card, ListGroup, Table } from "react-bootstrap";
import { getNpDate } from "services/dateService";
import { formatLakh } from "services/numberService";
import { StatementDataType } from "./model";
import OurPagination from "./OurPagination";

const StatementView = (props: {
  statementData?: StatementDataType;
  loading: boolean;
}) => {
  const statementData = props.statementData;
  const loading = props.loading;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [statementPerPage] = useState<number>(10);

  // get current StatementData in Pagination
  const indexOfLastStatement = currentPage * statementPerPage;
  const indexOfFirstStatement = indexOfLastStatement - statementPerPage;
  const currentPageStatement = statementData?.accountStatementDtos.slice(
    indexOfFirstStatement,
    indexOfLastStatement
  );

  // get length of statements data
  // const statemetLength = statementData?.accountStatementDtos.length;

  const paginate = (numbers: number) => {
    setCurrentPage(numbers);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <Card>
      <Card.Header style={{ display: "flex" }}>
        <span className="flex-grow-1">
          Account Number: {statementData?.accountNumber}
        </span>

        <span className="pr-4">
          Opening Balance: Rs: {formatLakh(statementData?.openingBalance || 0)}
        </span>
        <span>Closing Balance: Rs: {formatLakh(statementData?.closingBalance || 0)}</span>
      </Card.Header>
      <Table bordered size="sm">
        <thead>
          <tr>
            <th>Date</th>
            <th>Date AD</th>
            <th>Statement Reference</th>
            <th>Withdraw</th>
            <th>Deposit</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {currentPageStatement?.map(item => <tr>
            <td>{getNpDate(item.transactionDate as any)}</td>
            <td>{item.transactionDate}</td>
            <td>{item.remarks}</td>
            <td style={{textAlign: 'right'}}>{formatLakh(item.debit || 0)}</td>
            <td style={{textAlign: 'right'}}>{formatLakh(item.credit || 0)}</td>
            <td style={{textAlign: 'right'}}>{formatLakh(item.balance || 0)}</td>
          </tr>)}
        </tbody>
      </Table>
      <Card.Footer>
        <OurPagination paginate={paginate} />
      </Card.Footer>
    </Card>
  );
};

export default StatementView;
