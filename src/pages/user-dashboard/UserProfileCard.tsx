import SwitchAccountModal from "components/modals/SwitchAccountModal";
import { useState } from "react";
import { Button, Image } from "react-bootstrap";
import { Card, Row, Col } from "react-bootstrap";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineUser,
} from "react-icons/ai";
import { FcSynchronize } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { baseUrl } from "services/BaseUrl";
import { getSelectedAcc, userDetails } from "state-provider/globalUserData";
import { ButtonWrapper } from "styling/common/ButtonStyling";
import { CardBody, CardFooter } from "styling/common/CardStyling";
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
            {userDetail.imageUrl ? (
              <Image
                src={`${baseUrl}/${userDetail.imageUrl}`}
                alt="user image"
                roundedCircle
                className="user_icon userImage"
              />
            ) : (
              <div>
                <AiOutlineUser size={50} className="user_icon" />
              </div>
            )}
          </Col>
          <Col sm={6} md={9} className="pl-0">
            <div className="base_info">
              <p className="text_wrapper">
                <span className="text_title">Account Type</span>
                <span className="">
                  {showDetails
                    ? activeAccontDetails.accountType
                    : "XXX-XXX-XXX"}
                </span>
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

      <CardBody padding="1.5rem 2rem">
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
      </CardBody>

      <CardFooter padding="1.5rem" borderColor="#cececeba" className="myfooter">
        <ButtonWrapper padding="0">
          <Link to="/user-profile">
            <Button variant="light" className="btn_ctrl">
              View Profile
            </Button>
          </Link>
        </ButtonWrapper>

        <ButtonWrapper padding="0">
          <Button
            variant="light"
            onClick={() => setSwitchAccModalShow(true)}
            className="btn_ctrl"
          >
            Switch Account <FcSynchronize size={18} />
          </Button>
        </ButtonWrapper>
      </CardFooter>
    </UserProfileCardContainer>
  );
};

export default ProfileCard;
