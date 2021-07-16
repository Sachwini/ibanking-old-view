import { apiResponse } from "models/apiResponse";
import { StatementDataType } from "models/StatementModels";
import { userDetailType } from "models/for-pages/userAccountModels";
import { get } from "services/AjaxService";

export const loadUserDetails = async () => {
  const res = await get<apiResponse<userDetailType>>(
    "api/customerdetails?additionalDetails=true"
  );

  return res && res.data.details;
};

export const getGraph = async (accountNumber: string) => {
  const res = await get<any>(
    "api/graph/balance?accountNumber=" + accountNumber
  );
  return res && res.data.detail.balanceList;
};

export const getStatement = async (
  accountNumber: string,
  formatedStartDate: string,
  formatedEndDate: string
) => {
  const res = await get<apiResponse<StatementDataType>>(
    `api/accountStatement?fromDate=${formatedStartDate}&accountNumber=${accountNumber}&toDate=${formatedEndDate}`
  );
  return res && res.data.details.accountStatementDtos;
};
