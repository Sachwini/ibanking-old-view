import { Container } from "react-bootstrap";
import styled from "styled-components/macro";

export const StatementContainer = styled(Container)`
  .statement_cardHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    font-weight: normal;
  }

  .header_left {
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;

    .dateContainer {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .date,
      .to {
        font-weight: bold;
        opacity: 0.6;
      }

      .to {
        margin: 0 0.3rem 0 0.1rem;
      }
      .dateWrapper {
        margin: 0.5rem;

        input {
          width: 6rem;
          border: none;
          border-bottom: 2px dashed #427effc7;

          &:focus {
            outline: none;
            /* font-weight: bold; */
            border-bottom: 2px solid #427eff83;
            color: #427eff;
          }
        }
      }
    }

    .showPerPage_Wrapper {
      margin: 0 1rem;
      width: 30%;

      select {
        padding: 0.2rem 0.4rem;
        margin: 0 0.5rem;
      }
    }
  }

  .reght_controlWrapper {
    margin: 0 1rem;

    .sort_by {
      font-size: 17px;
      font-weight: 700;
      text-transform: uppercase;
      font-family: "Times New Roman", Times, serif;
    }

    select {
      padding: 0.2rem 0.4rem;
      margin: 0 0.5rem;
      outline: none;
      border: none;
      border-bottom: 2px solid #427effc7;

      &:focus {
        outline: none;
        border-bottom: 2px dashed #427eff83;
      }
    }
  }
`;

interface userInfoProps {
  bg?: string;
  padding?: string;
  textColor?: string;
}
export const UserInfoContainer = styled.div<userInfoProps>`
  padding: ${(props) => (props.padding ? props.padding : "0.5rem")};
  background: ${(props) => (props.bg ? props.bg : "transparent")};

  .card_heading {
    font-weight: 700;
    font-size: 17px;
    margin: 0;
    color: ${(props) => (props.textColor ? props.textColor : "black")};
    text-decoration: 3px underline;
  }
`;
