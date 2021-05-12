import { get } from "./AjaxService";

export interface branchModel {
  id: any
  name: any
  address: string
  branchCode: string
  bank: string
  city: string
  state: string
  bankId: string
  bankCode: string
  email: string
  branchId: string
  telephoneNumber: string
  details: branchDetails[]
}

interface branchDetails {
  id: number
  name: string
  address: string
  branchCode: string
  bank: string
  city: string
  checker: boolean;
  maker: boolean;
  state: string
  bankId: number
  bankCode: string
  email: string
  mobileNumber: string
  branchId: string
  latitude: any
  longitude: any
  info: any;
  nchl: any
  fax: string
  telephoneNumber: string
  branchManager: string
}

export const getBankBranches = async () => {
  const res = await get<branchModel>("/get/bankbranches?");
  return res && res.data.details
};

export const getBankList = async () => {
  const res = await get<any>("/api/ips/bank");
  return res && res.data.details
} 

