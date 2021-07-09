import { apiResponse } from "models/apiResponse";
import { get, post } from "services/AjaxService";

interface isOTPRequiredType {
  otpRequired: boolean;
}
export const isOtpRequired = async (amount: string, skip?: boolean) => {
  //   if (skip === true || parseFloat(amount) >= 5000) {
  {
    const res = await get<apiResponse<isOTPRequiredType>>(
      `api/otp/request?serviceInfoType=CONNECT_IPS&associatedId&amount=${amount}`
    );
    if (res && res.data.detail.otpRequired === true) {
      return true as boolean;
    } else return false as boolean;
  }
  //   } else return false;
};

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
