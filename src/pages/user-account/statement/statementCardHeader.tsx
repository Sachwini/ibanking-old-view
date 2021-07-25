import { formatDate, ThreeMonthsBack } from "helper/DateConfig";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

interface Props {
  setItemsPerPage: (item: number) => void;
  setSortBy: (by: string) => void;
  fStartDate: (date: string) => void;
  fEndDate: (date: string) => void;
  sortedDataLength: number;
}

let threeMonthBackDate = ThreeMonthsBack(new Date());

const StatementCardHeader = (props: Props) => {
  // initializing props
  const { setItemsPerPage, setSortBy, fStartDate, fEndDate, sortedDataLength } =
    props;

  // managing state
  const [startDate, setStartDate] = useState(new Date(`${threeMonthBackDate}`));
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDate = (date: Date) => {
    setStartDate(date);
    fStartDate(formatDate(date));
  };

  const handleEndDate = (date: Date) => {
    setEndDate(date);
    fEndDate(formatDate(date));
  };

  return (
    <>
      <div className="header_left">
        <div className="dateContainer">
          <span className="date">Date :</span>
          <div className="dateWrapper">
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => handleStartDate(date)}
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
              onChange={(date: Date) => handleEndDate(date)}
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
            className="px-3 py-0.8 text-uppercase "
            size="sm"
          >
            find
          </Button>
        </div>

        <div className="showPerPage_Wrapper">
          Show
          <select
            name="listItems"
            id="listItems"
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value="10" disabled={sortedDataLength < 10 ? true : false}>
              10
            </option>
            <option value="20" disabled={sortedDataLength < 20 ? true : false}>
              20
            </option>
            <option value="50" disabled={sortedDataLength < 50 ? true : false}>
              50
            </option>
            <option
              value="100"
              disabled={sortedDataLength < 100 ? true : false}
            >
              100
            </option>
          </select>
          Per Page
        </div>
      </div>
      <div className="reght_controlWrapper">
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
