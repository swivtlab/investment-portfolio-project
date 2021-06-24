import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const PositionTable = (props) => {
  const [positionData, setPositionData] = useState([]);
  useEffect(() => {
    const positions = [];
    for (let i = 0; i < props.positionData.length; i++) {
      if (props.positionData[i].assetType === props.assetType) {
        positions.push({
          symbol: props.positionData[i].symbol,
          currency: props.positionData[i].currency,
          exchange: props.positionData[i].exchange,
          marketValue: props.positionData[i].marketValue,
          price: props.positionData[i].price,
          qty: props.positionData[i].qty,
          convertedMarketValue: props.positionData[i].convertedMarketValue,
        });
      }
    }
    setPositionData(positions);
  }, [props.assetType, props.positionData]);

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Currency</th>
          <th>Exchange</th>
          <th>Market Price</th>
          <th>Market Value</th>
          <th>Market Value (USD)</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {
          positionData.length > 0 ?
            positionData.map((position, index) => {
              return (
                <tr key={index}>
                  <td>{position.symbol}</td>
                  <td>{position.currency}</td>
                  <td>{position.exchange}</td>
                  <td>{position.price.toFixed(2)}</td>
                  <td>{position.marketValue.toFixed(2)}</td>
                  <td>{position.convertedMarketValue.toFixed(2)}</td>
                  <td>{position.qty}</td>
                </tr>
              );
            })
            : <tr className="text-center">
                <td colSpan={6}>No Data Available</td>
              </tr>
        }
      </tbody>
    </Table>
  );
}

export default PositionTable;