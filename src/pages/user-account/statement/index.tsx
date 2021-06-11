import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Container } from "react-bootstrap";
import { apiResponse } from "models/apiResponse";
import { get } from "services/AjaxService";
import { StatementDataType } from "./model";
import { formatDate, ThreeMonthsBack } from "helper/DateConfig";
import {
  GetAllAccountNumber,
} from "helper/CustomerData";
import StatementView from "./StatementView";
import { useStateValue } from "state-provider/StateProvider";

let threeMonthBackDate = ThreeMonthsBack(new Date());

const Statement = () => {
  const [startDate, setStartDate] = useState(new Date(`${threeMonthBackDate}`));
  const [endDate, setEndDate] = useState(new Date());
  const [statementData, setStatementData] = useState<StatementDataType>();
  const [{ switchAccount }] = useStateValue();

  //Use state for Pagination
  const [loading, setLoading] = useState<boolean>(false);

  // Getting Required Data From Helper
  const accountNumber = GetAllAccountNumber();
  const formatedStartDate = formatDate(startDate);
  const formatedEndDate = formatDate(endDate);

  let actualAccountNumber = "";
  switch (switchAccount) {
    case switchAccount:
      actualAccountNumber = accountNumber[switchAccount];
      break;
  }

  const handleShow = async () => {
    setLoading(true);
    const res = await get<apiResponse<StatementDataType>>(
      `api/accountStatement?fromDate=${formatedStartDate}&accountNumber=${actualAccountNumber}&toDate=${formatedEndDate}&pdf=true`
    );
    setStatementData(undefined);
    setStatementData(res.data.details);
    setLoading(false);
  };

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
          <Button variant="info" onClick={handleShow}>
            Show
          </Button>
        </div>
        <div>
          <StatementView statementData={statementData} loading={loading} />
        </div>
      </div>
    </Container>
  );
};

export default Statement;
