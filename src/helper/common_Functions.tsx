import {
  apiResponse,
  transactionListType,
  transctionHistoryType,
  transferRequestDetailType,
} from "models/apiResponse";
import { get, post } from "services/AjaxService";

// checking is OTP required for transctions
interface isOTPRequiredType {
  otpRequired: boolean;
}
export const isOtpRequired = async (amount: string, skip?: boolean) => {
  const res = await get<apiResponse<isOTPRequiredType>>(
    `api/otp/request?serviceInfoType=CONNECT_IPS&associatedId&amount=${amount}`
  );
  if (res && res.data.detail.otpRequired === true) {
    return true as boolean;
  } else return false as boolean;
};

// Enabling OTP Transction for all transctions
export const enableOTPTransction = async (otp: string) => {
  try {
    const res = await post<apiResponse<any>>(
      `api/changeBankTransferOtpStatus?status=true&otp=${otp}`,
      {}
    );
    if (res && res.data.status === "SUCCCESS") {
      return {
        status: true as boolean,
        message: res.data.message as string,
      };
    } else
      return {
        status: false as boolean,
        message: res.data.message as string,
      };
  } catch (error) {
    if (error.response) {
      return {
        status: false as boolean,
        message: error.response.data.message as string,
      };
    }
  }
};

// get transction history for bank transfer and fund transfer
export const getTransctionHistory = async (mpin: string, pageNo?: number) => {
  const res = await get<
    apiResponse<
      transctionHistoryType<transactionListType<transferRequestDetailType>>
    >
  >(`api/transactionhistory?mPin=${mpin}&page_no=${pageNo ? pageNo : 1}`);

  return res && res.data.details;
};

// generate pdf file for recent transction
export const generatePDF = async (identifier: string) => {
  const res = await get<apiResponse<any>>(
    `/api/gettransactionreceiptpdf?transactionId=${identifier}`
  );
  if (res && res.data.detail === null) {
    return { status: false, message: res.data.message, url: "" };
  } else
    return {
      status: true,
      message: res.data.message,
      url: res.data.detail.URL,
    };
};
