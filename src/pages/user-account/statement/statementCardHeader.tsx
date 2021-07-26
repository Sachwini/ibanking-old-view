import { formatDate, ThreeMonthsBack } from "helper/DateConfig";
import { useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { BsSearch } from "react-icons/bs";

interface Props {
  setItemsPerPage: (item: number) => void;
  setSortBy: (by: string) => void;
  // fStartDate: (date: string) => void;
  // fEndDate: (date: string) => void;
  sortedDataLength: number;
  handleSearchButton: (fStartDate: string, fEndDate: string) => void;
}

let threeMonthBackDate = ThreeMonthsBack(new Date());

const StatementCardHeader = (props: Props) => {
  // initializing props
  const {
    setItemsPerPage,
    setSortBy,
    // fStartDate,
    // fEndDate,
    sortedDataLength,
    handleSearchButton,
  } = props;

  // managing state
  const [startDate, setStartDate] = useState(new Date(`${threeMonthBackDate}`));
  const [endDate, setEndDate] = useState(new Date());

  // const handleStartDate = (date: Date) => {
  //   setStartDate(date);
  //   fStartDate(formatDate(date));
  // };

  // const handleEndDate = (date: Date) => {
  //   setEndDate(date);
  //   fEndDate(formatDate(date));
  // };

  const handleSearchButtonHere = () => {
    handleSearchButton(formatDate(startDate), formatDate(endDate));
  };

  const handleOptions = () => {
    if (sortedDataLength <= 10) {
      return <option value="10">10</option>;
    } else if (sortedDataLength > 10 && sortedDataLength <= 20) {
      return (
        <>
          <option value="10">10</option>
          <option value="20">20</option>
        </>
      );
    } else if (sortedDataLength > 20 && sortedDataLength <= 50) {
      return (
        <>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </>
      );
    } else
      return (
        <>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </>
      );
  };

  return (
    <>
      <div className="header_left">
        <div className="dateContainer">
          <span className="date">From</span>
          <div className="dateWrapper">
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              closeOnScroll
            />
          </div>

          <span className="to">to</span>

          <div className="dateWrapper">
            <DatePicker
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              maxDate={new Date()}
              closeOnScroll
            />
          </div>

          <Button
            variant="outline-success"
            className="btn_ctrl"
            size="sm"
            onClick={handleSearchButtonHere}
          >
            <BsSearch size={18} />
          </Button>
        </div>

        <div className="showPerPage_Wrapper">
          Show
          <select
            name="listItems"
            id="listItems"
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            {handleOptions()}
          </select>
          Per Page
        </div>
      </div>
      <div className="right_controlWrapper">
        <span className="sort_by">sort by:</span>
        <select
          name="listItems"
          id="listItems"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="all">All</option>
          <option value="debit">Debit</option>
          <option value="credit">Credit</option>
        </select>
      </div>
    </>
  );
};

export default StatementCardHeader;
