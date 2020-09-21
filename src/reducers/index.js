import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import listReducer from "./listReducer";
import itemReducer from "./itemReducer";

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    lists: listReducer,
    items: itemReducer,
});
