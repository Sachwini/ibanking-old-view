import { getGraph } from "helper/GetData";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { useRecoilValue } from "recoil";
import { getSelectedAcc } from "state-provider/globalUserData";

function LineChart() {
  const [days, setDays] = useState<string[]>([]);
  const [balance, setBalance] = useState<any>([]);
  const selectedAccountDetails = useRecoilValue(getSelectedAcc);

  const loadDays: string[] = [];
  const loadBalance: number[] = [];
  const getChartData = async () => {
    try {
      const graphData = await getGraph(selectedAccountDetails.accountNumber);
      if (graphData) {
        graphData.forEach((x: any) => loadDays.push(x.day));
        graphData.forEach((x: any) => loadBalance.push(x.balance));
        setDays(loadDays);
        setBalance(loadBalance);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      getChartData();
    }
    return () => {
      isSubscribed = false;
    };
  }, []);

  const data = {
    labels: days,
    datasets: [
      {
        label: "Balance / Last 30 day",
        data: balance,
        fill: false,
        borderColor: "#22c42a",
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: "Account Activities",
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
    <Card className="card_Shadow">
      <Card.Body>
        {!days ? "" : <Line data={data} options={options} />}
      </Card.Body>
    </Card>
  );
}

export default LineChart;
