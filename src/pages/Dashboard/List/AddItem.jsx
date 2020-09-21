import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

// Material
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./AddItem.scss";
import * as actions from "./actions";

AddItem.propTypes = {
    listId: PropTypes.string,
};

AddItem.defaultProps = {
    listId: "",
};

export default function AddItem(props) {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [error, setError] = useState(false);

    const handleChange = (value) => {
        setError(false);
        setName(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            setError(true);
            return;
        }
        setName("");
        dispatch(actions.addItem(name, props.listId));
    };

    return (
        <form
            className="add-item"
            style={{ paddingTop: "25px" }}
            onSubmit={handleSubmit}
        >
            <TextField
                style={{ paddingRight: "15px" }}
                placeholder="Add Item"
                value={name}
                error={error}
                onChange={(e) => handleChange(e.target.value)}
            />
            <Button variant="contained" color="primary" type="submit">
                Add
            </Button>
        </form>
    );
}
