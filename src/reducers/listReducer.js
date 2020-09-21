import {
    ADD_LIST,
    LOAD_LISTS,
    DELETE_LIST,
    CLEAR_LISTS_MESSAGE,
} from "../types";

const initialState = {
    lists: [],
    loaded: false,
    message: "",
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_LIST:
            return {
                ...state,
                lists: [...state.lists, action.payload],
                message: "List added!",
            };
        case LOAD_LISTS:
            return {
                ...state,
                lists: action.payload,
                loaded: true,
            };
        case DELETE_LIST:
            return {
                ...state,
                lists: state.lists.filter(
                    (x) => x.ref["@ref"].id !== action.payload.ref["@ref"].id
                ),
                message: "List deleted!",
            };
        case CLEAR_LISTS_MESSAGE:
            return {
                ...state,
                message: "",
            };
        default:
            return state;
    }
}
