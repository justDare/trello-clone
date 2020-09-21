import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Material
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import "./index.scss";
import DeleteList from "./DeleteList";
import Loader from "../../../components/Loader";
import * as ListsActions from "../Lists/actions";
import AddItem from "./AddItem";
import Items from "./Items";

export default function List(props) {
    const history = useHistory();
    const { list_id } = useParams();

    // Redux
    const list = useSelector((state) =>
        state.lists.lists.find((x) => x.ref["@ref"].id === list_id)
    );
    const lists_message = useSelector((state) => state.lists.message);
    const dispatch = useDispatch();

    useEffect(() => {
        if (lists_message === "List deleted!") {
            dispatch(ListsActions.clearListsMessage());
            history.goBack();
        }
    }, [lists_message, dispatch, history]);

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={() => history.goBack()}
            >
                Back To DashBoard
            </Button>
            {list ? (
                <div className="list">
                    <Typography variant="h4" gutterBottom>
                        {list.data.name}
                    </Typography>
                    <DeleteList listId={list.ref["@ref"].id} />
                    <AddItem listId={list.ref["@ref"].id} />
                    <Items listId={list.ref["@ref"].id} />
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
}
