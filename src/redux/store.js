import { createStore, combineReducers } from "redux";

import postsReducer from "./reducers/postsReducer";

const rootReducer = combineReducers({
  postsState: postsReducer,
});

const store = createStore(rootReducer);

export default store;
