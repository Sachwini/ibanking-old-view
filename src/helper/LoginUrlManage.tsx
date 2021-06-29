import React from "react";
import {
  client_id,
  client_secret,
  grant_type,
  DeviceUniqueIdentifier,
} from "services/Constants";
import { baseUrl } from "services/BaseUrl";

interface Props {
  userName: string | number;
  password: string | number;
  otp: string | number;
  isOTPRequired: boolean;
}

export const LoginUrl = (props: Props) => {
  // props initialization
  const { userName, password, otp, isOTPRequired } = props;
  const deviceUniqueIdentifier = DeviceUniqueIdentifier();

  if (isOTPRequired) {
    return `${baseUrl}/oauth/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=${grant_type}&deviceUniqueIdentifier=${deviceUniqueIdentifier}&password=${password}&username=${client_id}${userName}&otp=${otp}`;
  }
  return `${baseUrl}/oauth/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=${grant_type}&deviceUniqueIdentifier=${deviceUniqueIdentifier}&password=${password}&username=${client_id}${userName}`;
};
