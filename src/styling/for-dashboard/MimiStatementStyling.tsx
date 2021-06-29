import { Container } from "react-bootstrap";
import styled from "styled-components/macro";

// mini statemment container styling going from here
interface miniContainerProps {
  width?: string;
  padding?: string;
}

export const MiniStatementContainer = styled(Container)<miniContainerProps>`
  padding: ${(props) => (props.padding ? props.padding : "1rem")};
  width: ${(props) => (props.width ? props.width : "100%")};
  border: 1px solid #b1b1b1;
  border-radius: 10px;
  margin-top: 1rem;
`;

// wrapper styling going here
interface wrapperProps {
  color: string;
}
export const MiniStatementWrapper = styled.div<wrapperProps>`
  background: #f7f7f7;
  width: 100%;
  margin: 0.7rem 0;
  padding: 0.5rem 0.8rem;

  border-left: 0.5rem solid ${(props) => props.color};
  border-radius: 3px 10px 10px 3px;

  .date {
    float: right;
    font-weight: bold;
    font-size: 11px;
    margin: 0;
    padding-right: 1rem;
  }

  .desc {
    font-size: 14px;
    opacity: 0.6;
    text-transform: capitalize;
    margin: 0 0 2px 0;
    margin-top: 10px;
  }

  .amount {
    margin: 0;
    font-size: 12px;
    font-weight: bold;
    color: ${(props) => props.color};
  }
`;
