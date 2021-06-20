import { apiResponse } from "models/apiResponse";
import { StatementDataType } from "pages/user-account/statement/model";
import { useState } from "react";
import { get } from "services/AjaxService";
import { GetAccountNumber } from "./CustomerData";
import { formatDate, ThreeMonthsBack } from "./DateConfig";

let threeMonthBackDate = ThreeMonthsBack(new Date());

const GetStatementData = () => {
  const startDate = new Date(`${threeMonthBackDate}`);
  const endDate = new Date();
  const [data, setData] = useState<StatementDataType>();

  const accountNumber = GetAccountNumber();
  const formatedStartDate = formatDate(startDate);
  const formatedEndDate = formatDate(endDate);

  // let data: StatementDataType;

  const loadStatement = async () => {
    try {
      const res = await get<apiResponse<StatementDataType>>(
        `api/accountStatement?fromDate=${formatedStartDate}&accountNumber=${accountNumber}&toDate=${formatedEndDate}`
      );
      if (res) {
        setData(res.data.details);
        //   data = res.data.details;
      }
    } catch (error) {
      console.log("Statement loading Errors: ", error);
    }
  };

  loadStatement();

  // const receivedData = data;

  return data;
};

export default GetStatementData;
