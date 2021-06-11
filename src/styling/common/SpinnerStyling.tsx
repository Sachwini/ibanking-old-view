import styled from "styled-components/macro";

export const LoaderContainer = styled.div`
  width: 100%;
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SpinnerContainer = styled.div`
  height: 50px;
  width: 50px;
  background-image: url("../logo.png");

  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 50%;
`;

export const Ctrl = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 28px;
  margin: -8px;
  border: 0.35rem solid ${(props) => props.theme.secondary};
  border-right-color: ${(props) => props.theme.primary};
  /* border-left-color: ${(props) => props.theme.primary}; */
  border-bottom-color: transparent;

  border-radius: 50%;
  animation: 0.75s test linear infinite;

  @keyframes test {
    to {
      transform: rotate(360deg);
    }
  }
`;
