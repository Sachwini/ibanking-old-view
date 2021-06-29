import { Image } from "react-bootstrap";
import { FaHeartbeat } from "react-icons/fa";
import { FooterContainer, LogoWrapper } from "styling/layout/FooterStyling";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <FooterContainer fluid>
      <LogoWrapper>
        <Image src="../ibankLogo.png" alt="iBank" className="logo_image" />
      </LogoWrapper>

      <LogoWrapper>
        <Image src="../logo.png" alt="logo" className="logo_image" />
        <p className="power_by">
          &copy; All Rights Reserved @{date}
          <span className="px-1">
            <FaHeartbeat color="red" size={18} />
          </span>
          Hamro Technology PVT.LTD
        </p>
      </LogoWrapper>

      <LogoWrapper>
        <p className="power_by">Powered By:</p>
        <Image
          src="../mBankLogo.png"
          alt="mBank Technology"
          className="logo_image"
        />
      </LogoWrapper>
    </FooterContainer>
  );
};

export default Footer;
