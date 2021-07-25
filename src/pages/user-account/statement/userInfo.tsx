import React from "react";
import { useRecoilValue } from "recoil";
import { getSelectedAcc, userDetails } from "state-provider/globalUserData";
import { DetaildView } from "styling/for-modal/PaymentModalStyling";
import { UserInfoContainer } from "styling/StatementStyling";

const UserInfo = () => {
  const userDetail = useRecoilValue(userDetails);
  const selectedAccountDetails = useRecoilValue(getSelectedAcc);
  return (
    <UserInfoContainer
      bg="#fafafa"
      padding="0.5rem 1.5rem 1rem"
      textColor="#184ad4cc"
    >
      <p className="card_heading"> User details: </p>
      <DetaildView bg="transparent" tColor="#515986">
        <div className="detail_wrapper">
          <p className="detail_title">Name:</p>
          <p className="detail_text">{userDetail.fullName}</p>
        </div>

        <div className="detail_wrapper">
          <p className="detail_title">Phone:</p>
          <p className="detail_text">{userDetail.mobileNumber}</p>
        </div>

        <div className="detail_wrapper">
          <p className="detail_title">email:</p>
          <p className="detail_text">{userDetail.email}</p>
        </div>

        <div className="detail_wrapper">
          <p className="detail_title">Bank Branch:</p>
          <p className="detail_text">{userDetail.bankBranch}</p>
        </div>

        <div className="detail_wrapper">
          <p className="detail_title">Account No:</p>
          <p className="detail_text">{selectedAccountDetails.accountNumber}</p>
        </div>

        <div className="detail_wrapper">
          <p className="detail_title">Account Type:</p>
          <p className="detail_text">{selectedAccountDetails.accountType}</p>
        </div>
      </DetaildView>
    </UserInfoContainer>
  );
};

export default UserInfo;
