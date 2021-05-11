import { get } from "./AjaxService";

export interface brokerModel { 
  details: brokerDetails[];
}

interface brokerDetails {
  code: any;
  name: any;
  logo: string;
}

export const getBrokerList = async () => {
  const res = await get<brokerModel>("/api/broker/list");
  return res && res.data.details;
};
