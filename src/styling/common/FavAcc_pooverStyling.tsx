import { Popover } from "react-bootstrap";
import styled from "styled-components/macro";

export const PooverContainer = styled(Popover)`
  .popover-header {
    background-color: ${(props) => props.theme.secondary};
    font-weight: bold;
    color: white;

    span {
      padding-left: 5px;
      color: black;
    }
  }

  .popover-body {
    height: 250px;
    overflow-y: scroll;
    padding-right: 0;
    padding-left: 0;

    .bank_listConainer {
      display: flex;
      justify-content: flex-start;
      flex-wrap: nowrap;
      padding: 0.5rem;
      line-height: 1.4;
      cursor: pointer;

      &:first-child {
        padding-top: 0;
      }
      &:last-child {
        padding-bottom: 0;
      }

      &:hover {
        background-color: #f1f1f1;
      }

      p,
      strong {
        margin: 0;
        font-size: 12px;
      }
    }
  }
`;
