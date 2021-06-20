import { Card } from "react-bootstrap";
import styled from "styled-components/macro";

export const UserProfileCardContainer = styled(Card)`
  width: 100% !important;
  display: block;
  margin-bottom: 1rem;

  .card_header {
    background-color: #f9f9f9;
    border: none;
    padding: 0.5rem 1rem;
  }

  .text_heading {
    font-weight: bold;
    color: green;
    padding: 5px 0px;
    margin: 0;
  }

  .user_icon {
    padding: 0.5rem;
    border-radius: 50%;
    border: 4px solid ${(props) => props.theme.primary};
    border-bottom-color: ${(props) => props.theme.secondary};
  }

  .eye_icon {
    cursor: pointer;
    font-size: 24px;
  }

  .base_info {
    padding-top: 0.3rem;
    font-size: 13.5px;
    color: #444444bc;
    width: 100%;

    .text_wrapper {
      margin: 0;
    }

    .text_title {
      font-weight: bold;
      color: black;
      text-transform: capitalize;

      &::after {
        content: ":";
        padding: 0 6px;
      }
    }
  }

  .card_body {
    padding: 0.5rem 1rem 1rem;
    border: none;
  }

  .card_footer {
    padding: 0.6rem;
    border: none;
  }

  .btn_ctrl {
    font-weight: bold;
    background-color: #4444;
  }
`;
