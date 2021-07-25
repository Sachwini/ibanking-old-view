import { formatDate, ThreeMonthsBack } from "helper/DateConfig";
import { getStatement } from "helper/GetData";
import {
  Sdetails,
  sDetailsDefaultValue,
  StatementDataType,
  statementDefaultValue,
} from "models/StatementModels";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { getSelectedAcc } from "state-provider/globalUserData";
import Paginate from "components/Paginate";
import { v4 as uuidv4 } from "uuid";

let threeMonthBackDate = ThreeMonthsBack(new Date());

const Demo = () => {
  const [startDate, setStartDate] = useState(new Date(`${threeMonthBackDate}`));
  const [endDate, setEndDate] = useState(new Date());
  const [statementData, setStatementData] = useState<StatementDataType>(
    statementDefaultValue
  );
  const [filteredData, setFilteredData] = useState<Sdetails[]>([
    sDetailsDefaultValue,
  ]);
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

  console.log("our sliced data: ", filteredData);

  return (
    <Container fluid>
      <ul>
        {filteredData.map((items) => {
          return (
            <li key={uuidv4()}>
              <span>Debit: {items.debit}</span>
              <span className="px-3">Credit: {items.credit}</span>
              <span className="px-3">Remarks: {items.remarks}</span>
              <span>Transction Date: {items.transactionDate}</span>
            </li>
          );
        })}
      </ul>

      <Paginate
        rawData={statementData.accountStatementDtos}
        pageNumberLimit={7}
        itemsPerPage={10}
        filteredData={(data) => setFilteredData(data)}
      />
    </Container>
  );
};

export default Demo;
