import { formatDate, ThreeMonthsBack } from "helper/DateConfig";
import { getStatement } from "helper/GetData";
import {
  StatementDataType,
  statementDefaultValue,
} from "models/StatementModels";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { getSelectedAcc } from "state-provider/globalUserData";
import DemoPaginate from "./demoPaginate";

let threeMonthBackDate = ThreeMonthsBack(new Date());

const Demo = () => {
  const [startDate, setStartDate] = useState(new Date(`${threeMonthBackDate}`));
  const [endDate, setEndDate] = useState(new Date());
  const [statementData, setStatementData] = useState<StatementDataType>(
    statementDefaultValue
  );

  const selectedAccountDetails = useRecoilValue(getSelectedAcc);

  // Getting Required Data From Helper
  const formatedStartDate = formatDate(startDate);
  const formatedEndDate = formatDate(endDate);

  useEffect(() => {
    let isSuscribed = true;

    const loadData = async () => {
      const data = await getStatement(
        selectedAccountDetails.accountNumber,
        formatedStartDate,
        formatedEndDate
      );
      if (isSuscribed && data) {
        setStatementData(data);
      }
    };

    loadData();

    return () => {
      isSuscribed = false;
    };
  }, [selectedAccountDetails.accountNumber]);

  return (
    <Container fluid>
      <DemoPaginate data={statementData} />
    </Container>
  );
};

export default Demo;
