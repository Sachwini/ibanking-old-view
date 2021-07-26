import { Button, Col, Image, Row } from "react-bootstrap";
import { CardBody } from "styling/common/CardStyling";
import { useRecoilValue } from "recoil";
import { userDetails } from "state-provider/globalUserData";
import { baseUrl } from "services/BaseUrl";
import {
  DetailedInfoCard,
  FlexDetailedInfoCard,
  Personal_DetailCard,
} from "styling/for-userDetails/userProfileStyling";
import { RiMapPin4Line, RiUser3Line, RiUserLocationLine } from "react-icons/ri";
import { IoMailOutline, IoTransgenderOutline } from "react-icons/io5";
import { FiSmartphone } from "react-icons/fi";
import { FaBirthdayCake, FaRegAddressCard } from "react-icons/fa";
import { MdLocationCity } from "react-icons/md";

const PersonalDetailCard = () => {
  const userDetailsData = useRecoilValue(userDetails);

  return (
    <Personal_DetailCard borderColor="#e7e7e7" margin="1rem 0 0">
      <CardBody padding="2rem">
        {/* <div className="user_basicInfoContainer"> */}
        <Row>
          <Col sm={4} md={3} lg={2} className="text-center">
            <div className="user_imageContainer">
              <Image
                src={`${baseUrl}/${userDetailsData.imageUrl}`}
                alt="user image"
              />
            </div>
            <Button variant="outline-success" className="mt-3 text-center">
              Change
            </Button>
          </Col>

          <Col sm={8} md={9} lg={10}>
            <FlexDetailedInfoCard listBg="#fafafa">
              <div className="header">Bank Information</div>

              <div className="detail_container">
                <div className="info_box">
                  <span className="info_icon">
                    <RiUser3Line size={30} />
                  </span>
                  <span className="info_text">{userDetailsData.fullName}</span>
                </div>

                <div className="info_box">
                  <span className="info_icon">
                    <IoTransgenderOutline size={30} />
                  </span>
                  <span className="info_text">{userDetailsData.gender}</span>
                </div>

                <div className="info_box">
                  <span className="info_icon">
                    <FaBirthdayCake size={30} />
                  </span>
                  <span className="info_text">
                    {userDetailsData.dateOfBirth}
                  </span>
                </div>

                <div className="info_box">
                  <span className="info_icon">
                    <FiSmartphone size={30} />
                  </span>
                  <span className="info_text">
                    {userDetailsData.mobileNumber}
                  </span>
                </div>

                <div className="info_box">
                  <span className="info_icon">
                    <IoMailOutline size={30} />
                  </span>
                  <span className="info_text">{userDetailsData.email}</span>
                </div>
              </div>
            </FlexDetailedInfoCard>

            <DetailedInfoCard
              hFontSize="15px"
              hFontLetterSpacing="normal"
              margin="0.5rem 1rem 0"
              hTextTransform="capitalize"
              hBorderColor="#d1d1d1"
              bg="#fafafa"
              padding="2rem 2rem 0.5rem"
            >
              <p className="header header_control ">Address Information</p>

              <div className="detail_container">
                <div className="info_box">
                  <span className="info_icon">
                    <FaRegAddressCard size={24} />
                  </span>
                  <span className="info_title">State :</span>
                  <span className="info_text">{userDetailsData.state}</span>
                </div>

                <div className="info_box">
                  <span className="info_icon">
                    <MdLocationCity size={24} />
                  </span>
                  <span className="info_title">City :</span>
                  <span className="info_text">{userDetailsData.city}</span>
                </div>

                <div className="info_box">
                  <span className="info_icon">
                    <RiUserLocationLine size={24} />
                  </span>
                  <span className="info_title">Address One :</span>
                  <span className="info_text">
                    {userDetailsData.addressOne}
                  </span>
                </div>

                <div className="info_box">
                  <span className="info_icon">
                    <RiMapPin4Line size={24} />
                  </span>
                  <span className="info_title">Address Two :</span>
                  <span className="info_text">
                    {userDetailsData.addressTwo}
                  </span>
                </div>
              </div>
            </DetailedInfoCard>
          </Col>
        </Row>
      </CardBody>
    </Personal_DetailCard>
  );
};

export default PersonalDetailCard;
