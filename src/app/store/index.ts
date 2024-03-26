import { userReduser } from "@entities/User";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        user: userReduser
    }
})

export * from './model/store.model'

