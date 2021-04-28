import { IconStyle } from "styling/comp/IconStyling";
import { HeaderSearchForm } from "styling/header/HeaderStyling";
import { FormControl } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

const HeaderSearch = () => {
  return (
    <HeaderSearchForm inline>
      <FormControl type="text" placeholder="Looking for...?" />
      <IconStyle hover>
        <BsSearch size={27} className="search__icon" />
      </IconStyle>
    </HeaderSearchForm>
  );
};

export default HeaderSearch;
