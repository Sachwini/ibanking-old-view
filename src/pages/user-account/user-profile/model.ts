
export interface userDetail {
    fullName: string
    addressOne: string
    mobileNumber: string
    firstName: string
    addressTwo: string
    middleName: string
    lastName: string
    city: string
    state: string
    email: string
    bank: string
    bankBranch: string
    alertType: boolean
    mobileBanking: boolean
    smsService: boolean
    bankBranchCode: string
    appVerification: boolean
    beneficiaryFlag: boolean
    deviceToken: boolean
    bankCode: string
    accountDetail: userAccount[],
    oauthTokenCount: number
    firebaseToken: boolean
    gender: string
    otpString: string
    bankTransferOtp: boolean
    registered: boolean
}

interface userAccount {
    branchCode: string
    mainCode: string
    accountType: string
    mobileBanking: boolean
    sms: boolean
    branchName: string
    id: string
    accountNumber: string
    primary: boolean
}
