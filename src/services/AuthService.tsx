const localStorageAuthTokenKey = "accessToken";
const localStorageRefreshTokenKey = "refreshToken";

export function getBearerToken() {
  return localStorage.getItem(localStorageAuthTokenKey);
}

export function setBearerToken(token: string) {
  localStorage.setItem(localStorageAuthTokenKey, token);
}

export function setRefreshToken(token: string) {
  localStorage.setItem(localStorageRefreshTokenKey, token);
}

export function goToLoginPage() {
  window.location.href = `/`;
}
