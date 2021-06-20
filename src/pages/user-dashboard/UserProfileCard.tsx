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
import { useStateValue } from "state-provider/StateProvider";
import { MyButton } from "styling/common/ButtonStyling";
import { UserProfileCardContainer } from "styling/for-dashboard/UserProfileCardStyling";

const ProfileCard = () => {
  const [{ customerDetails, switchAccount }] = useStateValue();
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleShowDetails = (title: string) => {
    if (showDetails) {
      return customerDetails?.accountDetail[switchAccount][title];
    }
    return "xxx-xxx-xxx";
  };

  return (
    <UserProfileCardContainer>
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
                {handleShowDetails("accountType")}
              </p>
              <p className="text_wrapper">
                <span className="text_title">Balance</span>
                NPR. <strong>{handleShowDetails("availableBalance")}</strong>
              </p>
              <p className="text_wrapper">
                <span className="text_title">Acc NO.</span>
                {handleShowDetails("accountNumber")}
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
            {customerDetails?.fullName}
          </p>

          <p className="text_wrapper">
            <span className="text_title">Phone No.</span>
            {customerDetails?.mobileNumber}
          </p>
          <p className="text_wrapper">
            <span className="text_title">Email</span>
            {customerDetails?.email}
          </p>
        </div>
      </Card.Body>
      <Card.Footer className="card_footer">
        <Row className="w-100 m-0">
          <Col sm={6} className="pl-0">
            <Link to="/user-profile">
              <Button variant="light">View Profile</Button>
            </Link>
          </Col>
          <Col sm={6} className="pr-0">
            <Button variant="light">
              Switch Account <FcSynchronize size={24} />
            </Button>
          </Col>
        </Row>
      </Card.Footer>
    </UserProfileCardContainer>
  );
};

export default ProfileCard;
