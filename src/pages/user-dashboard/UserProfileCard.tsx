import SwitchAccountModal from "components/modals/SwitchAccountModal";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Card, Row, Col } from "react-bootstrap";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineUser,
} from "react-icons/ai";
import { FcSynchronize } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getSelectedAcc, userDetails } from "state-provider/globalUserData";
import { ButtonWrapper } from "styling/common/ButtonStyling";
import { UserProfileCardContainer } from "styling/for-dashboard/UserProfileCardStyling";

const ProfileCard = () => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [switchAccModalShow, setSwitchAccModalShow] = useState<boolean>(false);
  const userDetail = useRecoilValue(userDetails);
  const activeAccontDetails = useRecoilValue(getSelectedAcc);

  if (switchAccModalShow) {
    return (
      <SwitchAccountModal
        modalShow={switchAccModalShow}
        handleModalShow={(value) => setSwitchAccModalShow(value)}
      />
    );
  }

  return (
    <UserProfileCardContainer className="card_Shadow">
      <Card.Header className="card_header">
        <Row className="w-100 m-0">
          <Col sm={4} md={2} className="d-flex align-items-center w-100 pl-0">
            <div>
              <AiOutlineUser size={50} className="user_icon" />
            </div>
          </Col>
          <Col sm={6} md={9} className="pl-0">
            <div className="base_info">
              <p className="text_wrapper">
                <span className="text_title">Account Type</span>
                {showDetails ? activeAccontDetails.accountType : "XXX-XXX-XXX"}
              </p>
              <p className="text_wrapper">
                <span className="text_title">Balance</span>
                NPR.
                <strong>
                  {showDetails
                    ? activeAccontDetails.availableBalance
                    : "XXX-XXX-XXX"}
                </strong>
              </p>
              <p className="text_wrapper">
                <span className="text_title">Acc No.</span>
                {showDetails ? activeAccontDetails.mainCode : "XXX-XXX-XXX"}
              </p>
            </div>
          </Col>
          <Col sm={2} md={1} className="pl-0 w-100 ">
            <div onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? (
                <AiOutlineEye className="eye_icon" />
              ) : (
                <AiOutlineEyeInvisible className="eye_icon" />
              )}
            </div>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body className="card_body">
        <div className="base_info">
          <p className="text_heading">Short Info</p>
          <p className="text_wrapper">
            <span className="text_title">Name</span>
            {userDetail.fullName}
          </p>

          <p className="text_wrapper">
            <span className="text_title">Phone No.</span>
            {userDetail.mobileNumber}
          </p>
          <p className="text_wrapper">
            <span className="text_title">Email</span>
            {userDetail.email}
          </p>
        </div>
      </Card.Body>
      <Card.Footer className="card_footer">
        <Row className="w-100 m-0">
          <Col sm={6} className="pl-0">
            <ButtonWrapper padding="0">
              <Link to="/user-profile">
                <Button variant="light" className="btn_ctrl">
                  View Profile
                </Button>
              </Link>
            </ButtonWrapper>
          </Col>
          <Col sm={6} className="pr-0 d-flex justify-content-end">
            <ButtonWrapper padding="0">
              <Button
                variant="light"
                onClick={() => setSwitchAccModalShow(true)}
                className="btn_ctrl"
              >
                Switch Account <FcSynchronize size={24} />
              </Button>
            </ButtonWrapper>
          </Col>
        </Row>
      </Card.Footer>
    </UserProfileCardContainer>
  );
};

export default ProfileCard;
