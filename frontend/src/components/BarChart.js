import React  from "react";
import { Bar } from "react-chartjs-2";

const BarChart = (props) => {
  return (
    <Bar
      data={{
        labels: props.label,
        datasets: [
          {
            label: "Amount (USD)",
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 1,
            data: props.balance,
          },
        ],
      }}
      height={400}
      width={600}
      optons={{
        maintainAspectRatio: true,
      }}
    />
  );
}

export default BarChart;