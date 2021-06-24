import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import IndexPage from "../../pages/Index";
import LoginPage from "../../pages/Login";
export default function Header() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/home"} component={IndexPage} />
        <Route exact path="/" component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
}