import { userAccount } from "pages/user-account/user-profile/model";
import { useState } from "react";
import { useStateValue } from "state-provider/StateProvider";

export const GetAccountNumber = () => {
  const [{ customerDetails }] = useStateValue();
  let AccNumber = !customerDetails?.accountDetail
    ? ""
    : customerDetails?.accountDetail[0]?.accountNumber;
  return AccNumber;
};

export const GetAccountNumber2 = () => {
  const [{ customerDetails }] = useStateValue();
  let AccountNumber2 = !customerDetails?.accountDetail
    ? ""
    : customerDetails?.accountDetail[1]?.accountNumber;
  return AccountNumber2;
};

export const GetAllAccountNumber = () => {
  const [{ customerDetails }] = useStateValue();
  let allAccountNumber = !customerDetails?.accountDetail
    ? ""
    : customerDetails.accountDetail.map((accNum: any) => accNum.accountNumber);
  return allAccountNumber;
};

interface getAllAccNoType {
  accountNumber: string;
  accoutType: string;
}

export const GetAllAccNoWithType = () => {
  const [{ customerDetails }] = useStateValue();

  let data: getAllAccNoType[] = !customerDetails?.accountDetail
    ? ""
    : customerDetails?.accountDetail?.map((items: userAccount) => {
        return {
          accountNumber: items.accountNumber,
          accoutType: items.accountType,
        };
      });

  return data;
};
