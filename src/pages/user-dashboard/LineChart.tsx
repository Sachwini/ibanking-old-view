import { getGraph } from "helper/GetData";
import {
  balanceDetailDefaultValue,
  balanceDetailType,
} from "models/ChartModdels";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { useRecoilValue } from "recoil";
import { formatLakh } from "services/numberService";
import { getSelectedAcc } from "state-provider/globalUserData";
import { ChartCard } from "styling/for-dashboard/LineChartStyling";

function LineChart() {
  const [days, setDays] = useState<number[]>([]);
  const [balance, setBalance] = useState<number[]>([]);
  const [balanceDetails, setBalanceDetails] = useState<balanceDetailType>(
    balanceDetailDefaultValue
  );
  const selectedAccountDetails = useRecoilValue(getSelectedAcc);

  useEffect(() => {
    let isSubscribed = true;

    const getChartData = async () => {
      const graphData = await getGraph(selectedAccountDetails.accountNumber);
      if (isSubscribed && graphData) {
        setDays(graphData.dayList);
        setBalance(graphData.balanceList);
        setBalanceDetails(graphData.balanceDetail);
      }
    };

    getChartData();

    return () => {
      isSubscribed = false;
    };
  }, [selectedAccountDetails.accountNumber]);

  const data = {
    labels: days,
    datasets: [
      {
        label: "Balance",
        data: balance,
        fill: false,
        borderColor: "#22c42a",
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: "Transction Summary of Last 30 Days",
      fontSize: 16,
      fontWeight: "bold",
    },

    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 3000000,
            stepSize: 600000,
            callback: function (value: number) {
              if (value <= 0) {
                return 0;
              }
              return `${Math.abs(value) / 1000}k`;
            },
          },
        },
      ],
    },
  };

  return (
    <ChartCard className="card_Shadow">
      <Card.Body className="card_body">
        {!days ? "" : <Line data={data} options={options} redraw />}
      </Card.Body>
      <Card.Footer className="card_footer">
        <p className="balance_style">
          <span>Opening Balance</span> NPR.
          {formatLakh(balanceDetails.openingBalance)}
        </p>
        <p className="balance_style">
          <span>Closing Balance</span> NPR.
          {formatLakh(balanceDetails.closingBalance)}
        </p>
      </Card.Footer>
    </ChartCard>
  );
}

export default LineChart;
