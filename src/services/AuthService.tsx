const localStorageAuthTokenKey = 'AccessToken'

export function getBearerToken() {
    return localStorage.getItem(localStorageAuthTokenKey)
}

export function setBearerToken(token: string) {
    localStorage.setItem(localStorageAuthTokenKey,token)
}

export function goToLoginPage() {
    window.location.href = '/login'
}