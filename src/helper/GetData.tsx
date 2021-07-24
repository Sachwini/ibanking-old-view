import { apiResponse } from "models/apiResponse";
import { StatementDataType } from "models/StatementModels";
import { userDetailType } from "models/for-pages/userAccountModels";
import { get, post } from "services/AjaxService";
import {
  balanceDetailType,
  charDataType,
  chartBalanceListType,
} from "models/ChartModdels";
import { favAccType } from "models/for-pages/favAcccountModels";

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
  try {
    const res = await get<apiResponse<StatementDataType>>(
      `api/accountStatement?fromDate=${formatedStartDate}&accountNumber=${accountNumber}&toDate=${formatedEndDate}`
    );
    if (res && res.data.details) {
      return res && res.data.details;
    } else
      console.log("Something went wrong while fetching statement data....");
  } catch (error) {
    console.log(
      "error occured while fetching statement data: ",
      error.response.data.message
    );
  }
};

// add to favourite account list
export const addFavAccount = async (
  accountNumber: string,
  destinationBankName: string,
  DESTAccHolherName: string
) => {
  const model = {
    reminderType: "OneTime",
    serviceInfoType: "CONNECT_IPS",
    data: {
      destinationAccountNumber: accountNumber,
      destinationBankName: destinationBankName,
      destinationAccountHolderName: DESTAccHolherName,
    },
  };

  try {
    const res = await post<apiResponse<any>>("/api/saveuserpayment", model);
    if (res) {
      return {
        state: "success",
        messageTitle: res.data.status,
        message: `${res.data.message} Successfylly`,
      };
    } else {
      return {
        state: "error",
        messageTitle: "Failed",
        message: "Something went wrong... please try again later...",
      };
    }
  } catch (error) {
    return {
      state: "error",
      messageTitle: error.response.data.status,
      message: error.response.data.message,
    };
  }
};

// get user saved favourite account details
export const getFavAccDetails = async () => {
  try {
    const res = await get<apiResponse<favAccType[]>>(
      "/api/userSavedPayment?serviceInfoType=CONNECT_IPS"
    );
    if (res) {
      return res && res.data.details;
    } else {
      console.log("something went wrong to load favourite account load");
    }
  } catch (error) {
    console.log(
      "error occured in loading favourite account data: ",
      error.response
    );
  }
};
