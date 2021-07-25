import { formatDate, ThreeMonthsBack } from "helper/DateConfig";
import { getStatement } from "helper/GetData";
import {
  Sdetails,
  sDetailsDefaultValue,
  StatementDataType,
  statementDefaultValue,
} from "models/StatementModels";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { getSelectedAcc } from "state-provider/globalUserData";
import Paginate from "components/Paginate";
import { v4 as uuidv4 } from "uuid";
import UserInfo from "./userInfo";
import {
  CardBody,
  CardFooter,
  CardHeader,
  CustomCard,
} from "styling/common/CardStyling";
import { StatementContainer } from "styling/StatementStyling";
import StatementCardHeader from "./statementCardHeader";

let threeMonthBackDate = ThreeMonthsBack(new Date());

const Demo = () => {
  const [formatedStartDate, setFormatedStartDate] = useState(
    formatDate(new Date(`${threeMonthBackDate}`))
  );
  const [formatedEndDate, setFormatedEndDate] = useState(
    formatDate(new Date())
  );
  const [statementData, setStatementData] = useState<StatementDataType>(
    statementDefaultValue
  );

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("all");
  const [sortedData, setSortedData] = useState<Sdetails[]>([
    sDetailsDefaultValue,
  ]);

  const [filteredData, setFilteredData] = useState<Sdetails[]>([
    sDetailsDefaultValue,
  ]);

  const selectedAccountDetails = useRecoilValue(getSelectedAcc);

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

  useEffect(() => {
    let isSuscribed = true;

    if (isSuscribed && sortBy === "debit") {
      const data = statementData.accountStatementDtos.filter(
        (row) => row.debit !== null
      );
      setSortedData(data);
    } else if (isSuscribed && sortBy === "credit") {
      const data = statementData.accountStatementDtos.filter(
        (row) => row.credit !== null
      );
      setSortedData(data);
    } else setSortedData(statementData.accountStatementDtos);

    return () => {
      isSuscribed = false;
    };
  }, [statementData, filteredData, sortBy]);

  console.log("items per page  items: ", itemsPerPage);
  console.log("sort by: ", sortBy);
  console.log("sort data: ", sortedData);
  console.log("formatted start date : ", formatedStartDate);
  console.log("formatted end date: ", formatedEndDate);

  return (
    <StatementContainer fluid>
      <UserInfo />

      <CustomCard margin="1rem 0">
        <CardHeader className="statement_cardHeader" bg="#fdfdfd">
          <StatementCardHeader
            setItemsPerPage={(item) => setItemsPerPage(item)}
            setSortBy={(by) => setSortBy(by)}
            fStartDate={(date) => setFormatedStartDate(date)}
            fEndDate={(date) => setFormatedEndDate(date)}
            sortedDataLength={sortedData.length}
          />
        </CardHeader>

        <CardBody padding="0.5rem 1.5rem">
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
        </CardBody>

        <CardFooter padding="1rem 0.5rem 0.5rem" bg="#fdfdfd">
          <Paginate
            rawData={sortedData}
            pageNumberLimit={7}
            itemsPerPage={itemsPerPage}
            filteredData={(data) => setFilteredData(data)}
          />
        </CardFooter>
      </CustomCard>
    </StatementContainer>
  );
};

export default Demo;
