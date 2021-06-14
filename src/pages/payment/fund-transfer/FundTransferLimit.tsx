import { GetAccountNumber } from "helper/CustomerData";
import { apiResponse } from "models/apiResponse";
import { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { get } from "services/AjaxService";
import { formatLakh } from "services/numberService";
import "./index.css";
import { TransactionLimit } from "./model";

export const FundTransferLimit = () => {
  const accountNumber = GetAccountNumber();
  const profileType = "CustomerProfile";
  const [transactionLimitDetails, setTransactionLimitDetails] =
    useState<TransactionLimit>();

  useEffect(() => {
    let isSubscribed = true;
    const init = async () => {
      const res = await get<apiResponse<any>>(
        "api/limit?profileType=" +
          profileType +
          "&accountNumber=" +
          accountNumber
      );
      if (isSubscribed) {
        setTransactionLimitDetails(res.data.detail);
      }
    };
    init();
    return () => {
      isSubscribed = false;
    };
  }, []);
  return (
    <Card className="card_Shadow">
      <Card.Body>
        <Card.Title>Fund Transfer Limits</Card.Title>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>Description</th>
              <th className="right-aligned">Limits</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Maximum Amount per Transaction</td>
              <td className="right-aligned">
                {formatLakh(transactionLimitDetails?.perTransactionLimit!)}
              </td>
            </tr>
            <tr>
              <td>Maximum Transaction per day</td>
              <td className="right-aligned">
                {formatLakh(transactionLimitDetails?.dailyCountLimit!)}
              </td>
            </tr>
            <tr>
              <td>Remaining Transaction per day</td>
              <td className="right-aligned">
                {formatLakh(transactionLimitDetails?.remainingDailyCount!)}
              </td>
            </tr>
            <tr>
              <td>Maximum Transaction Amount per day</td>
              <td className="right-aligned">
                {formatLakh(transactionLimitDetails?.dailyAmountLimit!)}
              </td>
            </tr>
            <tr>
              <td>Remaining Transaction Amount per day</td>
              <td className="right-aligned">
                {formatLakh(transactionLimitDetails?.remainingDailyAmount!)}
              </td>
            </tr>
            <tr>
              <td>Maximum Transaction Amount per month</td>
              <td className="right-aligned">
                {formatLakh(transactionLimitDetails?.monthlyAmountLimit!)}
              </td>
            </tr>
            <tr>
              <td>Remaining Transaction Amount per month</td>
              <td className="right-aligned">
                {formatLakh(transactionLimitDetails?.remainingMonthlyAmount!)}
              </td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
