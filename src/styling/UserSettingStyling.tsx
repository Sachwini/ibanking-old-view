import styled from "styled-components/macro";

export const SettingCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;

  margin-top: 1rem;

  a {
    color: initial;
    text-decoration: none;
  }

  .card__ctrl {
    width: 12rem;
    height: 9rem;
    box-shadow: 0 5px 10px #dfdfdf;
    margin: 10px;
    border: none;
    border-radius: 5px;

    &:hover {
      background-color: #fffefd;
      box-shadow: 0px 10px 20px -10px #28a745;
    }
  }

  .cardBody__ctrl {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .cardText {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }
`;
