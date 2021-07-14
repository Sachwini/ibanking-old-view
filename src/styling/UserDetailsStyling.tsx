import { Container } from "react-bootstrap";
import styled from "styled-components/macro";

export const UserDetailsContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .profile_pic {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 9rem;
    height: 9rem;
    border-radius: 50%;
    border: 4px solid #fff;
    margin-top: 2rem;
  }
  .camera_icon {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  }
  .upload_button {
    background-color: #5b4caf;
    border: none;
    color: white;
    padding: 6px 17px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 25px;

    &:hover {
      transform: scale(1.1);
    }

    &:active {
      transform: translateY(4px);
    }
  }
`;
