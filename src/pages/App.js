import React from "react";

import Main from "./Main";
import Login from "./Login";

import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/login" />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/main" component={Main} />
          </Switch>
        </BrowserRouter>
      </div>
    );

    //return <BrowserRouter>{userContext !== null ? <Home /> : <Login />}</BrowserRouter>;
  }
}

//Private router function
const PrivateRoute = ({ component: Component, ...rest }) => {
  let userID = sessionStorage.getItem("userID");

  return <Route {...rest} render={props => (!userID ? <Redirect to={{ pathname: "/login", state: { from: props.location } }} /> : <Component {...props} />)} />;
};

export default App;
