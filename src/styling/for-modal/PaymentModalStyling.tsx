import { Modal } from "react-bootstrap";
import styled from "styled-components/macro";

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

    button {
      font-size: 30px;
      &:hover {
        color: red;
        font-weight: bold;
        transition: color 0.4s;
      }
    }
  }

  .modal_body {
    padding: 1rem 2rem 1rem;
    /* width: ${(props) => (props.width ? props.width : "")}; */
  }

  .modal_footer {
  }
`;

export const MyModal = styled(CustomModal)`
  input {
    height: 2.8rem;
    border-top-right-radius: 0.25rem !important;
    border-bottom-right-radius: 0.25rem !important;
  }
`;

export const MyOTPModal = styled(MyModal)`
  .timer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fafafa;
    padding: 0.5rem 1rem;

    p {
      margin: 0;
      font-size: 13px;
      opacity: 0.8;
      text-transform: capitalize;
    }
  }
`;

export const ImageIconWrapper = styled.div`
  width: 100%;
  text-align: center;
  img {
    height: 120px;
    width: auto;
  }

  .info_heading {
    padding-top: 1rem;
    text-decoration: solid underline green;
    margin: 0;
    font-size: 14.5px;
    font-weight: bold;
    color: black;
    opacity: 0.8;
    text-transform: capitalize;
  }

  .info_text {
    padding-top: 0.25rem;
    text-transform: capitalize;
    font-size: 12px;
    color: black;
    opacity: 0.7;
    font-weight: bold;
  }
`;

export const AccountView = styled.div`
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 1rem;

  .fromAcc_wrapper,
  .toAcc_wrapper {
    margin: 0.25rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .toAcc_wrapper {
    padding-right: 0.25rem;
  }

  .icon_wrapper {
    background-color: #ddddddb3;
    border-radius: 50%;
    padding: 0.5rem;
  }

  .acc {
    padding-left: 1rem;
    .name,
    .acc_no {
      margin: 0;
      font-weight: bold;
    }
    .name {
      opacity: 0.6;
    }
  }
  .indicator {
    color: ${(props) => props.theme.secondary};
  }
`;

export const DetaildView = styled.div`
  color: black;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

  .detail_wrapper {
    display: block;
    padding: 0.5rem 2rem;

    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      padding-right: 0;
    }

    .detail_title,
    .detail_text {
      margin: 0;
    }

    .detail_title {
      font-size: 15px;
      font-weight: bold;
      margin-bottom: 0.1rem;
      opacity: 0.8;
    }

    .detail_text {
      font-size: 12px;
      font-weight: bold;
      opacity: 0.7;
    }
  }
`;

// validation text styling
interface validationProps {
  color: string;
  align?: string;
  padding?: string;
}

export const ValidationInfo = styled.div<validationProps>`
  font-size: 11px;
  font-weight: bold;
  text-transform: capitalize;
  color: ${(props) => props.color};
  text-align: ${(props) => (props.align ? props.align : "start")};
  padding: ${(props) => (props.padding ? props.padding : "2rem 0.5rem 0.5rem")};
`;
