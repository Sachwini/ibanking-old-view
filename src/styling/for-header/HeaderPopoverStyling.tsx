import { Popover } from "react-bootstrap";
import styled from "styled-components/macro";

interface popoverProps {
  width?: string;
}
export const CustomPopover = styled(Popover)<popoverProps>`
  width: ${(props) => (props.width ? props.width : "max-content")};
  box-shadow: 1px 10px 30px 1px #00000048;

  .popover_header {
    padding: 0.25rem;
  }

  .popover_content {
    padding: 0.5rem;
  }
`;
export const UserPopover = styled(CustomPopover)`
  padding: 5px;
  .userinfo_wrapper {
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fafafa;
    border-bottom: 4px groove #dfdfdf94;
    padding-bottom: 0.6rem;
  }

  .image_container {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: #ebebebcf;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;

    .user_image {
      height: 60px;
      max-width: 60px;
      object-fit: contain;
    }
  }

  .uerInfo {
    padding-left: 1rem;

    .greeting {
      margin: 0;
      font-size: 20px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    .name {
      margin: 0;
      font-weight: 700;
      color: #444;
    }
    .salutation {
      font-weight: 800;
      color: black;
    }
  }

  .popover_content {
    padding: 0;
    padding-top: 1rem;

    .menu_list {
      font-size: 15px;
      font-weight: 500;

      li,
      a {
        padding: 0.25rem 1rem;
        padding-left: 0.7rem;
        cursor: pointer;
        color: #505050;
        text-transform: capitalize;
        transition: all 0.5s;

        &:hover {
          background: #dddd;
          text-decoration: none;
          color: #313131;
        }
      }
    }

    .log_out {
      text-align: center;
      padding: 0.5rem;
      background: #dddd;
      cursor: pointer;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 16px;
      transition: all 0.5s;

      &:hover {
        color: ${(props) => props.theme.primary};
        background: #c5c5c5dd;
      }
    }
  }
`;

export const NotificationPopover = styled(CustomPopover)`
  /* padding: 5px; */
  .popover_header {
    padding: 0.8rem 1rem;
    text-transform: uppercase;
    background: #fafafa;

    .notification_text {
      letter-spacing: 1px;
      font-size: 16px;
      font-weight: 800;
      margin: 0;
    }

    .notification_subHeading {
      margin: 0;
      font-weight: 700;
      color: #444;
      text-transform: capitalize;
      padding-left: 0.5rem;
      font-size: 13px;
    }

    .salutation {
      font-weight: 800;
      color: black;
      padding-right: 4px;
    }

    .notification_count {
      padding-left: 4px;
      color: #124ae6;
      text-transform: capitalize;
    }
  }

  .popover_content {
    padding: 0.7rem 0;
    padding-bottom: 0;

    .menu_list,
    ul {
      font-size: 15px;
      padding-left: 0.5rem;
      font-weight: 600 !important;

      li,
      a {
        padding: 1rem 0;
        padding-left: 1.2rem;
        cursor: pointer;
        color: #505050;
        text-transform: capitalize;

        transition: all 0.5s;

        &:last-child {
          margin-bottom: 0;
        }

        &:hover {
          background: #dadada6e;
          text-decoration: none;
          color: #141414;
        }
      }
    }
  }
`;
