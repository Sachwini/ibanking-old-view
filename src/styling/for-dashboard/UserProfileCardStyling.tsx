import { Card } from "react-bootstrap";
import styled from "styled-components/macro";

export const UserProfileCardContainer = styled(Card)`
  width: 100% !important;
  display: block;
  margin-bottom: 1rem;

  .card_header {
    background-color: #64a082;
    border: none;
    padding: 0.5rem 1rem;
    color: white;
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

  .userImage {
    height: 60px;
    object-fit: cover;
    padding: 0.4rem;
    border: 1px dotted #fafafa;
  }
  .eye_icon {
    cursor: pointer;
    font-size: 24px;
  }

  .base_info {
    padding-top: 0.3rem;
    color: #000000;
    width: 100%;

    .text_wrapper {
      margin: 0;
    }

    .text_title {
      font-weight: bold;
      color: #2b2b2b;
      text-transform: capitalize;

      &::after {
        content: ":";
        padding: 0 6px;
      }
    }
  }

  .myfooter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
`;
