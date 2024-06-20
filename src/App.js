/* eslint-disable no-unused-vars */
import "./App.css";
import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LicReg from "./Component/LicenceRegistration/LicReg";

import PrivateRoute from "./Component/PrivateRoute/PrivateRoute";
import Login from "./Component/Login/Login";
import OrderList from "./Component/OrderList/OrderList";
export const userContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState([]);
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <div>
        <Router>
          <Switch>
            <Route path="/login">
              <Login></Login>
            </Route>

            <PrivateRoute path="/admin">
              <LicReg></LicReg>
            </PrivateRoute>
            {/* <PrivateRoute path="/licenseKey">
              <ActivateLicenseKey></ActivateLicenseKey>
            </PrivateRoute>
            <PrivateRoute path="/smsLicenseKey">
              <ActivateSmsKey></ActivateSmsKey>
            </PrivateRoute> */}
            <PrivateRoute path="/users">
              <OrderList></OrderList>
            </PrivateRoute>

            <Route path="/">
              <Login></Login>
            </Route>
          </Switch>
        </Router>
      </div>
    </userContext.Provider>
  );
}

export default App;
