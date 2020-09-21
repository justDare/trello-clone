import {
    ADD_ITEM,
    GET_ITEMS,
    CLEAR_ITEMS,
    DELETE_ITEM,
    UPDATE_ITEM,
} from "../types";

const initialState = {
    items: [],
    loaded: false,
    message: "",
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_ITEM:
            return {
                ...state,
                items: [...state.items, action.payload],
                message: "Item added!",
            };
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loaded: true,
            };
        case CLEAR_ITEMS:
            return {
                ...state,
                items: [],
                loaded: false,
            };
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(
                    (x) => x.ref["@ref"].id !== action.payload.ref["@ref"].id
                ),
            };
        case UPDATE_ITEM:
            return {
                ...state,
                items: state.items.map((item) => {
                    if (item.ref["@ref"].id === action.payload.ref["@ref"].id)
                        return action.payload;
                    else return item;
                }),
            };
        default:
            return state;
    }
}
