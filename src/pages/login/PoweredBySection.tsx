import React from "react";
import { Image } from "react-bootstrap";
import { LogoWrapper } from "styling/layout/FooterStyling";
import { PoweredBy } from "styling/login/LoginStyling";

const PoweredBySection = () => {
  return (
    <PoweredBy>
      <p className="text_wrapper underline">Powered By</p>
      <LogoWrapper className="pt-3">
        <Image
          src="../ibankLogo.png"
          alt="iBanking System"
          className="logo_image pr-5"
        />
        <Image
          src="../mBankLogo.png"
          alt="iBanking System"
          className="logo_image"
        />

        <p className="power_by bold">
          Hamro Technology PVT.LTD, Kalanki Kathmandu
        </p>
      </LogoWrapper>
    </PoweredBy>
  );
};

export default PoweredBySection;
