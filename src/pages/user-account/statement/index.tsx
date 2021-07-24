import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container } from "react-bootstrap";
import { apiResponse } from "models/apiResponse";
import { get } from "services/AjaxService";
import { formatDate, ThreeMonthsBack } from "helper/DateConfig";
import StatementView from "./StatementView";
import StaticBar from "components/StaticBar";
import { statementPageTitle } from "static-data/forPageTitle";
import { forStatement } from "static-data/forBreadCrumb";
import { Sdetails, StatementDataType } from "models/StatementModels";
import { useRecoilValue } from "recoil";
import { getSelectedAcc } from "state-provider/globalUserData";
import Demo from "./demo";

let threeMonthBackDate = ThreeMonthsBack(new Date());

const Statement = () => {
  const [startDate, setStartDate] = useState(new Date(`${threeMonthBackDate}`));
  const [endDate, setEndDate] = useState(new Date());
  const [statementData, setStatementData] = useState<StatementDataType>();
  const [filteredStatementData, setFilteredStatementData] =
    useState<Sdetails[]>();
  const [errorMessage, setErrorMessage] = useState({
    errorOccured: true,
    message:
      "Select date range and click on show button to view your statement",
  });
  const [selectOption, setSelectOption] = useState<string>("");
  const selectedAccountDetails = useRecoilValue(getSelectedAcc);
  const [loading, setLoading] = useState<boolean>(false);

  // Getting Required Data From Helper
  const formatedStartDate = formatDate(startDate);
  const formatedEndDate = formatDate(endDate);

  useEffect(() => {
    let isSubscribed = true;
    setLoading(true);

    const handleShow = async () => {
      setLoading(true);
      try {
        const res = await get<apiResponse<StatementDataType>>(
          `api/accountStatement?fromDate=${formatedStartDate}&accountNumber=${selectedAccountDetails.accountNumber}&toDate=${formatedEndDate}&pdf=true`
        );
        if (isSubscribed && res) {
          setStatementData(undefined);
          setStatementData(res.data.details);
          setLoading(false);
          handleFilter(selectOption);
          console.log("selectOption", selectOption);
          setErrorMessage({ errorOccured: false, message: "" });
        }
        if (res.data.details.accountStatementDtos.length === 0) {
          setErrorMessage({
            errorOccured: true,
            message: "No statement Available ... for this selected date range",
          });
        }
      } catch (error: any) {
        setLoading(false);
        setErrorMessage({
          errorOccured: true,
          message: "Something Going Wrong...",
        });
      }
    };
    handleShow();
    return () => {
      isSubscribed = false;
    };
  }, [
    formatedStartDate,
    formatedEndDate,
    selectedAccountDetails.accountNumber,
  ]);

  const handleFilter = (filterby: string) => {
    console.log("filerrBY", filterby);
    let currentPageStatementFilter = statementData?.accountStatementDtos;

    if (filterby === "debit") {
      currentPageStatementFilter = statementData?.accountStatementDtos.filter(
        (row) => row.debit !== null
      );

      console.log("filterby debit", currentPageStatementFilter);
    }
    if (filterby === "credit") {
      currentPageStatementFilter = statementData?.accountStatementDtos.filter(
        (row) => row.credit !== null
      );
      console.log("filterby credit", currentPageStatementFilter);
    }
    if (filterby === "debit/credit" || undefined) {
      currentPageStatementFilter = statementData?.accountStatementDtos;
      console.log("filterby non", currentPageStatementFilter);
    }
    setFilteredStatementData(currentPageStatementFilter);
  };

  return (
    <Container>
      <StaticBar pageTitle={statementPageTitle} breadCrumbData={forStatement} />
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
          {/* <Button
            variant="info"
            onClick={() => {
              handleShow();
            }}
          >
            Show
          </Button> */}

          <span
            style={{
              paddingRight: "5px",
              fontWeight: "bold",
              verticalAlign: "middle",
              marginLeft: "auto",
            }}
          >
            filter by:
          </span>
          <select
            onChange={(e: any) => {
              handleFilter(e.target.value);
              setSelectOption(e.target.value);
            }}
          >
            <option value="debit/credit">debit/credit</option>
            <option value="debit">debit</option>
            <option value="credit">credit</option>
          </select>
        </div>
        <div>
          <StatementView
            statementData={statementData}
            filteredStatementData={filteredStatementData}
            errorMessage={errorMessage}
          />
        </div>
      </div>

      <div className="pt-5">
        <Demo />
      </div>
    </Container>
  );
};

export default Statement;
