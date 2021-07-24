import { useEffect, useState } from "react";
import { formatDate, yearBack } from "helper/DateConfig";
import StaticBar from "components/StaticBar";
import { activityLogPageTitle } from "static-data/forPageTitle";
import { forActivityLog } from "static-data/forBreadCrumb";
import {
  MiniStatementContainer,
  MiniStatementWrapper,
} from "styling/for-dashboard/MimiStatementStyling";
import { PageTitle } from "components/PageTitle";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoading } from "state-provider/forPageSetting";
import { Sdetails } from "models/StatementModels";
import { getSelectedAcc } from "state-provider/globalUserData";
import { getStatement } from "helper/GetData";

let oneYearBack = yearBack(new Date());

const Activities = () => {
  const startDate = new Date(`${oneYearBack}`);
  const endDate = new Date();
  const [statementData, setStatementData] = useState<Sdetails[]>([]);
  const setLoading = useSetRecoilState(isLoading);
  const selectedAccountDetails = useRecoilValue(getSelectedAcc);

  const formatedStartDate = formatDate(startDate);
  const formatedEndDate = formatDate(endDate);

  useEffect(() => {
    let isSubscribed = true;

    const init = async () => {
      const res = await getStatement(
        selectedAccountDetails.accountNumber,
        formatedStartDate,
        formatedEndDate
      );
      if (isSubscribed && res) {
        setStatementData(res.accountStatementDtos.slice(0, 19));
        setLoading(false);
      }
    };

    init();
    return () => {
      isSubscribed = false;
    };
  }, [selectedAccountDetails.accountNumber]);

  return (
    <>
      <StaticBar
        pageTitle={activityLogPageTitle}
        breadCrumbData={forActivityLog}
      />
      <MiniStatementContainer padding="1rem 2rem">
        <PageTitle
          title="Your Transctions Activities"
          subTitle="To See More Transctions Activities Please Go to Statement Page..."
          align="center"
        />

        {statementData?.map((data, index) => {
          const amount = data.debit !== null ? data.debit : data.credit;
          const detectColor = data.debit !== null ? "red" : "green";
          return (
            <MiniStatementWrapper
              key={data.transactionDate + index}
              color={detectColor}
            >
              <p className="date">{data.transactionDate}</p>
              <p className="desc">{data.remarks}</p>
              <p className="amount">NPR. {amount}</p>
            </MiniStatementWrapper>
          );
        })}
      </MiniStatementContainer>
    </>
  );
};

export default Activities;
