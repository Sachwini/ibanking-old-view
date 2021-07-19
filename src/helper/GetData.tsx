import { apiResponse } from "models/apiResponse";
import { StatementDataType } from "models/StatementModels";
import { userDetailType } from "models/for-pages/userAccountModels";
import { get } from "services/AjaxService";
import {
  balanceDetailType,
  charDataType,
  chartBalanceListType,
} from "models/ChartModdels";

// load users Details
export const loadUserDetails = async () => {
  const res = await get<apiResponse<userDetailType>>(
    "api/customerdetails?additionalDetails=true"
  );

  return res && res.data.details;
};

// get user transction history chart
export const getGraph = async (accountNumber: string) => {
  const loadDays: number[] = [];
  const loadBalance: number[] = [];

  try {
    const res = await get<charDataType>(
      `api/graph/balance?accountNumber=${accountNumber}`
    );
    if (res) {
      // storing day in an array
      res.data.detail.balanceList.forEach((x: chartBalanceListType) =>
        loadDays.push(x.day)
      );

      // storing balance in an array
      res.data.detail.balanceList.forEach((x: chartBalanceListType) =>
        loadBalance.push(x.balance)
      );

      return {
        dayList: loadDays,
        balanceList: loadBalance,
        balanceDetail: {
          openingBalance: res.data.detail.openingBalance,
          closingBalance: res.data.detail.closingBalance,
          minimumBalance: res.data.detail.minimumBalance,
          maximumBalance: res.data.detail.maximumBalance,
        } as balanceDetailType,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

// get statement of users
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
