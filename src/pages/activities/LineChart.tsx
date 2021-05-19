import { useEffect, useState } from "react";
import { GetAccountNumber } from "helper/CustomerData";
import { Card } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { getGraph } from "services/BankServices";

function LineChart() {
  const accountNumber = GetAccountNumber();
  const [days, setDays] = useState<string[]>([]);
  const [balance, setBalance] = useState<any>([]);

  const loadDays: string[] = [];
  const loadBalance: number[] = [];
  const getChartData = async () => {
    try {
      if (accountNumber !== "") {
        const graphData = await getGraph(accountNumber);
        if (graphData) {
          graphData.forEach((x: any) => loadDays.push("day "+x.day));
          graphData.forEach((x: any) => loadBalance.push(x.balance));
          setDays(loadDays);
          setBalance(loadBalance);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isSubscribed = true;
    getChartData();
    return () => {
      isSubscribed = false;
    };
  }, []);

  const data = {
    labels: days, 
    datasets: [
      {
        label: "balance/day",
        data: balance,
        fill: false,
        borderColor: "#22f02c",
      },
      // {
      //   label: "Sending/Earning",
      //   data: [
      //     33000, 53000, 85000, 41000, 44000, 65000, 76000, 45000, 67000, 56000,
      //     60000, 59000, 60000,
      //   ],
      //   fill: false,
      //   borderColor: "#2713d6",
      // },
      // {
      //   label: "Saving Margin",
      //   data: [
      //     33000, 25000, 3500, 51000, 54000, 76000, 45000, 67000, 56000, 60000,
      //     59000, 60000,
      //   ],
      //   fill: false,
      //   borderColor: "#22f02c",
      // },
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
    <Card>
      <Card.Body>
        {!days ? "" : <Line data={data} options={options} />}
      </Card.Body>
    </Card>
  );
}

export default LineChart;
