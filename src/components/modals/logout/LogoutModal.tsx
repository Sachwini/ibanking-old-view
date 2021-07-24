import { Button, Image, Modal } from "react-bootstrap";
import {
  Logout_Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "styling/common/ModalStyling";

export interface Props {
  LogoutModalShow: boolean;
  logoutModalSubmitHandle: () => void;
  handleCancle: (e: boolean) => void;
}

const LogoutModal = (props: Props) => {
  const { LogoutModalShow, logoutModalSubmitHandle, handleCancle } = props;
  return (
    <Logout_Modal
      show={LogoutModalShow}
      backdrop="static"
      keyboard={false}
      onHide={() => handleCancle(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalHeader closeButton>
        <div className="image_wrapper">
          <Image src="/images/baner.png" alt="baner" />
        </div>
      </ModalHeader>

      <ModalBody padding="2rem 0 0" align="center">
        <p className="thank"> Thank you for being our family member 🙂</p>
        <small>we are always together to improve quality of service...</small>

        <div className="powered_by">
          <p className="my_quotes">
            Connecting People for easy banking services...
          </p>

          <p className="heading">powered by : </p>
          <div className="info_container">
            <div className="info_wrapper">
              <Image src="images/ibankLogo.png" alt="iBanking" />
              <Image src="images/mBankLogo.png" alt="mBank" />
              {/* <p className="name">iBank Technology</p> */}
            </div>
            {/* 
            <div className="info_wrapper">
              <Image src="images/mBankLogo.png" alt="mBank" />
              <p className="name"> mBank Technology PVT LTD</p>
            </div> */}
          </div>
        </div>
      </ModalBody>

      <ModalFooter padding="0.7rem 1rem 1rem">
        <Button
          className="custom_button"
          variant="outline-primary"
          onClick={logoutModalSubmitHandle}
        >
          Confirm to Logout
        </Button>
      </ModalFooter>
    </Logout_Modal>
  );
};

export default LogoutModal;
