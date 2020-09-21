import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

// Material
import Container from "@material-ui/core/Container";

import Appbar from "./Appbar";
import Lists from "./Lists";
import List from "./List";
import * as actions from "./actions";

export default function Dashboard(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        return function () {
            dispatch(actions.clearLists());
        };
    }, []);

    return (
        <div>
            <Appbar />
            <Container style={{ paddingTop: "50px" }}>
                <Router>
                    <Switch>
                        <Route path="/dashboard" exact>
                            <Lists />
                        </Route>
                        <Route path="/dashboard/:list_id">
                            <List />
                        </Route>
                    </Switch>
                </Router>
            </Container>
        </div>
    );
}
