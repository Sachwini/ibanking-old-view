import { Container } from "react-bootstrap";
import styled from "styled-components/macro";

export const FooterContainer = styled(Container)`
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* margin-left: ; */
`;

export const LogoWrapper = styled.div`
  text-align: center;
  .logo_image {
    height: 30px;
    object-fit: contain;
  }

  .text_wrapper,
  .power_by {
    font-weight: bold;
    margin: 0;
    font-size: 13px;
  }

  .power_by {
    font-weight: normal;
    font-style: italic;
  }
`;
