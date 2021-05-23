import { useState } from "react";
import Pagination from "react-bootstrap/Pagination";

export interface paginate {
  (numbers: number): void;
}

const OurPagination = (props: { paginate: paginate }) => {
  // Props Initializing
  const paginate = props.paginate;

  const [savePageNumber, setSavePageNumber] = useState<number>(0);

  // page number initializing as array
  const pageNumbers: number[] = [];

  for (let i = 1; i <= 10; i++) {
    pageNumbers.push(i);
  }

  // for (let i = 1; i <= Math.ceil(totalPages / postPerPage); i++) {
  //    pageNumbers.push(i);

  // }

  const paginationHandle = (text: string) => {
    if (text === "next") {
      setSavePageNumber(savePageNumber + 1);
    } else if (text === "prev") {
      setSavePageNumber(savePageNumber - 1);
    } else {
      setSavePageNumber(savePageNumber);
    }
    paginate(savePageNumber);
  };

  // console.log(" paginationHandle: ", savePageNumber);

  return (
    <Pagination className="m-0 float-right">
      <Pagination.Prev onClick={() => paginationHandle("prev")}>
        Prev
      </Pagination.Prev>
      {pageNumbers.map((numbers) => {
        return (
          <Pagination.Item
            key={numbers}
            onClick={() => {
              setSavePageNumber(numbers);
              paginate(numbers);
            }}
          >
            {numbers}
          </Pagination.Item>
        );
      })}
      <Pagination.Next onClick={() => paginationHandle("next")}>
        Next
      </Pagination.Next>
    </Pagination>
  );
};

export default OurPagination;
