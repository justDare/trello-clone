import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Material
import Container from "@material-ui/core/Container";

import Appbar from "./Appbar";
import Lists from "./Lists";

export default function Dashboard(props) {
  return (
    <div>
      <Appbar />
      <Container style={{ paddingTop: "50px" }}>
        <Router>
          <Switch>
            <Route path="/dashboard" exact>
              <Lists />
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}
