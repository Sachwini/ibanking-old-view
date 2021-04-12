import { Line } from "react-chartjs-2"

function LineChart() {
  const datas = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Spending/Earning",
        data: [3, 2, 2, 1, 5], 
      },
    ],
  };

  return(
  <>
    <Line data={datas} />
  </>);
}

export default LineChart;
