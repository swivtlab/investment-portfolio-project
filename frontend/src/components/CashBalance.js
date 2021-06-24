import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import BarChart from "./BarChart";

const CashBalance = (props) => {
  const [barLabels, setLabels] = useState([]);
  const [cashBalance, setCashBalance] = useState([]);

  useEffect(() => {
    const cashAmount = [...new Set(props.cashBalances.map((cash) => cash.convertedAmount))];
    const labels = [...new Set(props.cashBalances.map((cash) => cash.currency))]; 
    setLabels(labels);
    setCashBalance(cashAmount);
  }, [props.cashBalances]);

  return (
    <Row>
      <br />
      <h5>Cash Balances</h5>
      <br />
      <Col md={12} lg={6}>
        <Table striped bordered hover responsive className="text-center">
          <thead>
            <tr>
              <th>Cash</th>
              <th>Balance</th>
              <th>Amount (USD)</th>
            </tr>
          </thead>
          <tbody>
            {props.cashBalances.length > 0 ? (
              props.cashBalances.map((client, index) => {
                return (
                  <tr key={index}>
                    <td>{client.currency}</td>
                    <td>{client.amount}</td>
                    <td>{client.convertedAmount}</td>
                  </tr>
                );
              })
            ) : (
              <tr className="text-center">
                <td colSpan={3}>No Data Available</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Col>
      <Col md={12} lg={6}>
        <BarChart label={barLabels} balance={cashBalance} />
      </Col>
    </Row>
  );
}

export default CashBalance;