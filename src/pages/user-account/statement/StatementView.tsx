import { Loader } from "pages/static/Loader";
import { useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
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
          Opening Balance: Rs: {statementData?.openingBalance}
        </span>
        <span>Closing Balance: Rs: {statementData?.closingBalance}</span>
      </Card.Header>
      <ListGroup variant="flush">
        {currentPageStatement?.map((data, index) => {
          return (
            <ListGroup.Item
              className="d-flex justify-content-between"
              key={index}
            >
              <small>{data.transactionDate}</small>
              <small>{data.remarks}</small>
              <small style={{ color: `${data.credit ? "green" : "red"}` }}>
                {data.credit !== null
                  ? `Credited By: Rs ${data.credit}`
                  : `Debited By: Rs.${data.debit}`}
              </small>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      <Card.Footer>
        <OurPagination paginate={paginate} />
      </Card.Footer>
    </Card>
  );
};

export default StatementView;
