import { useRecoilValue } from "recoil";
import { baseUrl } from "services/BaseUrl";
import { clientCofigData } from "state-provider/globalClientData";
import {
  LoaderContainer,
  SpinnerContainer,
  Ctrl,
} from "styling/common/SpinnerStyling";

export const Loader = () => {
  const clientData = useRecoilValue(clientCofigData);

  return (
    <LoaderContainer>
      <SpinnerContainer logoUrl={`${baseUrl}/${clientData.logoUrl}`}>
        <Ctrl />
      </SpinnerContainer>
    </LoaderContainer>
  );
};
