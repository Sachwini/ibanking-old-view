import { IconStyle } from "styling/common/IconStyling";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { HeaderSearchContainer } from "styling/header/HeaderStyling";

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
    } catch {}
  };

  const redirectTo = () => {
    window.location.href = `/${item}`;
  };
  return (
    <HeaderSearchContainer>
      <Typeahead
        options={searchItem}
        id="my-typeahead-id"
        placeholder="Search..."
        onChange={handleChange}
        minLength={2}
        className="container"
      />
      <IconStyle hover className="header_search_icon">
        <BsSearch size={20} className="search__icon" onClick={redirectTo} />
      </IconStyle>
    </HeaderSearchContainer>
  );
};

export default HeaderSearch;
