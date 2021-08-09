import { v4 as uuidv4 } from "uuid";
import {
  getClientID,
  getClientSecret,
  getDeviceUID,
  setDeviceUID,
} from "./AuthService";

// export const client_id = "VBMRDWEVFV"; //VBMRDWEVFV //H6FXNHXS61
// export const client_secret = "199204"; //199204 //175391
// export const grant_type = "password";

export const client_id = getClientID();
export const client_secret = getClientSecret();
export const grant_type = "password";

// Handling Device Unique Identifier
export const DeviceUniqueIdentifier = () => {
  let deviceUniqueIdentifier: string = "";

  const isDeviceID = getDeviceUID();
  if (isDeviceID === null) {
    setDeviceUID(uuidv4());
  } else {
    deviceUniqueIdentifier = isDeviceID;
  }

  return deviceUniqueIdentifier;
};
