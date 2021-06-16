import {
  LoaderContainer,
  SpinnerContainer,
  Ctrl,
} from "styling/common/SpinnerStyling";

export const Loader = () => {
  return (
    <LoaderContainer>
      <SpinnerContainer>
        <Ctrl />
      </SpinnerContainer>
    </LoaderContainer>
  );
};
