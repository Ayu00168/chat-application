import "rsuite/dist/styles/rsuite-default.css";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Home from "./Pages/home/index";
import Signin from "./Pages/Signin";
import "./styles/main.scss";
import { ProfileProvider } from "./context/ProfileContex";

import { Switch } from "react-router";

function App() {
  return (
    <ProfileProvider>
      <Switch>
        <PublicRoute path="/signin">
          <Signin />
        </PublicRoute>
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </ProfileProvider>
  );
}

export default App;
