import { Card } from "react-bootstrap";
import styled from "styled-components/macro";

// card styling goin here
interface cardProps {
  bg?: string;
  padding?: string;
  margin?: string;
  width?: string;
  borderColor?: string;
}
export const CustomCard = styled(Card)<cardProps>`
  width: ${(props) => (props.width ? props.width : "100%")};
  border-color: ${(props) =>
    props.borderColor ? props.borderColor : "transparent"};
  background: ${(props) => (props.bg ? props.bg : "white")};
  padding: ${(props) => (props.padding ? props.padding : "initial")};
  margin: ${(props) => (props.margin ? props.margin : "initial")};
`;

// card header styling form going here
interface cardHeaderProps {
  bg?: string;
  borderColor?: string;
  padding?: string;
  align?: string;
}
export const CardHeader = styled(Card.Header)<cardHeaderProps>`
  background: ${(props) => (props.bg ? props.bg : "white")};

  padding: ${(props) => (props.padding ? props.padding : "0.5rem")};
  border-bottom-color: ${(props) =>
    props.borderColor ? props.borderColor : "transparent"};

  text-align: ${(props) => (props.align ? props.align : "start")};

  text-transform: capitalize;
  font-weight: bold;
`;

// card body styling form going here
interface cardBodyProps {
  bg?: string;
  padding?: string;
}
export const CardBody = styled(Card.Body)<cardBodyProps>`
  background: ${(props) => (props.bg ? props.bg : "white")};
  padding: ${(props) => (props.padding ? props.padding : "0.5rem")};
`;

export const CardFooter = styled(Card.Footer)<cardHeaderProps>`
  background: ${(props) => (props.bg ? props.bg : "white")};

  padding: ${(props) => (props.padding ? props.padding : "0.5rem")};
  border-top-color: ${(props) =>
    props.borderColor ? props.borderColor : "transparent"};

  text-align: ${(props) => (props.align ? props.align : "start")};

  text-transform: capitalize;
  font-weight: bold;
`;