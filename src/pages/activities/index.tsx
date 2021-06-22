import { AiOutlineUser } from "react-icons/ai";
import { Card, ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./activities.css";
import { Sdetails } from "pages/user-account/statement/model";
import { GetAccountNumber } from "helper/CustomerData";
import { formatDate, ThreeMonthsBack } from "helper/DateConfig";
import { getStatement } from "services/BankServices";
import { Loader } from "pages/static/Loader";
import StaticBar from "components/StaticBar";
import { activityLogPageTitle } from "static-data/forPageTitle";
import { forActivityLog } from "static-data/forBreadCrumb";

let threeMonthBackDate = ThreeMonthsBack(new Date());

const Activities = () => {
  const startDate = new Date(`${threeMonthBackDate}`);
  const endDate = new Date();
  const [statementData, setStatementData] = useState<Sdetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <StaticBar
        pageTitle={activityLogPageTitle}
        breadCrumbData={forActivityLog}
      />

      {statementData?.map((data, index) => {
        return (
          <Card
            className="mb-4 card_Shadow "
            key={index}
            style={{ width: "97%" }}
          >
            <ListGroup variant="flush">
              <ListGroup.Item className="list__ctrl">
                <div className="activity__icon">
                  <AiOutlineUser
                    className="circle-icon"
                    size="3em"
                    color="white"
                  />
                </div>
                <div className="activity__desc">
                  {data.remarks}
                  <p className="activity__date">{data.transactionDate}</p>
                </div>
                {data.debit !== null ? (
                  <div className="activity__amount" style={{ color: "red" }}>
                    NPR. {data.debit}{" "}
                  </div>
                ) : (
                  <div className="activity__amount">NPR. {data.credit} </div>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        );
      })}
    </>
  );
};

export default Activities;
