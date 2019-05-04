import React from "react";
import ReactDOM from "react-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

import { BrowserRouter } from "react-router-dom";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let userContext = sessionStorage.getItem("userContext");
    return <BrowserRouter>{userContext !== null ? <Home /> : <Login />}</BrowserRouter>;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);
