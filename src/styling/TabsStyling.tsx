import { Tabs } from "react-bootstrap";
import styled from "styled-components//macro";

// tabs customization is going here
interface customeTabsProps {
  margin?: string;
  padding?: string;
}
export const CustomTabs = styled(Tabs)<customeTabsProps>`
  margin: ${(props) => (props.margin ? props.margin : "0 0 1rem")};
  padding: ${(props) => (props.padding ? props.padding : "")};

  a {
    font-size: 16.5px;
    text-transform: capitalize;
    font-weight: 550;
  }
`;
