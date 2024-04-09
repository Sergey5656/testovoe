import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "./slices/carsSlice";

export const store = configureStore({
    reducer: {
        users: usersReducer,
    },
});