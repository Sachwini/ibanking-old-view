import { Sdetails, sDetailsDefaultValue } from "models/StatementModels";
import { useEffect, useState } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import {
  PageNumberContainer,
  PageNumberList,
  PageNumberListContainer,
} from "styling/PaginationStyling";

interface Props {
  rawData: Sdetails[];
  pageNumberLimit: number;
  filteredData: (sortData: Sdetails[]) => void;
  itemsPerPage: number;
}

const Paginate = (props: Props) => {
  const { rawData, pageNumberLimit, filteredData, itemsPerPage } = props;

  // to managing pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<Sdetails[]>([
    sDetailsDefaultValue,
  ]);

  // for page number control
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(pageNumberLimit);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  // it holds total number of pages
  const pages: number[] = [];
  for (let i = 1; i <= Math.ceil(rawData.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  useEffect(() => {
    let isSuscribed = true;

    const slicedData = rawData.slice(indexOfFirstItem, indexOfLastItem);
    if (isSuscribed) {
      setCurrentItems(slicedData);
      filteredData(slicedData);
    }

    return () => {
      isSuscribed = false;
    };
  }, [indexOfLastItem, indexOfFirstItem, rawData]);

  const handleClick = (id: number) => {
    setCurrentPage(id);

    if (id % maxPageNumberLimit === 0 && id !== pages.length) {
      setMaxPageNumberLimit(maxPageNumberLimit + 1);
      setMinPageNumberLimit(minPageNumberLimit + 1);
    }
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
          <PageNumberList active={false}>{pages.length}</PageNumberList>
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
          onClick={() => handleClick(number)}
          active={currentPage === number ? true : false}
        >
          {number}
        </PageNumberList>
      );
    } else return null;
  });

  if (rawData.length <= 1) {
    return null;
  }

  return (
    <PageNumberContainer align="flex-end">
      <PageNumberListContainer>
        <PageNumberList active={false} padding="0">
          <button
            onClick={handleFirstBtn}
            disabled={currentPage === pages[0] ? true : false}
          >
            <AiOutlineDoubleLeft size={20} />
          </button>
        </PageNumberList>

        <PageNumberList active={false} padding="0">
          <button
            onClick={handlePrevBtn}
            disabled={currentPage === pages[0] ? true : false}
          >
            Prev
          </button>
        </PageNumberList>

        {renderPageNumbers}
        {morePageInfoButton()}

        <PageNumberList active={false} padding="0">
          <button
            onClick={handleNextBtn}
            disabled={currentPage === pages.length ? true : false}
          >
            Next
          </button>
        </PageNumberList>

        <PageNumberList active={false} padding="0">
          <button
            onClick={handleLastBtn}
            disabled={currentPage === pages.length ? true : false}
          >
            <AiOutlineDoubleRight size={20} />
          </button>
        </PageNumberList>
      </PageNumberListContainer>
    </PageNumberContainer>
  );
};

export default Paginate;
