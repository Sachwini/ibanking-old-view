export interface apiResponse<T> {
    status: string
    code: string
    message: string
    details: T
    detail: any
}