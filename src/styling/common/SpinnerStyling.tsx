import styled from "styled-components/macro";

export const LoaderContainer = styled.div`
  /* z-index: 1600 !important; */
  min-width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  backface-visibility: visible;
  -webkit-backface-visibility: visible;
`;

export const SpinnerContainer = styled.div`
  height: 50px;
  width: 50px;
  background-image: url("../logo.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  -webkit-backface-visibility: visible;
  backface-visibility: visible;
  border-radius: 50%;
`;

export const Ctrl = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  backface-visibility: visible;
  -webkit-backface-visibility: visible;

  padding: 28px;
  margin: -8px;
  border: 0.35rem solid ${(props) => props.theme.secondary};
  border-right-color: ${(props) => props.theme.primary};
  border-bottom-color: transparent;

  border-radius: 50%;
  animation: 0.75s test linear infinite;

  @keyframes test {
    to {
      transform: rotate(360deg);
    }
  }
`;
