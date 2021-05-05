import React from "react";
import { useStateValue } from "state-provider/StateProvider";

export const GetAccountNumber = () => {
  const [{ customerDetails }, dispatch] = useStateValue();

  let AccNumber = !customerDetails?.accountDetail
    ? ""
    : customerDetails?.accountDetail[0].accountNumber;
  return AccNumber;
};
