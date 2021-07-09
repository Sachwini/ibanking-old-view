import { userAccount } from "pages/user-account/user-profile/model";
import { useStateValue } from "state-provider/StateProvider";

export const GetAccountNumber = () => {
  const [{ customerDetails }] = useStateValue();
  let AccNumber = !customerDetails?.accountDetail
    ? ""
    : customerDetails?.accountDetail[0]?.accountNumber;
  return AccNumber;
};

export const GetAllAccountNumber = () => {
  const [{ customerDetails }] = useStateValue();
  let allAccountNumber = !customerDetails?.accountDetail
    ? ""
    : customerDetails.accountDetail.map((accNum: any) => accNum.accountNumber);
  return allAccountNumber;
};

export const GetAccountNumberValueMainCodeKey = () => {
  const [{ customerDetails }] = useStateValue();
  let collection = new Map();
  customerDetails?.accountDetail?.map((AccNo: any) =>
    collection.set(AccNo.mainCode, AccNo.accountNumber)
  );
  let array = Array.from(collection, ([mainCode, AccountNumber]) => ({
    mainCode,
    AccountNumber,
  }));
  return array;
};

// Get all accounts withs its types
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
