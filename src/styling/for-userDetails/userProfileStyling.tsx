import styled from "styled-components/macro";
import { CustomCard } from "styling/common/CardStyling";

export const Personal_DetailCard = styled(CustomCard)`
  .user_imageContainer {
    padding: 1rem;
    background: transparent;
    border: 1px solid #1a44b8b5;
    outline: 2px dotted #09ad69;
    outline-offset: 5px;
    height: 130px;
    width: 130px;

    img {
      height: 100px;
      object-fit: contain;
    }
  }
`;

// detail info card stylling going here
interface detailInfoCardProps {
  hFontSize?: string;
  hFontLetterSpacing?: string;
  listBg?: string;
  listTextColor?: string;
  padding?: string;
  margin?: string;
  hTextTransform?: string;
  hBorderColor?: string;
  bg?: string;
}
export const DetailedInfoCard = styled.div<detailInfoCardProps>`
  padding: ${(props) => (props.padding ? props.padding : "0.5rem")};
  margin: ${(props) => (props.margin ? props.margin : "0.5rem")};
  background: ${(props) => (props.bg ? props.bg : "transparent")};

  .header {
    text-transform: ${(props) =>
      props.hTextTransform ? props.hTextTransform : "uppercase"};

    font-size: ${(props) => (props.hFontSize ? props.hFontSize : "18px")};

    letter-spacing: ${(props) =>
      props.hFontLetterSpacing ? props.hFontLetterSpacing : "1.4px"};

    border-bottom: 2px solid
      ${(props) => (props.hBorderColor ? props.hBorderColor : "#070569")};

    padding-left: 0.2rem;
    padding-bottom: 0.3rem;
    font-weight: 700;
  }

  .detail_container {
    padding: 1.5rem 0;

    .info_box {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      padding: 0.8rem;
      margin: 0.6rem 0;
      background: ${(props) => (props.listBg ? props.listBg : "white ")};
      border-radius: 5px;
      font-size: 16px;
      color: ${(props) =>
        props.listTextColor ? props.listTextColor : "initial"};

      &:first-child {
        margin-top: 0;
      }

      .info_icon {
        margin-right: 1rem;
        font-weight: 900;
      }

      .info_title {
        font-weight: 700;
        opacity: 0.9;
        text-transform: capitalize;
      }

      .info_text {
        margin-left: 1rem;
        font-weight: 500;
        letter-spacing: 1px;
        font-size: 14px;
      }
    }
  }
`;

export const FlexDetailedInfoCard = styled(DetailedInfoCard)`
  .detail_container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;

    .info_box {
      margin: 0.3rem;

      .info_icon {
        margin-right: 0.3rem;
        font-weight: 900;
      }
    }
  }
`;

export const UserAccount_DetailCard = styled(CustomCard)`
  .acc_count {
    text-transform: capitalize;
    letter-spacing: normal;
    font-weight: 600;
    opacity: 0.8;

    float: right;
    padding-right: 2rem;

    span {
      padding: 0 5px;
      color: #200ccf;
      font-weight: 900;
    }
  }

  .header {
    small {
      font-size: 13px;
    }
  }

  .detail_container {
    padding: 1.5rem 0;
    .info_box {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .info_title {
        font-weight: 600;
      }
      .info_text {
        width: 20%;
      }
    }
  }
`;
