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
  }

  .modal_body {
    padding: 1rem 2rem 1rem;
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
  .timer_wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fafafa;
    padding: 0.5rem 1rem;
  }
  .timer_info {
    margin: 0;
    font-size: 13px;
    opacity: 0.8;
    text-transform: capitalize;
  }

  .second_counter {
    text-transform: capitalize;
    font-weight: bold;
    padding: 0 0.5rem;
  }
`;

export const MySuccessModal = styled(CustomModal)`
  .modal_header {
    padding: 0;
    padding-bottom: 0.25rem;
    margin: 0;
    margin-bottom: 0.25rem;
  }
  .message_wrapper {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 40px;
    margin: 0;
    color: white;
    font-weight: bolder;
    text-transform: uppercase;
  }

  .modal_footer {
    display: flex;
    justify-content: space-around;
  }

  .download_wrapper {
    padding: 0.4rem 1rem;
    padding-left: 0.6rem;
    background: #f1f1f1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.4s;

    .icon_wrapper {
      color: #be5e5e;
      margin: 0;
    }
    .download_text {
      margin: 0;
      font-weight: bold;
      text-transform: capitalize;
      padding-left: 0.7rem;
    }

    &:hover {
      background: #e7e7e7;

      .icon_wrapper {
        color: #cc1212;
      }

      .download_text {
        font-weight: bolder;
      }
    }
  }
`;

// success Modal header styling going here
interface successHeaderProps {
  color: string;
}
export const MySuccessModalHeader = styled.div<successHeaderProps>`
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
      text-transform: capitalize;
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

  .detail_heading {
    font-size: 20px;
    font-weight: bold;
    color: #0d022b;
    text-transform: capitalize;
    border-bottom: 2px solid #b9b9b9;
    margin: 0;
    margin-top: 4rem;
    padding-left: 0.5rem;

    &:first-child {
      margin-top: 2rem;
    }
  }

  .detail_wrapper {
    display: block;
    padding: 0.7rem 1rem;

    .detail_title,
    .detail_text {
      margin: 0;
      text-transform: capitalize;
    }

    .detail_title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 0.1rem;
      opacity: 0.8;
    }

    .detail_text {
      font-size: 13px;
      font-weight: bold;
      opacity: 0.7;
      padding-left: 2px;
      color: #222379;
    }
  }
`;

export const SuccessDetailView = styled(DetaildView)`
  display: block;
  text-align: start;
  margin: 0.5rem 0;

  .detail_viewWrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }
`;

// validation text styling
interface validationProps {
  color: string;
  align?: string;
  padding?: string;
}

export const ValidationInfo = styled.div<validationProps>`
  display: block;
  font-size: 13px;
  font-weight: 500;
  text-transform: capitalize;
  color: ${(props) => props.color};
  text-align: ${(props) => (props.align ? props.align : "start")};
  padding: ${(props) => (props.padding ? props.padding : "2rem 0.5rem 0.5rem")};
  letter-spacing: 1px;
`;
