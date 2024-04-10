import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./model/rootReducer";

export const store = configureStore({ reducer: rootReducer })

export * from './model/store.model'

