import styled, { css } from "styled-components";

interface Props {
  hover: boolean;
}

export const IconStyle = styled.span<Props>`
  cursor: pointer;
  color: ${(props) => props.theme.primary};
  font-weight: bold;

  &:hover {
    color: ${(props) => (props.hover ? props.theme.secondary : "")};
  }
`;
