import { FC } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";

import { Loading } from "./components";
import { Home, Profile, WalletsApp, MarketApp } from "./views";

import "./App.css";

const withAuth = (Component: FC) =>
  withAuthenticationRequired(Component, { onRedirecting: () => <Loading /> });
const AuthenticatedProfile = withAuth(Profile);
const AuthenticatedWalletsApp = withAuth(WalletsApp);
// const AuthenticatedMarketApp = withAuth(MarketApp);

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      {/* <NavBar /> */}
      <div className="container flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<AuthenticatedProfile />} />
          <Route path="/wallets/*" element={<AuthenticatedWalletsApp />} />
          <Route path="/market/*" element={<MarketApp />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
