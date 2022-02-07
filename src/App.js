import "rsuite/dist/styles/rsuite-default.css";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import "./styles/main.scss";

import { Switch } from "react-router";

function App() {
  return (
    <Switch>
      <PublicRoute path="/signin">
        <Signin />
      </PublicRoute>
      <PrivateRoute path="/">
        <Home />
      </PrivateRoute>
    </Switch>
  );
}

export default App;
