import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const PositionLineGraph = (props) => {
  const [dates, setDate] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (props.position.length > 0) {
      const date = [];
      const positionData = [];
      for (let i = 0; i < props.position.length; i++) {
        date.push(props.position[i].date);
        positionData.push(props.position[i].position);
      }
      setDate(date);
      setData(positionData);
    }
  }, [props.position]);
  return (
    <Line
      data={{
        labels: dates,
        datasets: [
          {
            axis: "x",
            label: "Total Position",
            data: data,
            fill: false,
            backgroundColor: [
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
            ],
            borderColor: [
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
            ],
            borderWidth: 1,
          },
        ],
      }}
    />
  );
};

export default PositionLineGraph;
