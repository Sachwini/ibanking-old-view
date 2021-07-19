import { useEffect, useState } from "react";
import { formatDate, yearBack } from "helper/DateConfig";
import {
  MiniStatementContainer,
  MiniStatementWrapper,
} from "styling/for-dashboard/MimiStatementStyling";
import { ButtonWrapper } from "styling/common/ButtonStyling";

import { PageTitle } from "components/PageTitle";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getStatement } from "helper/GetData";
import { Sdetails } from "models/StatementModels";
import { useRecoilValue } from "recoil";
import { getSelectedAcc } from "state-provider/globalUserData";

let oneYearBack = yearBack(new Date());

const MiniStatementCard = () => {
  const startDate = new Date(`${oneYearBack}`);
  const endDate = new Date();
  const [statementData, setStatementData] = useState<Sdetails[]>([]);
  const selectedAccountDetails = useRecoilValue(getSelectedAcc);

  const formatedStartDate = formatDate(startDate);
  const formatedEndDate = formatDate(endDate);

  useEffect(() => {
    let isSubscribed = true;
    const init = async () => {
      try {
        const res = await getStatement(
          selectedAccountDetails.accountNumber,
          formatedStartDate,
          formatedEndDate
        );
        if (res || isSubscribed) {
          setStatementData(res.slice(0, 6));
        }
      } catch (error) {
        console.log(error);
      }
    };

    init();
    return () => {
      isSubscribed = false;
    };
  }, [selectedAccountDetails.accountNumber]);

  return (
    <MiniStatementContainer className="card_Shadow">
      <PageTitle
        title="Recent Activity"
        subTitle="Your Recent Account Activities...."
        padding="0.5rem"
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

      <ButtonWrapper padding="1.5rem 0 0">
        <Link to="/statement">
          <Button variant="light" className="btn_ctrl">
            View All Activities
          </Button>
        </Link>
      </ButtonWrapper>
    </MiniStatementContainer>
  );
};

export default MiniStatementCard;
