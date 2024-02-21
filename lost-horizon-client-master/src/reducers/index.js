import { combineReducers } from "redux";

import warehouseReducer from "./warehouseReducer";
import userReducer from "./userReducer";
import searchReducer from "./searchReducer";

export default combineReducers({
  userStartedSearch: searchReducer,
  warehouse: warehouseReducer,
  currentUser: userReducer,
});
