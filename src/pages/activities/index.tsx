import { useEffect, useState } from "react";
import { Sdetails } from "pages/user-account/statement/model";
import { GetAccountNumber } from "helper/CustomerData";
import { formatDate, yearBack } from "helper/DateConfig";
import { getStatement } from "services/BankServices";
import { Loader } from "pages/static/Loader";
import StaticBar from "components/StaticBar";
import { activityLogPageTitle } from "static-data/forPageTitle";
import { forActivityLog } from "static-data/forBreadCrumb";
import {
  MiniStatementContainer,
  MiniStatementWrapper,
} from "styling/for-dashboard/MimiStatementStyling";
import { PageTitle } from "components/PageTitle";
import { useSetRecoilState } from "recoil";
import { isLoading } from "state-provider/forPageSetting";

let oneYearBack = yearBack(new Date());

const Activities = () => {
  const startDate = new Date(`${oneYearBack}`);
  const endDate = new Date();
  const [statementData, setStatementData] = useState<Sdetails[]>([]);
  const setLoading = useSetRecoilState(isLoading);

  const accountNumber = GetAccountNumber();
  const formatedStartDate = formatDate(startDate);
  const formatedEndDate = formatDate(endDate);

  useEffect(() => {
    let isSubscribed = true;
    const init = async () => {
      try {
        if (accountNumber !== "") {
          const res = await getStatement(
            accountNumber,
            formatedStartDate,
            formatedEndDate
          );
          if (res || isSubscribed) {
            setStatementData(res.slice(0, 19));
            setLoading(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    init();
    return () => {
      isSubscribed = false;
    };
  }, [accountNumber]);

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
