import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container } from "react-bootstrap";
import { apiResponse } from "models/apiResponse";
import { get } from "services/AjaxService";
import { StatementDataType } from "./model";
import { formatDate, ThreeMonthsBack } from "helper/DateConfig";
import { GetAccountNumber } from "helper/CustomerData";
import StatementView from "./StatementView";

let threeMonthBackDate = ThreeMonthsBack(new Date());

const Statement = () => {
  const [startDate, setStartDate] = useState(new Date(`${threeMonthBackDate}`));
  const [endDate, setEndDate] = useState(new Date());
  const [statementData, setStatementData] = useState<StatementDataType>();

  //Use state for Pagination
  const [loading, setLoading] = useState<boolean>(false);

  // Getting Required Data From Helper
  const AccNumber = GetAccountNumber();
  const formatedStartDate = formatDate(startDate);
  const formatedEndDate = formatDate(endDate);

  useEffect(() => {
    let isSubscribed = true;
    setLoading(true);

    const loadData = async () => {
      const res = await get<apiResponse<StatementDataType>>(
        `api/accountStatement?fromDate=${formatedStartDate}&accountNumber=${AccNumber}&toDate=${formatedEndDate}`
      );
      if (isSubscribed) {
        setStatementData(res.data.details);
        setLoading(false);
      }
    };

    loadData();
    return () => {
      isSubscribed = false;
    };
  }, [formatedStartDate, formatedEndDate, AccNumber]); 

  // // console.log("end date", formatedEndDate);
  // console.log("statementData : ", statementData);

  return (
    <Container>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "10px",
            marginBottom: "10px",
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
        <div>
          <StatementView statementData={statementData} loading={loading} />
        </div>
      </div>
    </Container>
  );
};

export default Statement;
