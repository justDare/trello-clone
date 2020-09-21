import axios from "axios";
import {
    DELETE_LIST,
    GET_ERRORS,
    ADD_ITEM,
    GET_ITEMS,
    CLEAR_ITEMS,
    DELETE_ITEM,
    UPDATE_ITEM,
} from "../../../types";
import { tokenConfig } from "../../../actions";

export const deleteList = (listId) => (dispatch, getState) => {
    let config = tokenConfig(getState);
    config.headers["list_id"] = listId;
    axios
        .delete("/.netlify/functions/list-delete", config)
        .then((response) =>
            dispatch({
                type: DELETE_LIST,
                payload: response.data,
            })
        )
        .catch((error) => {
            dispatch({
                type: GET_ERRORS,
                payload: {
                    response: error.response.data,
                    status: error.response.status,
                    id: "LIST DELETE ERROR",
                },
            });
        });
};

export const addItem = (itemName, listId) => (dispatch, getState) => {
    let config = tokenConfig(getState);
    config.headers["list_id"] = listId;
    axios
        .post("/.netlify/functions/item-create", { name: itemName }, config)
        .then((response) =>
            dispatch({
                type: ADD_ITEM,
                payload: response.data,
            })
        )
        .catch((error) => {
            dispatch({
                type: GET_ERRORS,
                payload: {
                    response: error.response.data,
                    status: error.response.status,
                    id: "ITEM ADD ERROR",
                },
            });
        });
};

export const getItems = (listId) => (dispatch, getState) => {
    let config = tokenConfig(getState);
    config.headers["list_id"] = listId;
    axios
        .get("/.netlify/functions/item-get-by-list", config)
        .then((response) =>
            dispatch({
                type: GET_ITEMS,
                payload: response.data,
            })
        )
        .catch((error) => {
            dispatch({
                type: GET_ERRORS,
                payload: {
                    response: error.response.data,
                    status: error.response.status,
                    id: "ITEMS GET ERROR",
                },
            });
        });
};

export const clearItems = () => {
    return {
        type: CLEAR_ITEMS,
    };
};

export const deleteItem = (itemId) => (dispatch, getState) => {
    let config = tokenConfig(getState);
    config.headers["item_id"] = itemId;
    axios
        .delete("/.netlify/functions/item-delete", config)
        .then((response) =>
            dispatch({
                type: DELETE_ITEM,
                payload: response.data,
            })
        )
        .catch((error) => {
            dispatch({
                type: GET_ERRORS,
                payload: {
                    response: error.response.data,
                    status: error.response.status,
                    id: "ITEM DELETE ERROR",
                },
            });
        });
};

export const updateItem = (itemId, done) => (dispatch, getState) => {
    let config = tokenConfig(getState);
    config.headers["item_id"] = itemId;
    axios
        .patch("/.netlify/functions/item-update", { done: done }, config)
        .then((response) =>
            dispatch({
                type: UPDATE_ITEM,
                payload: response.data,
            })
        )
        .catch((error) => {
            dispatch({
                type: GET_ERRORS,
                payload: {
                    response: error.response.data,
                    status: error.response.status,
                    id: "ITEM DELETE ERROR",
                },
            });
        });
};
