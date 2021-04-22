import React from "react";
import { Form, FormControl } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

const HeaderSearch = () => {
  return (
    <Form inline>
      <FormControl
        type="text"
        placeholder="Search"
        className="mr-sm-2 input__ctrl"
      />
      <BsSearch className="search__icon" size={25} />
    </Form>
  );
};

export default HeaderSearch;
