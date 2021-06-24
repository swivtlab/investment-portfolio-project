import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const CashBalanceLineGraph = (props) => {
  const [dates, setDate] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (props.cashBalance.length > 0) {
      const date = [];
      const cashBalanceData = [];
      for (let i = 0; i < props.cashBalance.length; i++) {
        date.push(props.cashBalance[i].date);
        cashBalanceData.push(props.cashBalance[i].cashBalance.convertedAmount);
      }
      setDate(date);
      setData(cashBalanceData);
    }
  }, [props.cashBalance])
  return (
    <Line
      data={{
        labels: dates,
        datasets: [
          {
            axis: "y",
            label: "Cash Balance",
            data: data,
            fill: false,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 1,
          },
        ],
      }}
    />
  );
}

export default CashBalanceLineGraph;