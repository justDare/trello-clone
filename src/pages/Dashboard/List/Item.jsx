import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

// Material
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import * as actions from "./actions";

Item.propTypes = {
    item: PropTypes.object,
};

Item.defaultProps = {
    item: {},
};

export default function Item(props) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(actions.deleteItem(props.item.ref["@ref"].id));
    };

    const handleUpdateDone = (done) => {
        dispatch(actions.updateItem(props.item.ref["@ref"].id, done));
    };

    return (
        <ListItem>
            <Checkbox
                checked={props.item.data.done}
                onChange={(e) => handleUpdateDone(e.target.checked)}
            />
            <ListItemText primary={props.item.data.name} />
            <ListItemSecondaryAction>
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={handleDelete}
                >
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}
