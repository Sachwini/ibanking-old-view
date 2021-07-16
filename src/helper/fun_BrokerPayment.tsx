import {
  apiResponse,
  brokerRequestDetailType,
  transactionListType,
  transctionHistoryType,
} from "models/apiResponse";
import {
  brokerDataType,
  brokerListType,
  brokerPaymentFormDataType,
} from "models/for-pages/brokerPaymentModels";
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

export const getBrokerPaymentTHistory = async (
  mpin: string,
  pageNo?: number
) => {
  const res = await get<
    apiResponse<
      transctionHistoryType<transactionListType<brokerRequestDetailType>>
    >
  >(`api/transactionhistory?mPin=${mpin}&page_no=${pageNo ? pageNo : 1}`);

  return res && res.data.details;
};

export const brokerFormDefaultValue = {
  fromAccount: "",
  DESTBrokerName: "",
  clientID: "",
  clientName: "",
  mobileNumber: "",
  transctionAmount: "",
  remarks: "",
  brokerCode: "",
};

export const brokerDefaultTHistoryData = {
  amount: 0,
  service: "",
  serviceTo: "",
  accountNumber: "",
  transactionIdentifier: "",
  date: "",
  status: "",
  airlinesPdfUrl: "any",
  sessionId: "any",
  id: 0,
  createdDate: "",
  destination: "",
  charge: 0,
  requestDetail: {
    customer_address: "",
    amount: "",
    mobile_number: "",
    serviceId: "",
    serviceTo: "",
  },
  responseDetail: {
    "Result Message": "",
    RefStan: "",
    status: "",
  },
  iconUrl: "",
};
