import React from "react";
import { Col } from "react-bootstrap";
import Select from "react-select";

const ClientFilter = (props) => {
  return (
    <>
      <Col lg={4}>
        <h6>Providers</h6>
        <Select
          name="providers"
          value={props.providers ? props.providers.label : props.providers}
          options={props.providerOptions}
          onChange={props.handleProviderChange}
        />
      </Col>
      <Col lg={4}>
        <h6>Advisers</h6>
        <Select
          name="advisers"
          value={props.advisers ? props.advisers.label : props.advisers}
          options={props.adviserOptions ? props.adviserOptions : ""}
          onChange={props.handleAdviserChange}
        />
      </Col>
      <Col lg={4}>
        <h6>Clients</h6>
        <Select
          name="clients"
          value={props.clients ? props.clients.label : props.clients}
          options={props.clientOptions ? props.clientOptions : ""}
          onChange={props.handleClientChange}
        />
      </Col>
    </>
  );
}

export default ClientFilter;