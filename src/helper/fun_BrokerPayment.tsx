import { apiResponse } from "models/apiResponse";
import {
  brokerDataType,
  brokerListType,
  brokerPaymentFormDataType,
} from "models/for-pages/brokerPayment_PageModels";
import { get, post } from "services/AjaxService";

export const getBrokerList = async () => {
  const res = await get<apiResponse<brokerListType[]>>("/api/broker/list");
  return {
    brokerList: res && res.data.details,
    onlyBrokerNameList: res.data.details.map((item) => {
      return item.name;
    }),
  } as brokerDataType;
};

export const getBrokerCode = (
  brokerName: string | undefined,
  data: brokerListType[] | undefined
) => {
  if (brokerName && data) {
    const obj = data.find(({ name }) => name === brokerName);
    const id = obj?.code;
    if (id) {
      return id;
    } else {
      return "";
    }
  }
};

export const getServiceCharge = async (amount: string, brokerCode: string) => {
  if (amount !== "" && brokerCode !== "") {
    const res = await get<apiResponse<number>>(
      `/api/broker/charge?amount=${amount}&code=${brokerCode}`
    );
    return res && res.data.details.toString();
  }
  return "";
};

// is otpp required is going here
interface isOTPRequiredType {
  otpRequired: boolean;
}

// Broker payment going here
interface payAmountResponseType {
  transactionIdentifier: string;
  status: string;
}
export const payAmount = async (
  data: brokerPaymentFormDataType,
  isOtprequired: boolean,
  mpin: string,
  otp: string,
  transctionCharge: string
) => {
  const modal = {
    accountNumber: data.fromAccount,
    amount: data.transctionAmount,
    charge: transctionCharge,
    brokerCode: data.brokerCode,
    clientName: data.clientName,
    clientId: data.clientID,
    mobileNumber: data.mobileNumber,
    remarks: data.remarks,
  };

  if (isOtprequired) {
    const res = await post<apiResponse<payAmountResponseType>>(
      `/api/broker/payment?mPin=${mpin}&otp=${otp}`,
      modal
    );

    return res && res.data;
  } else {
    const response = await post<apiResponse<payAmountResponseType>>(
      `/api/broker/payment?mPin=${mpin}`,
      modal
    );

    return response && response.data;
  }
};
