import { Form } from "react-bootstrap";
import { AiOutlineMobile } from "react-icons/ai";
import { BsCodeSlash, BsPencilSquare } from "react-icons/bs";
import { FiDatabase, FiUser } from "react-icons/fi";
import { GiTakeMyMoney, GiWallet } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { IoGitBranchOutline, IoWalletOutline } from "react-icons/io5";
import { MdMergeType } from "react-icons/md";
import {
  RiBankFill,
  RiMailCheckLine,
  RiMiniProgramLine,
  RiMoneyCnyBoxLine,
  RiUser3Line,
} from "react-icons/ri";
import { useRecoilValue } from "recoil";
import { userDetails } from "state-provider/globalUserData";
import { CardBody } from "styling/common/CardStyling";
import {
  DetailedInfoCard,
  UserAccount_DetailCard,
} from "styling/for-userDetails/userProfileStyling";

const UserAccountDetailCard = () => {
  const userDetailsData = useRecoilValue(userDetails);

  const handleAccountCount = () => {
    if (userDetailsData.accountDetail.length > 0) {
      return (
        <small className="acc_count">
          you Have total <span>{userDetailsData.accountDetail.length}</span>
          Accounts
        </small>
      );
    } else
      return (
        <small className="acc_count">
          you Have total <span>{userDetailsData.accountDetail.length}</span>
          Account
        </small>
      );
  };
  return (
    <UserAccount_DetailCard borderColor="#e7e7e7" margin="1rem 0 0">
      <CardBody padding="2rem" bg="#ffffff">
        <DetailedInfoCard margin="0 0.6rem">
          <div className="header">
            Account Information
            {handleAccountCount()}
          </div>
        </DetailedInfoCard>

        {userDetailsData.accountDetail.map((item) => {
          return (
            <DetailedInfoCard
              hFontSize="16px"
              hFontLetterSpacing="normal"
              margin="1.5rem 1rem"
              hTextTransform="capitalize"
              hBorderColor="#d1d1d1"
              bg="#fafafa"
              padding="2rem 2rem 0.5rem"
              key={item.id}
            >
              <div className="header">
                Account <small>({item.mainCode})</small>
              </div>

              <div className="detail_container">
                <div className="info_box">
                  <div>
                    <span className="info_icon">
                      <FiUser size={24} color="#005c3f" />
                    </span>
                    <span className="info_title">Account Holder Name :</span>
                  </div>

                  <span className="info_text">{item.accountHolderName}</span>
                </div>

                <div className="info_box">
                  <div>
                    <span className="info_icon">
                      <IoGitBranchOutline size={24} color="#005c3f" />
                    </span>
                    <span className="info_title">Branch Name:</span>
                  </div>

                  <span className="info_text">{item.branchName}</span>
                </div>

                <div className="info_box">
                  <div>
                    <span className="info_icon">
                      <BsCodeSlash size={24} color="#005c3f" />
                    </span>
                    <span className="info_title">Branch Code :</span>
                  </div>
                  <span className="info_text">{item.branchCode}</span>
                </div>

                <div className="info_box">
                  <div>
                    <span className="info_icon">
                      <RiBankFill size={24} color="#005c3f" />
                    </span>
                    <span className="info_title">Account No. :</span>
                  </div>
                  <span className="info_text">{item.mainCode}</span>
                </div>

                <div className="info_box">
                  <div>
                    <span className="info_icon">
                      <MdMergeType size={24} color="#005c3f" />
                    </span>
                    <span className="info_title">Account Type :</span>
                  </div>
                  <span className="info_text">{item.accountType}</span>
                </div>

                <div className="info_box">
                  <div>
                    <span className="info_icon">
                      <BsPencilSquare size={24} color="#005c3f" />
                    </span>
                    <span className="info_title">Primary Account No.? : </span>
                  </div>
                  <span className="info_text">{item.primary}</span>
                </div>

                <div className="info_box">
                  <div>
                    <span className="info_icon">
                      <FiDatabase size={24} color="#005c3f" />
                    </span>
                    <span className="info_title">Actual Balance :</span>
                  </div>
                  <span className="info_text">NPR. {item.actualBalance}</span>
                </div>

                <div className="info_box">
                  <div>
                    <span className="info_icon">
                      <IoWalletOutline size={24} color="#005c3f" />
                    </span>
                    <span className="info_title">Available Balance :</span>
                  </div>
                  <span className="info_text">
                    NPR. {item.availableBalance}
                  </span>
                </div>

                <div className="info_box">
                  <div>
                    <span className="info_icon">
                      <RiMiniProgramLine size={24} color="#005c3f" />
                    </span>
                    <span className="info_title">
                      Minimum Balance Must Be :
                    </span>
                  </div>
                  <span className="info_text">NPR. {item.minimumBalance}</span>
                </div>

                <div className="info_box">
                  <div>
                    <span className="info_icon">
                      <GiTakeMyMoney size={24} color="#005c3f" />
                    </span>
                    <span className="info_title">Accured Interest :</span>
                  </div>
                  <span className="info_text">NPR. {item.accruedInterest}</span>
                </div>

                <div className="info_box">
                  <div>
                    <span className="info_icon">
                      <RiMoneyCnyBoxLine size={24} color="#005c3f" />
                    </span>
                    <span className="info_title">Inteest Rate : </span>
                  </div>
                  <span className="info_text">
                    {item.interestRate}/Per Year
                  </span>
                </div>

                <div className="info_box">
                  <div>
                    <span className="info_icon">
                      <AiOutlineMobile size={24} color="#005c3f" />
                    </span>
                    <span className="info_title">Mobile Banking Service :</span>
                  </div>
                  <div className="info_text">
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label={
                        item.mobileBanking === "true" ? "Active" : "In-Active"
                      }
                      checked={item.mobileBanking === "true" ? true : false}
                    />
                  </div>
                </div>

                <div className="info_box">
                  <div>
                    <span className="info_icon">
                      <RiMailCheckLine size={24} color="#005c3f" />
                    </span>
                    <span className="info_title">SMS Banking Service :</span>
                  </div>
                  <div className="info_text">
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label={item.sms === "true" ? "Active" : "In-Active"}
                      checked={item.sms === "true" ? true : false}
                    />
                  </div>
                </div>
              </div>
            </DetailedInfoCard>
          );
        })}
      </CardBody>
    </UserAccount_DetailCard>
  );
};

export default UserAccountDetailCard;
