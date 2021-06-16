import { v4 as uuidv4 } from "uuid";
import { getDeviceUID, setDeviceUID } from "./AuthService";

export const client_id = "H6FXNHXS61"; //VBMRDWEVFV //H6FXNHXS61
export const client_secret = "175391"; //199204 //175391
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
