import { useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { formatLakh } from "services/numberService";
import OurPagination from "./OurPagination";
import { GrDownload } from "react-icons/gr";
import { baseUrl } from "services/BaseUrl";
import { toast } from "react-toastify";
import { Sdetails, StatementDataType } from "models/StatementModels";

interface errorType {
  errorOccured: boolean;
  message: string;
}

const StatementView = (props: {
  statementData?: StatementDataType;
  filteredStatementData?: Sdetails[];
  errorMessage: errorType;
}) => {
  const statementData = props.statementData;
  const errorMessage = props.errorMessage;
  const filteredStatementData = props.filteredStatementData;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [statementPerPage] = useState<number>(10);

  // get current StatementData in Pagination
  const indexOfLastStatement = currentPage * statementPerPage;
  const indexOfFirstStatement = indexOfLastStatement - statementPerPage;
  const defaultPageStatement = statementData?.accountStatementDtos.slice(
    indexOfFirstStatement,
    indexOfLastStatement
  );
  const currentPageStatement = filteredStatementData?.slice(
    indexOfFirstStatement,
    indexOfLastStatement
  );

  // get length of statements data
  const statemetLength = statementData?.accountStatementDtos.length;

  const paginate = (numbers: number) => {
    setCurrentPage(numbers);
  };

  const downloadUrl = statementData?.pdfUrl;
  const handleDownload = async () => {
    console.log("download called");
    try {
      await window.open(`${baseUrl}`.concat(`${downloadUrl}`));
    } catch {
      toast.error("Download not available");
    }
  };

  if (errorMessage?.errorOccured) {
    return (
      <Card>
        <Card.Body className="text-capitalize">
          {errorMessage.message}
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="card_Shadow">
      <Card.Header style={{ display: "flex" }}>
        <span className="flex-grow-1">
          Account Number: {statementData?.accountNumber}
        </span>

        <span className="pr-4">
          Opening Balance: Rs: {formatLakh(statementData?.openingBalance || 0)}
        </span>
        <span>
          Closing Balance: Rs: {formatLakh(statementData?.closingBalance || 0)}
        </span>
      </Card.Header>
      <Table bordered size="sm">
        <thead>
          <tr>
            <th>Date</th>
            <th>Statement Reference</th>
            <th>Withdraw</th>
            <th>Deposit</th>
            <th>Balance</th>
          </tr>
        </thead>
        {!currentPageStatement ? (
          <tbody>
            {defaultPageStatement?.map((item, index) => (
              <tr key={index}>
                <td>{item.transactionDate}</td>
                <td>{item.remarks}</td>
                <td style={{ textAlign: "right" }}>
                  {formatLakh(item?.debit || 0)}
                </td>
                <td style={{ textAlign: "right" }}>
                  {formatLakh(item.credit || 0)}
                </td>
                <td style={{ textAlign: "right" }}>
                  {formatLakh(item.balance || 0)}
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            {currentPageStatement?.map((item, index) => (
              <tr key={index}>
                <td>{item.transactionDate}</td>
                <td>{item.remarks}</td>
                <td style={{ textAlign: "right" }}>
                  {formatLakh(item?.debit || 0)}
                </td>
                <td style={{ textAlign: "right" }}>
                  {formatLakh(item.credit || 0)}
                </td>
                <td style={{ textAlign: "right" }}>
                  {formatLakh(item.balance || 0)}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
      <Card.Footer>
        {statementData ? (
          <Button
            onClick={handleDownload}
            className="m-0 float-left"
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#a60812",
              border: "none",
            }}
          >
            <GrDownload style={{ marginRight: "6px" }} /> Download
          </Button>
        ) : (
          ""
        )}
        <OurPagination paginate={paginate} />
      </Card.Footer>
    </Card>
  );
};

export default StatementView;
