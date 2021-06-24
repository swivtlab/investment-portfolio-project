import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import CashBalance from "../components/CashBalance";
import ClientFilter from "../components/ClientFilter";
import PortfolioHistory from "../components/PortfolioHistory";
import PositionTab from "../components/PositionTab";
import toggleLoading from "../helper";
import api from '../services/api';

const IndexPage = () => {
  const history = useHistory();

  const [providers, setProviders] = useState(null);
  const [advisers, setAdvisers] = useState(null);
  const [clients, setClients] = useState(null);
  const [periods, setPeriods] = useState(null);
  const [bars, setBars] = useState(null);
  const [cashType, setCashType] = useState([]);
  const [assetType, setAssetType] = useState([]);
  const [providerOptions, setProviderOptions] = useState([]);
  const [adviserOptions, setAdviserOptions] = useState([]);
  const [clientOptions, setClientOptions] = useState([]);
  const [clientPortfolio, setClientPortfolio] = useState(null);
  const [error, setError] = useState("");
  // get providers
  const getProviders = async () => {
    return await api.get("/api/investment/providers");
  };
  // get periods
  const getPeriods = async () => {
    return await api.get("/api/investment/periods");
  };
  // get advisers
  const getAdvisers = async (provider) => {
    try {
      const res = await api.get(
        `/api/investment/advisers?provider=${provider}`
      );
      if (res) {
        const options = [];
        if (res.advisers.length > 0) {
          for (let i = 0; i < res.advisers.length; i++) {
            options.push({
              value: res.advisers[i].account,
              label: res.advisers[i].account,
              provider: res.advisers[i].provider,
            });
          }
        }
        setAdviserOptions(options);
        toggleLoading(false);
      }
    } catch (err) {
      console.log(err);
      if (err.status === 403) {
        localStorage.removeItem("token");
        history.push("/");
      }
      toggleLoading(false);
      
    }
  };
  // get clients
  const getClients = async (provider, adviser) => {
    try {
      const res = await api.post("/api/investment/clients", {
        provider: provider,
        adviser: adviser,
      });
      if (res) {
        const options = [];
        if (res.clients.length > 0) {
          for (let i = 0; i < res.clients.length; i++) {
            options.push({
              value: res.clients[i].accountId,
              label: res.clients[i].accountName,
              provider: res.clients[i].provider,
              adviser: res.clients[i].adviser,
            });
          }
        }
        setClientOptions(options);
        toggleLoading(false);
      }
    } catch (err) {
      console.log(err);
      toggleLoading(false);
      if (err.status === 403) {
        localStorage.removeItem("token");
        history.push("/");
      }
    }
  };
  // get client portfolio
  const getClientPortfolio = async (provider, adviser, client) => {
    try {
      const res = await api.post("/api/investment/client-portfolio", {
        provider: provider,
        adviser: adviser,
        client: client,
      });
      if (res) {
        setClientPortfolio(res.portfolio);
        const cashTypes = [
          ...new Set(res.portfolio.cashBalances.map((cash) => cash.currency)),
        ];
        const assetTypes = [
          ...new Set(res.portfolio.positions.map((asset) => asset.assetType)),
        ];
        setCashType(cashTypes);
        setAssetType(assetTypes);
      }
      toggleLoading(false);
    } catch (error) {
      console.log(error);
      toggleLoading(false);
      if (error.status === 403) {
        localStorage.removeItem("token");
        history.push("/");
      }
    }
  };

  const handleProviderChange = (selectedOption) => {
    toggleLoading(true);
    setAdvisers(null);
    setAdviserOptions([]);
    setClients(null);
    setClientOptions([]);
    setClientPortfolio(null);
    setCashType([]);
    setAssetType([]);
    setProviders({ selectedOption });
    getAdvisers(selectedOption.label);
  };

  const handleAdviserChange = (selectedOption) => {
    toggleLoading(true);
    setClients(null);
    setClientOptions([]);
    setClientPortfolio(null);
    setCashType([]);
    setAssetType([]);
    setAdvisers({ selectedOption });
    getClients(selectedOption.provider, selectedOption.label);
  };

  const handleClientChange = (selectedOption) => {
    toggleLoading(true);
    setClientPortfolio(null);
    setCashType([]);
    setAssetType([]);
    setClients({ selectedOption });
    getClientPortfolio(
      selectedOption.provider,
      selectedOption.adviser,
      selectedOption.value
    );
  };

  // get providers and periods
  useEffect(() => {
    Promise.all([getProviders(), getPeriods()])
      .then((res) => {
        const providersData = [
          ...new Set(res[0].providers.map((data) => ({ value: data, label: data })))
        ];
        setProviderOptions(providersData);
        // separating periods & bars
        if (res[1].length > 0) {
          const period = [];
          const bar = [];
          for (let i = 0; i < res[1].length; i++) {
            period.push(res[1][i].period);
            bar.push(...res[1][i].bars);
          }
          const uniqueBars = [...new Set(bar)];
          setPeriods(period); // Periods
          setBars(uniqueBars); // Bars
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error.error);
        if (error.status === 403) {
          // check if token expired
          localStorage.removeItem("token");
          history.push("/");
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
    }
  }, [history]);

  return (
    <Container>
      <Row className="box">
        <h2>Investment Builder</h2>
        <br />
        {error ? (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        ) : (
          ""
        )}
        <ClientFilter
          providers={providers}
          advisers={advisers}
          clients={clients}
          providerOptions={providerOptions}
          adviserOptions={adviserOptions}
          clientOptions={clientOptions}
          handleProviderChange={handleProviderChange}
          handleAdviserChange={handleAdviserChange}
          handleClientChange={handleClientChange}
        />
      </Row>
      {clients && clientPortfolio ? (
        <Row className="box">
          <h2>{clients.selectedOption.label}&nbsp;Portfolio</h2>
          {clientPortfolio.cashBalances.length > 0 ? (
            <CashBalance cashBalances={clientPortfolio.cashBalances} />
          ) : (
            ""
          )}
          <hr />
          {clientPortfolio.positions.length > 0 && assetType.length > 0 ? (
            <PositionTab
              positions={clientPortfolio.positions}
              assetType={assetType}
            />
          ) : (
            ""
          )}
          <hr />
          {clients.selectedOption &&
          periods.length > 0 &&
          bars.length > 0 &&
          assetType.length > 0 &&
          cashType.length > 0 ? (
            <PortfolioHistory
              clientData={clients.selectedOption}
              periods={periods}
              bars={bars}
              assetType={assetType}
              cashType={cashType}
            />
          ) : (
            ""
          )}
        </Row>
      ) : (
        ""
      )}
    </Container>
  );
}

export default IndexPage;