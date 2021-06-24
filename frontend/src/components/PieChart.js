import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

const PieChart = (props) => {
  const [totalAssetQuantity, setAssetTotalQuantity] = useState([]);
  useEffect(() => {
    const totalQuantity = [];
    for (let i = 0; i < props.assetType.length; i++) {
      const total = [];
      for (let j = 0; j < props.positionData.length; j++) {
        if (props.positionData[j].assetType === props.assetType[i]) {
          total.push(props.positionData[j].qty);
        }
      }
      totalQuantity.push(total.reduce((a, b) => a + b, 0));
    }
    setAssetTotalQuantity(totalQuantity);
  }, [props.assetType, props.positionData]);
  return (
    <Doughnut
      data={{
        labels: props.assetType,
        datasets: [
          {
            label: "Asset Allocation",
            data: totalAssetQuantity,
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4
          },
        ],
      }}
    />
  );
}

export default PieChart;