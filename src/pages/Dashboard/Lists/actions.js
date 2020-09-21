import axios from "axios";
import {
    ADD_LIST,
    GET_ERRORS,
    LOAD_LISTS,
    CLEAR_LISTS_MESSAGE,
} from "../../../types";
import { tokenConfig } from "../../../actions";

export const addList = (listName) => (dispatch, getState) => {
    axios
        .post(
            "/.netlify/functions/list-create",
            { name: listName },
            tokenConfig(getState)
        )
        .then((response) =>
            dispatch({
                type: ADD_LIST,
                payload: response.data,
            })
        )
        .catch((error) => {
            dispatch({
                type: GET_ERRORS,
                payload: {
                    response: error.response.data,
                    status: error.response.status,
                    id: "LIST ADD ERROR",
                },
            });
        });
};

export const getLists = () => (dispatch, getState) => {
    axios
        .get("/.netlify/functions/list-get-by-user", tokenConfig(getState))
        .then((response) =>
            dispatch({
                type: LOAD_LISTS,
                payload: response.data,
            })
        )
        .catch((error) => {
            dispatch({
                type: GET_ERRORS,
                payload: {
                    response: error.response.data,
                    status: error.response.status,
                    id: "LISTS GET ERROR",
                },
            });
        });
};

export const clearListsMessage = () => {
    return {
        type: CLEAR_LISTS_MESSAGE,
    };
};
