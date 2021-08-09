import { RiBankLine } from "react-icons/ri";
import { useRecoilValue } from "recoil";
import { userDetails } from "state-provider/globalUserData";
import { CardBody, CustomCard } from "styling/common/CardStyling";
import { DetailedInfoCard } from "styling/for-userDetails/userProfileStyling";
import { IoGitBranchOutline } from "react-icons/io5";
import { BsCodeSlash } from "react-icons/bs";

const UserBankDetailCard = () => {
  const userDetailsData = useRecoilValue(userDetails);

  return (
    <CustomCard borderColor="#e7e7e7" margin="1rem 0 0">
      <CardBody padding="2rem" bg="#f0f0f0">
        <DetailedInfoCard>
          <div className="header">Bank Information</div>

          <div className="detail_container">
            <div className="info_box">
              <span className="info_icon">
                <RiBankLine size={24} />
              </span>
              <span className="info_title">Bank Name:</span>
              <span className="info_text">{userDetailsData.bank}</span>
            </div>

            <div className="info_box">
              <span className="info_icon">
                <BsCodeSlash size={24} />
              </span>
              <span className="info_title">Bank Code :</span>
              <span className="info_text">{userDetailsData.bankCode}</span>
            </div>

            <div className="info_box">
              <span className="info_icon">
                <IoGitBranchOutline size={24} />
              </span>
              <span className="info_title">Branch Name:</span>
              <span className="info_text">{userDetailsData.bankBranch}</span>
            </div>

            <div className="info_box">
              <span className="info_icon">
                <BsCodeSlash size={24} />
              </span>
              <span className="info_title">Branch Code :</span>
              <span className="info_text">
                {userDetailsData.bankBranchCode}
              </span>
            </div>
          </div>
        </DetailedInfoCard>
      </CardBody>
    </CustomCard>
  );
};

export default UserBankDetailCard;
