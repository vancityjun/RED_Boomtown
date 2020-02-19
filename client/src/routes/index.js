import React, { Fragment, useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Items from "../pages/Items";
import Profile from "../pages/Profile";
import Share from "../pages/Share";
import ViewerProvider, { ViewerContext } from "../context/ViewerProvider";
import Header from "../components/Header/Header";

export default () => {
  const viewerContext = useContext(ViewerContext);
  const Routes = () => {
    if (viewerContext) {
      return (
        <Switch>
          <Route exact path="/items" component={Items} />
          <Route path="/share" component={Share} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/profile/:userid" component={Profile} />
          <Redirect to="/items" />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route exact path="/welcome" component={Home} />
          <Redirect to="/welcome" />
        </Switch>
      );
    }
  };
  return (
    <Fragment>
      {viewerContext ? <Header /> : null}
      <Routes />
    </Fragment>
  );
};
