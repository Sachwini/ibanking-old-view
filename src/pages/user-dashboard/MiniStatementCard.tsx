import { useEffect, useState } from "react";
import { Sdetails } from "pages/user-account/statement/model";
import { GetAccountNumber } from "helper/CustomerData";
import { formatDate, yearBack } from "helper/DateConfig";
import { getStatement } from "services/BankServices";
import {
  MiniStatementContainer,
  MiniStatementWrapper,
} from "styling/for-dashboard/MimiStatementStyling";
import { ButtonWrapper } from "styling/common/ButtonStyling";

import { PageTitle } from "components/PageTitle";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

let oneYearBack = yearBack(new Date());

const MiniStatementCard = () => {
  const startDate = new Date(`${oneYearBack}`);
  const endDate = new Date();
  const [statementData, setStatementData] = useState<Sdetails[]>([]);
  // const [color, setColor] = useState<string>("green")

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
            setStatementData(res.slice(0, 6));
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
    <MiniStatementContainer>
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
