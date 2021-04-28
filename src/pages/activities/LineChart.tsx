import { Card } from "react-bootstrap";
import { Line } from "react-chartjs-2";

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Aug",
    "Sep",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Sending/Earning",
      data: [
        33000,
        53000,
        85000,
        41000,
        44000,
        65000,
        76000,
        45000,
        67000,
        56000,
        60000,
        59000,
        60000,
      ],
      fill: false,
      borderColor: "#2713d6",
    },
    {
      label: "Saving Margin",
      data: [
        33000,
        25000,
        3500,
        51000,
        54000,
        76000,
        45000,
        67000,
        56000,
        60000,
        59000,
        60000,
      ],
      fill: false,
      borderColor: "#22f02c",
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
          max: 300000,
          stepSize: 60000,
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

function LineChart() {
  return (
    <Card>
      <Card.Body>
        <Line data={data} options={options} />
      </Card.Body>
    </Card>
  );
}

export default LineChart;
