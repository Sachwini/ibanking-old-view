import styled from "styled-components/macro";

interface Props {
  hover?: boolean;
  margin_left?: string;
  margin_right?: string;
  color?: string;
  hoverBg?: string;
  hoverColor?: string;
  Opacity?: string;
}

export const Typeahead_form = styled.div`
  .form-control {
    border-radius: 0px;
  }
`;

export const IconStyle = styled.span<Props>`
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  z-index: 5;
  height: calc(1.5em + 0.75rem + 2px);
  /* margin-left: -1rem; */

  color: ${(props) => (props.color ? props.color : props.theme.primary)};

  margin-left: ${(props) => (props.margin_left ? props.margin_left : "")};
  margin-right: ${(props) => (props.margin_right ? props.margin_right : "")};

  &:hover {
    color: ${(props) => (props.hover ? props.theme.secondary : "")};
    opacity: ${(props) => (props.Opacity ? props.Opacity : "")};
  }

  .search__icon {
    &:active {
      color: ${(props) => props.theme.primary};
      font-size: bolder;
      background: #5a5a5a1d;
    }
  }
`;
