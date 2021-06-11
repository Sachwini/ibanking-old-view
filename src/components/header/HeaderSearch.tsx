import { IconStyle, Typeahead_form } from "styling/common/IconStyling";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";

const HeaderSearch = () => {
  const [searchItem, setSearchItem] = useState<string[]>([
    "account-details",
    "user-profile",
    "statement",
    "load-fund",
    "fund-transfer",
    "bulk-payment",
    "bulk-recharge",
    "vendor-payment",
    "broker-payment",
    "quick-payment",
    "cheque-request",
    "service-request",
    "configure-theme",
    "configure-service",
    "add-favorite",
    "logs",
  ]);
  const [item, setItem] = useState<string>("");

  const handleChange = (e: any) => {
    try {
        setItem(e[0]);
        console.log("value",item);
       
    }catch{} 
  }

  const redirectTo = () => {
    window.location.href = `/${item}`;
  }
  return (
    <>
      <Typeahead_form>
        <Typeahead
          options={searchItem}
          id="my-typeahead-id"
          placeholder="Search..."
          onChange={handleChange}
          minLength={2}
          className="inputForm"
        />
      </Typeahead_form>
      <IconStyle
        hover
        style={{ background: "#7bbad8", padding: "4px", borderRadius: "0px" }}
      >
        <BsSearch size={27} className="search__icon" onClick={redirectTo} />
      </IconStyle>
    </>
  );
};

export default HeaderSearch;
