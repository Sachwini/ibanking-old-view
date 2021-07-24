import { Image, Toast } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { tosterSetting } from "state-provider/forPageSetting";
import { CusomToster } from "styling/common/TosterStyling";

const Toster = () => {
  const [tosterData, setTosterData] = useRecoilState(tosterSetting);

  const handleClose = () => {
    setTosterData({ ...tosterData, isTost: false });
  };

  return (
    <CusomToster
      onClose={handleClose}
      show={tosterData.isTost}
      delay={3000}
      autohide
      state={tosterData.state}
    >
      <Toast.Header className="toster_header">
        <Image src="images/logo.png" alt="logo" />
        <strong className="brand_name">
          Aarati MultiPurpose Co-operative LTD
        </strong>
      </Toast.Header>
      <Toast.Body className="tost_body">{tosterData.message}</Toast.Body>
    </CusomToster>
  );
};

export default Toster;
