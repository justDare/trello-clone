import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

// Material
import Button from "@material-ui/core/Button";

import * as actions from "./actions";

DeleteList.propTypes = {
    listId: PropTypes.string,
};

DeleteList.defaultProps = {
    listId: "",
};

export default function DeleteList(props) {
    // Redux
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(actions.deleteList(props.listId));
    };

    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleDelete}
            >
                Delete List
            </Button>
        </div>
    );
}
