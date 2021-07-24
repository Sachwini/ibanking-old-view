import { StatementDataType } from "models/StatementModels";
import { useState } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { IconStyle } from "styling/common/IconStyling";
import {
  PageNumberContainer,
  PageNumberList,
  PageNumberListContainer,
} from "styling/PaginationStyling";
import { v4 as uuidv4 } from "uuid";

interface Props {
  data: StatementDataType;
}

const DemoPaginate = (props: Props) => {
  const { data } = props;

  // to managing pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // for page number control
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  // it holds total number of pages
  const pages: number[] = [];
  for (
    let i = 1;
    i <= Math.ceil(data.accountStatementDtos.length / itemsPerPage);
    i++
  ) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.accountStatementDtos.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleClick = (event: any) => {
    setCurrentPage(Number(event.target.id));
  };

  const handleNextBtn = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevBtn = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  // managing morepage information button
  const morePageInfoButton = () => {
    if (currentPage < pages.length - 2) {
      return (
        <>
          <PageNumberList active={false}>...</PageNumberList>
          <PageNumberList active={false}>{pages.length - 1}</PageNumberList>
        </>
      );
    } else return null;
  };

  const handleLastBtn = () => {
    setCurrentPage(pages.length);

    setMaxPageNumberLimit(pages.length);
    setMinPageNumberLimit(pages.length - pageNumberLimit);
  };

  const handleFirstBtn = () => {
    setCurrentPage(1);
    setMaxPageNumberLimit(pageNumberLimit);
    setMinPageNumberLimit(0);
  };

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <PageNumberList
          key={number}
          id={number.toString()}
          onClick={handleClick}
          active={currentPage === number ? true : false}
        >
          {number}
        </PageNumberList>
      );
    } else return null;
  });

  return (
    <>
      <ul>
        {currentItems.map((items) => {
          return (
            <li key={uuidv4()}>
              <span>Debit: {items.debit}</span>
              <span className="px-3">Credit: {items.credit}</span>
              <span className="px-3">Remarks: {items.remarks}</span>
              <span>Transction Date: {items.transactionDate}</span>
            </li>
          );
        })}
      </ul>

      <PageNumberContainer align="flex-end">
        <PageNumberListContainer>
          <PageNumberList active={false}>
            <button
              onClick={handleFirstBtn}
              disabled={currentPage === pages[0] ? true : false}
            >
              <AiOutlineDoubleLeft size={20} />
            </button>
          </PageNumberList>

          <PageNumberList active={false}>
            <button
              onClick={handlePrevBtn}
              disabled={currentPage === pages[0] ? true : false}
            >
              Prev
            </button>
          </PageNumberList>

          {renderPageNumbers}
          {morePageInfoButton()}

          <PageNumberList active={false}>
            <button
              onClick={handleNextBtn}
              disabled={currentPage === pages.length ? true : false}
            >
              Next
            </button>
          </PageNumberList>

          <PageNumberList active={false}>
            <button
              onClick={handleLastBtn}
              disabled={currentPage === pages.length ? true : false}
            >
              <AiOutlineDoubleRight size={20} />
            </button>
          </PageNumberList>
        </PageNumberListContainer>
      </PageNumberContainer>
    </>
  );
};

export default DemoPaginate;
