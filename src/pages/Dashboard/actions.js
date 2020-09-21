import { LOGOUT, CLEAR_LISTS } from "../../types";

export const logout = () => {
    return {
        type: LOGOUT,
    };
};

export const clearLists = () => {
    return {
        type: CLEAR_LISTS,
    };
};
