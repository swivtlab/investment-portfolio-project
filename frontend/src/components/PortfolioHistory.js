import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
import toggleLoading from "../helper";
import api from "../services/api";
import CashBalanceLineGraph from "./CashBalanceLineGraph";
import FilterButtons from "./common/FilterButtons";
import PositionLineGraph from "./PositionLineGraph";

const PortfolioHistory = (props) => {
  const [cashBalance, setCashBalance] = useState([]);
  const [position, setPosition] = useState([]);
  const [filterVal, setFilterVal] = useState({
    bar: props.bars[0],
    period: props.periods[3],
  });
  const [currency, setCurrency] = useState(props.cashType[0]);
  const [asset, setAsset] = useState(props.assetType[0]);
  const [cashType, setCashType] = useState([]);
  const [assetType, setAssetType] = useState([]);
  // initial form data
  const formData = {
    adviser: props.clientData.adviser,
    provider: props.clientData.provider,
    client: props.clientData.value,
    bar: filterVal.bar,
    filterCashCurrency: currency,
    filterAssetType: asset,
    period: filterVal.period,
  };

  // get portfolio history
  const getPortfolioHistory = async () => {
    return await api.post("/api/investment/client-portfolio-history", formData);
  };

  // cash balance history filter
  const handleChange = (e, data, type, filterType) => {
    toggleLoading(true);
    e.preventDefault();
    if (type === "bar") {
      formData.bar = data;
      setFilterVal({ ...filterVal, bar: data });
    } else {
      formData.period = data;
      setFilterVal({ ...filterVal, period: data });
    }
    if (filterType === "cash") {
      getCashHistory(formData);
    } else {
      getPositionHistory(formData);
    }
  };
  // change form data cashtype
  const handleCashTypeChange = (selectedOption) => {
    setCurrency(selectedOption.value);
    formData.filterCashCurrency = selectedOption.value;
    getCashHistory(formData);
  };
  // change form data assetType
  const handleAssetTypeChange = (selectedOption) => {
    setAsset(selectedOption.value);
    formData.filterAssetType = selectedOption.value;
    getPositionHistory(formData);
  };
  // cash history
  const getCashHistory = async (data) => {
    try {
      const res = await api.post(
        "/api/investment/client-portfolio-cash-history",
        data
      );
      if (res) {
        const cashBalanceHistory = [
          ...new Set(res.historyList.map((history) => ({
            date: history.date,
            cashBalance: history.cashBalances[0]
          })))
        ];
        setCashBalance(cashBalanceHistory);
        toggleLoading(false);
      }
    } catch (error) {
      console.log(error);
      toggleLoading(false);
    }
  };

  // position history
  const getPositionHistory = async (data) => {
    try {
      const res = await api.post(
        "/api/investment/client-portfolio-position-history",
        data
      );
      if (res) {
        const positionHistory = [
          ...new Set(res.historyList.map((history) => ({
            date: history.date,
            position: history.positionList.length
          })))
        ];
        setPosition(positionHistory);
        toggleLoading(false);
      }
    } catch (error) {
      console.log(error);
      toggleLoading(false);
    }
  };

  useEffect(() => {
    getPortfolioHistory()
      .then((res) => {
        if (res.historyList.length > 0) {
          const cashBalanceHistory = [
            ...new Set(
              res.historyList.map((history) => ({
                date: history.date,
                cashBalance: history.portfolio.cashBalances[0],
              }))
            ),
          ];
          const positionHistory = [
            ...new Set(
              res.historyList.map((history) => ({
                date: history.date,
                position: history.portfolio.positions.length,
              }))
            ),
          ];
          setCashBalance(cashBalanceHistory);
          setPosition(positionHistory);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const cashTypeObject = [
      ...new Set(props.cashType.map((type) => ({ value: type, label: type })))
    ];
    const assetTypeObject = [
      ...new Set(props.assetType.map((type) => ({ value: type, label: type }))),
    ];
    setCashType(cashTypeObject);
    setAssetType(assetTypeObject);
  }, [props.cashType, props.assetType]);

  return (
    <Row>
      <br />
      <h5>History</h5>
      <br />
      <Col md={6}>
        <div className="form-group">
          <label htmlFor="currency">Select Cash Type</label>
          <Select
            value={cashType ? cashType.value : cashType}
            options={cashType}
            onChange={handleCashTypeChange}
          />
        </div>
        <FilterButtons
          data={props.periods}
          type="period"
          filterType="cash"
          handleChange={handleChange}
        />
        {cashBalance.length > 0 ? (
          <CashBalanceLineGraph cashBalance={cashBalance} />
        ) : (
          ""
        )}
        <FilterButtons
          data={props.bars}
          type="bar"
          filterType="cash"
          handleChange={handleChange}
        />
      </Col>
      <Col md={6}>
        <div className="form-group">
          <label htmlFor="asset">Select Asset Type</label>
          <Select
            value={assetType ? assetType.value : assetType}
            options={assetType}
            onChange={handleAssetTypeChange}
          />
        </div>
        <FilterButtons
          data={props.periods}
          type="period"
          filterType="position"
          handleChange={handleChange}
        />
        {position.length > 0 ? <PositionLineGraph position={position} /> : ""}
        <FilterButtons
          data={props.bars}
          type="bar"
          filterType="position"
          handleChange={handleChange}
        />
      </Col>
    </Row>
  );
}

export default PortfolioHistory;