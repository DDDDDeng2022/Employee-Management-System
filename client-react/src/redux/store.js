import { configureStore, combineReducers } from "@reduxjs/toolkit";
import myProfileReducer from "./myProfileSlice.js";
import loginStateReducer from "./loginStateSlice";
import userReducer from "./userSlice";
const rootReducer = combineReducers({
    myProfile: myProfileReducer,
    loginState: loginStateReducer,
    user: userReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
