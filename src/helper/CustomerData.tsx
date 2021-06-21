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
  console.log(array);
  return array;
};
