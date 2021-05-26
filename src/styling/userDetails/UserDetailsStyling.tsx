import { Container } from "react-bootstrap";
import styled from "styled-components/macro";

export const UserDetailsContainer = styled(Container)`
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
  }
`;
