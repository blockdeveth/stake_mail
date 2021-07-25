import React from "react";
import { Contract } from "@ethersproject/contracts";
import { getDefaultProvider } from "@ethersproject/providers";
import { useQuery } from "@apollo/react-hooks";

import { Body, Button, Header, Image, Link } from "./components";
import logo from "./ethereumLogo.png";
import useWeb3Modal from "./hooks/useWeb3Modal";
import {
    HashRouter as Router,
    Switch,
    Route,
    Link as ReactLink
} from "react-router-dom";
import { addresses, abis } from "@project/contracts";
import GET_TRANSFERS from "./graphql/subgraph";
import Mail from "./Mail";
// import Admin from "./Admin";

function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
  return (
    <Button
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {!provider ? "Connect Wallet" : "Disconnect Wallet"}
    </Button>
  );
}

function App() {
  const { loading, error, data } = useQuery(GET_TRANSFERS);
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

  React.useEffect(() => {
    if (!loading && !error && data && data.transfers) {
      console.log({ transfers: data.transfers });
    }
  }, [loading, error, data]);

  return (
    <Router>
      <Switch>
        <div>
          <Header>
           <div> <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} /> </div>
            <div><ReactLink to={'/admin'} target='_blank' style={{ color: '#FFF' }}>Go to Admin</ReactLink>&#8203; &#8203; </div>
          </Header>
          <Body>

            <Route exact path="/" component={Mail} />
            {/* <Route exact path="/admin" component={Admin} /> */}

          </Body>
        </div>
      </Switch>
    </Router>
  );
}

export default App;