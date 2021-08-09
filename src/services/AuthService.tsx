export const localStorageAuthTokenKey = "accessToken";
export const localStorageRefreshTokenKey = "refreshToken";
export const localStrorageIdentityKey = "identity";
export const localStroragePasswordKey = "password";
export const localStorageDeviceUID = "DeviceUID";
export const localStorageRememberMe = "rememberMe";
export const localStorageClientID = "clientID";
export const localStorageClientSecret = "clientSecret";

// for clients details
export function getClientID() {
  return localStorage.getItem(localStorageClientID);
}
export function getClientSecret() {
  return localStorage.getItem(localStorageClientSecret);
}
export function setClientID(clientID: string) {
  localStorage.setItem(localStorageClientID, clientID);
}
export function setClientSecret(clientSecret: string) {
  localStorage.setItem(localStorageClientSecret, clientSecret);
}

// for login and other details config
export function getDeviceUID() {
  return localStorage.getItem(localStorageDeviceUID);
}

export function getBearerToken() {
  return localStorage.getItem(localStorageAuthTokenKey);
}

export function setBearerToken(token: string) {
  localStorage.setItem(localStorageAuthTokenKey, token);
}

export function setRefreshToken(token: string) {
  localStorage.setItem(localStorageRefreshTokenKey, token);
}

export function getIdentity1() {
  return localStorage.getItem(localStrorageIdentityKey);
}

export function setDeviceUID(DeviceUID: string) {
  localStorage.setItem(localStorageDeviceUID, DeviceUID);
}

export function setIdentity1(identity: string) {
  localStorage.setItem(localStrorageIdentityKey, identity);
}

export function getPassword1() {
  return localStorage.getItem(localStroragePasswordKey);
}

export function setPassword1(password: string) {
  localStorage.setItem(localStroragePasswordKey, password);
}

export function goToLoginPage() {
  window.location.href = `/login`;
}

export function setRememberMe(value: string) {
  localStorage.setItem(localStorageRememberMe, value);
}

export function getRememberMe() {
  return localStorage.getItem(localStorageRememberMe);
}
