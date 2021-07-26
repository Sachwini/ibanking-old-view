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
import UserInfo from "./userInfo";
import {
  CardBody,
  CardFooter,
  CardHeader,
  CustomCard,
} from "styling/common/CardStyling";
import { StatementContainer } from "styling/StatementStyling";
import StatementCardHeader from "./statementCardHeader";
import StatementView2 from "./StatementView2";

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
        let reverseData = data;
        const reverseSDetails = data.accountStatementDtos.reverse();

        reverseData = { ...reverseData, accountStatementDtos: reverseSDetails };
        setStatementData(reverseData);
        setSortedData(reverseSDetails);
      }
    };

    loadData();

    return () => {
      isSuscribed = false;
    };
  }, [
    selectedAccountDetails.accountNumber,
    formatedStartDate,
    formatedEndDate,
  ]);

  const handleSortBy = (sortName: string) => {
    if (sortName === "debit") {
      const data = statementData.accountStatementDtos.filter(
        (row) => row.debit !== null
      );
      setSortedData(data);
      setSortBy("default");
    }
    if (sortName === "credit") {
      const data = statementData.accountStatementDtos.filter(
        (row) => row.credit !== null
      );
      setSortedData(data);
      setSortBy("default");
    }
    if (sortName === "all") {
      setSortedData(statementData.accountStatementDtos);
      setSortBy("default");
    }
  };

  return (
    <StatementContainer fluid>
      <UserInfo />

      <CustomCard margin="1rem 0">
        <CardHeader className="statement_cardHeader" bg="#fdfdfd">
          <StatementCardHeader
            setItemsPerPage={(item) => setItemsPerPage(item)}
            setSortBy={(by) => handleSortBy(by)}
            // fStartDate={(date) => setFormatedStartDate(date)}
            // fEndDate={(date) => setFormatedEndDate(date)}
            sortedDataLength={sortedData.length}
            handleSearchButton={(fStartDate, fEndtDate) => {
              setFormatedStartDate(fStartDate);
              setFormatedEndDate(fEndtDate);
            }}
          />
        </CardHeader>

        <CardBody
          padding="0.5rem 1.5rem"
          // style={{ maxHeight: "600px", overflowY: {itemsPerPage >= 20 ? "scroll" : "inherit"} }}
        >
          <StatementView2
            data={filteredData}
            openingBalance={statementData.openingBalance}
          />
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
