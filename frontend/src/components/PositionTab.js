import React, { useState } from "react";
import { Col, Tabs, Tab, Row } from "react-bootstrap";
import PieChart from "./PieChart";
import PositionTable from "./PositionTable";

const PositionTab = (props) => {
  const [assetTypes] = useState(props.assetType);
  return (
    <Row>
      <Col md={12} lg={8}>
        <br />
        <h5>Positions</h5>
        <br />
        <Tabs justify className="tab-section">
          {assetTypes.length > 0
            ? assetTypes.map((asset, index) => {
                return (
                  <Tab title={asset} eventKey={asset} key={index}>
                    <PositionTable positionData={props.positions} assetType={asset} />
                  </Tab>
                );
              })
            : ""}
        </Tabs>
      </Col>
      <Col md={12} lg={4}>
        <PieChart positionData={props.positions} assetType={assetTypes}/>
      </Col>
    </Row>
  );
}

export default PositionTab;