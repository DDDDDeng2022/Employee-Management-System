import { configureStore, combineReducers } from "@reduxjs/toolkit";
import myProfileReducer from "./myProfileSlice";
const rootReducer = combineReducers({
    myProfile: myProfileReducer
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
