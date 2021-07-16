import { apiResponse } from "models/apiResponse";
import { StatementDataType } from "models/StatementModels";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { get } from "services/AjaxService";
import { getSelectedAcc } from "state-provider/globalUserData";
import { formatDate, ThreeMonthsBack } from "./DateConfig";

let threeMonthBackDate = ThreeMonthsBack(new Date());

const GetStatementData = () => {
  const selectedAccoutDetails = useRecoilValue(getSelectedAcc);
  const startDate = new Date(`${threeMonthBackDate}`);
  const endDate = new Date();
  const [data, setData] = useState<StatementDataType>();

  const formatedStartDate = formatDate(startDate);
  const formatedEndDate = formatDate(endDate);

  const loadStatement = async () => {
    try {
      const res = await get<apiResponse<StatementDataType>>(
        `api/accountStatement?fromDate=${formatedStartDate}&accountNumber=${selectedAccoutDetails.accountNumber}&toDate=${formatedEndDate}`
      );
      if (res) {
        setData(res.data.details);
      }
    } catch (error) {
      console.log("Statement loading Errors: ", error);
    }
  };
  loadStatement();

  return data;
};

export default GetStatementData;
