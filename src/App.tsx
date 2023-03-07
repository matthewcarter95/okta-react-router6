import { useCallback } from "react";
import "./App.css";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginCallback, Security } from "@okta/okta-react";
import { Login } from "./components/login";
import  Profile from './components/profile';

import Todos from "./components/todos";
import { RequiredAuth } from "./components/secureRoute";

function App() {
  const oktaAuth = new OktaAuth({
    issuer: process.env.REACT_APP_OKTA_ISSUER,
    clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
    redirectUri:
      process.env.REACT_APP_OKTA_BASE_REDIRECT_URI + "/callback",
  });

  const restoreOriginalUri = useCallback(
    async (_oktaAuth: OktaAuth, originalUri: string) => {
      window.location.replace(
        toRelativeUrl(originalUri || "/", window.location.origin)
      );
    },
    []
  );

  return (
    <Router>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <Routes>
          <Route path="/callback" element={<LoginCallback />} />
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/todos" element={<RequiredAuth />}>
            <Route path="" element={<Todos />} />
          </Route>
        </Routes>
      </Security>
    </Router>
  );
}

export default App;

