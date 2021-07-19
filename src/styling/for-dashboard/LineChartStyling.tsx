import { Card } from "react-bootstrap";
import styled from "styled-components/macro";

export const ChartCard = styled(Card)`
  .card_body {
    padding: 0.5rem 1rem 1rem;
  }

  .card_footer {
    background: none;
    padding: 1rem;
    text-align: center;
    text-transform: capitalize;

    .balance_style {
      margin: 0;
      font-family: "Times New Roman", Times, serif;
      font-size: 14px;
      font-weight: 500;

      span {
        padding-right: 0.5rem;
        opacity: 1;
        font-size: 18px;
        font-weight: bold;

        &::after {
          content: ":";
          padding: 0 5px;
          font-weight: bolder;
        }
      }
    }
  }
`;
