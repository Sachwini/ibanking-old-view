import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PageTitle } from "components/page-title";
import { Card, Container, ListGroup } from "react-bootstrap";
import { apiResponse } from "models/apiResponse";
import { get } from "services/AjaxService";
import { StatementDataType } from "./model";
import { formatDate, ThreeMonthsBack } from "helper/DateConfig";
import { GetAccountNumber } from "helper/CustomerData";

let threeMonthBackDate = ThreeMonthsBack(new Date());

const Statement = () => {
  const [startDate, setStartDate] = useState(new Date(`${threeMonthBackDate}`));
  const [endDate, setEndDate] = useState(new Date());
  const [statementData, setStatementData] = useState<StatementDataType>();

  useEffect(() => {
    let isSubscribed = true;
    // Getting Required Data From Helper
    const AccNumber = GetAccountNumber();
    const formatedStartDate = formatDate(startDate);
    const formatedEndDate = formatDate(endDate);

    const loadData = async () => {
      const res = await get<apiResponse<StatementDataType>>(
        `api/accountStatement?fromDate=${formatedStartDate}&accountNumber=${AccNumber}&toDate=${formatedEndDate}`
      );
      if (isSubscribed) {
        setStatementData(res.data.details);
      }
    };

    loadData();
    return () => {
      isSubscribed = false;
    };
  }, [startDate, endDate]);

  // // console.log("end date", formatedEndDate);
  // console.log("statementData : ", statementData);

  return (
    <Container>
      <PageTitle
        title="Check Your account Statement"
        subTitle="default selected date duration is 3 Months time"
      />
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <p style={{ paddingRight: "2em", margin: "0" }}>
            Select Date Range to View Statement
          </p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                paddingRight: "5px",
                fontWeight: "bold",
                verticalAlign: "middle",
              }}
            >
              From:
            </span>
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              closeOnScroll
              className="statement_datePicker"
            />
            <span
              style={{
                paddingRight: "5px",
                fontWeight: "bold",
                verticalAlign: "middle",
              }}
            >
              To:
            </span>
            <DatePicker
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              maxDate={new Date()}
              closeOnScroll
              className="statement_datePicker"
            />
          </div>
        </div>
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
            {statementData?.accountStatementDtos.map((data, index) => {
              return (
                <ListGroup.Item
                  className="d-flex justify-content-between"
                  key={index}
                >
                  <p>{data.transactionDate}</p>
                  <p>{data.remarks}</p>
                  <p>
                    {data.credit !== null
                      ? `Credited By: Rs ${data.credit}`
                      : `Debited By: Rs.${data.debit}`}
                  </p>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card>
      </div>
    </Container>
  );
};

export default Statement;
