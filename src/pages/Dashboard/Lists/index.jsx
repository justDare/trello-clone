import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Material
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import "./index.scss";
import AddList from "./AddList";
import * as commonActions from "../../../actions";
import * as actions from "./actions";

export default function Lists(props) {
    // Redux
    const error = useSelector((state) => state.error);
    const lists = useSelector((state) => state.lists);
    const dispatch = useDispatch();

    // Local
    const [showError, setShowError] = useState("");

    useEffect(() => {
        if (error.id === "LIST ADD ERROR") {
            setShowError("Cannot add list.");
            dispatch(commonActions.clearErrors());
        }
    }, [error, dispatch]);

    useEffect(() => {
        dispatch(actions.getLists());
    }, [dispatch]);

    return (
        <div>
            <Typography variant="h3" gutterBottom>
                My Lists
            </Typography>
            {showError ? (
                <Alert severity="error" style={{ marginBottom: "25px" }}>
                    Error - {showError}
                </Alert>
            ) : (
                ""
            )}
            <AddList />
            <Grid container spacing={3} className="lists">
                {lists.lists.map((list) => {
                    return (
                        <Grid item xs={12} md={3} key={list.ref["@ref"].id}>
                            <Link to={`/dashboard/${list.ref["@ref"].id}`}>
                                <Paper className="list-item" elevation={10}>
                                    <Typography variant="h5" gutterBottom>
                                        {list.data.name}
                                    </Typography>
                                </Paper>
                            </Link>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}
