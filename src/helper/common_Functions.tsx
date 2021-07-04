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
  const res = await post<apiResponse<any>>(
    `api/changeBankTransferOtpStatus?status=true&otp=${otp}`,
    {}
  );
  return {
    status: res.data.status as string,
    message: res.data.message as string,
  };
};
