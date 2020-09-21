import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

// Material
import List from "@material-ui/core/List";

import * as actions from "./actions";
import Item from "./Item";

Items.propTypes = {
    listId: PropTypes.string,
};

Items.defaultProps = {
    listId: "",
};

export default function Items(props) {
    // Redux
    const dispatch = useDispatch();
    const items = useSelector((state) => state.items);

    useEffect(() => {
        dispatch(actions.getItems(props.listId));
    }, [dispatch, props.listId]);

    useEffect(() => {
        return function () {
            dispatch(actions.clearItems());
        };
    }, []);

    return (
        <List style={{ paddingTop: "25px" }}>
            {items.items.map((item) => {
                return <Item item={item} key={item.ref["@ref"].id} />;
            })}
        </List>
    );
}
