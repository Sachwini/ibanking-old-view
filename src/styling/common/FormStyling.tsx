import { Form } from "react-bootstrap";
import styled from "styled-components/macro";

export const CustomForm = styled(Form)`
  .form_group {
    margin-bottom: 1.7rem;
  }

  label {
    font-weight: bold;
  }

  .button_wrapper {
    float: right;
    margin-right: 1rem;
  }
`;
