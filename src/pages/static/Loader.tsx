import {
  LoaderContainer,
  SpinnerContainer,
  Ctrl,
} from "styling/common/SpinnerStyling";

export const Loader = () => {
  // const [enable, setEnable] = useState<boolean>(false);

  // setTimeout(() => {
  //   setEnable(!enable);
  // }, 30000);

  // if (enable)
  return (
    <LoaderContainer>
      <SpinnerContainer>
        <Ctrl />
      </SpinnerContainer>
    </LoaderContainer>
  );
};
