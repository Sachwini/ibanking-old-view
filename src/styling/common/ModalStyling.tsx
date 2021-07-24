import { Modal } from "react-bootstrap";
import styled from "styled-components";

// modal props
interface modalProps {
  width?: string;
}

export const CustomModal = styled(Modal)<modalProps>`
  .modal_header {
    align-items: center;
    justify-content: center;
    padding-bottom: 0.7rem;
    padding-top: 2rem;

    .modal_title {
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      text-transform: uppercase;
      font-size: 18px;
      color: #056d34e8;
      font-weight: bold;
    }
  }

  .modal_body {
    padding: 1rem 2rem 1rem;
  }

  .modal_footer {
  }
`;

// modal header styling going here
interface modalHeaderProps {
  bg?: string;
  padding?: string;
  fs?: string;
  textTransform?: string;
  color?: string;
  align?: string;
}
export const ModalHeader = styled(Modal.Header)<modalHeaderProps>`
  background: ${(props) => (props.bg ? props.bg : "white")};
  padding: ${(props) => (props.padding ? props.padding : "1rem")};

  text-transform: ${(props) =>
    props.textTransform ? props.textTransform : "initial"};
  color: ${(props) => (props.color ? props.color : props.theme.primary)};

  font-weight: 700;
  letter-spacing: 1.2px;
  font-size: ${(props) => (props.fs ? props.fs : "inherit")};
  font-family: "Roboto", sans-serif;

  align-items: ${(props) => (props.align ? props.align : "start")};

  button {
    font-size: 30px;
    transition: all 0.4s;

    &:hover {
      color: red;
    }
  }
`;

// modal body styling going here
interface modalBodyProps {
  padding?: string;
  bg?: string;
}
export const ModalBody = styled(Modal.Body)<modalBodyProps>`
  padding: ${(props) => (props.padding ? props.padding : "1rem")};
  background: ${(props) => (props.bg ? props.bg : "white")};
`;

// modal footer styling going here
interface modalFooterProps {
  padding?: string;
  bg?: string;
  align?: string;
}
export const ModalFooter = styled(Modal.Footer)<modalFooterProps>`
  padding: ${(props) => (props.padding ? props.padding : "1rem")};
  background: ${(props) => (props.bg ? props.bg : "white")};
  align-items: ${(props) => (props.align ? props.align : "initial")};
`;

// success Modal header styling going here
interface successHeaderProps {
  color: string;
}
export const SuccessModalHeader = styled.div<successHeaderProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.color};
  padding: 2rem;

  .icon_wrapper {
    color: white;
    font-weight: bolder;
    margin-right: 2rem;
  }
`;

export const Logout_Modal = styled(Modal)`
  p {
    margin: 0;
  }
  .image_wrapper {
    flex-grow: 1;
    img {
      height: 50px;
      object-fit: cover;
    }
  }

  .thank {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    /* text-align: center; */
    text-transform: capitalize;
  }

  .powered_by {
    margin: 2rem 0 1rem;
    background: #fcfcfc;
    padding: 1rem;

    text-align: center;

    .heading {
      margin: 0;
      font-weight: 700;
      font-size: 14px;
      opacity: 0.6;
      text-transform: capitalize;
      /* border-bottom: 3px solid #dddddd; */
      /* text-decoration: 4px #9e9e9e underline; */
    }

    .info_container {
      /* margin: 1rem 0; */
      display: flex;
      justify-content: space-evenly;

      .info_wrapper {
        padding: 0.5rem;

        .name {
          font-size: 12px;
          font-weight: 700;
          font-style: italic;
          letter-spacing: 1px;
        }

        img {
          height: 30px;
          object-fit: contain;
          margin: 0 1rem;
        }
      }
    }

    .my_quotes {
      margin-bottom: 2rem;
      font-size: 14px;
      text-transform: capitalize;
      font-family: "Great Vibes";
      font-weight: 500;
      letter-spacing: 0.8px;

      &::after {
        content: '"';
        padding-left: 2px;
        font-weight: 900;
        font-size: 20px;
      }

      &::before {
        content: '"';
        padding-right: 2px;
        font-weight: 900;
        font-size: 20px;
      }
    }
  }

  .custom_button {
    width: 100%;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    word-spacing: 5px;
    font-size: 18px;
    font-family: "Times New Roman", Times, serif;
    font-weight: 700;

    transition: all 0.8s;
  }
`;
