import { Container } from "react-bootstrap";
import styled from "styled-components/macro";

export const FavAccContainer = styled(Container)`
  .card_title {
    text-transform: uppercase;
    color: green;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: 1px;
    word-spacing: 2px;
  }

  .card_subtitle {
    font-size: 13px;
    font-weight: 600;
    opacity: 0.6;
  }

  .submit_buttonWrapper {
    float: right;
    margin: 2rem 0.5rem 0.7rem 0;

    button {
      text-transform: uppercase;
      font-weight: bold;
    }
  }

  .title_color {
    color: #0084ffcf;
    /* margin-bottom: 0; */
  }

  .my_cardBody {
    height: 370px;
    overflow-y: scroll;
  }
`;

export const FavAccListWrapper = styled.div`
  display: flex;
  justify-content: start;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin: 0.9rem 0;

  background: #f7f7f7;
  border-radius: 5px;
  transition: all 0.4s;

  &:first-child {
    margin-top: 0;
  }

  .accInfo_wrapper {
    padding-left: 2rem;
    text-transform: capitalize;
    font-weight: bold;
    flex-grow: 1;

    p {
      margin: 0;
    }

    .heading {
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      word-spacing: 3px;
      margin-bottom: 5px;
      font-size: 14px;
    }

    .normal {
      margin: 0;
      font-size: 12px;
      opacity: 0.6;
      transition: all 0.4s;
    }

    .date {
      font-size: 12px;
      opacity: 0.5;
      float: right;
      margin-right: 0.5rem;
      transition: all 0.4s;

      span {
        font-weight: 800;
        padding-right: 5px;
        color: #a30743;
        opacity: 1.1;
      }
    }
  }

  &:hover {
    background: #0044ff16;
    border-radius: 7px;

    .normal {
      opacity: 0.7;
    }

    .date {
      opacity: 0.7;

      span {
        color: #a30714;
      }
    }
  }
`;
