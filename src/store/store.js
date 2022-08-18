import { configureStore } from "@reduxjs/toolkit";

// Reducers
import { authReducer, uiReducer } from "../reducers";

export function makeStore() {
  return configureStore({
    reducer: { auth: authReducer, ui: uiReducer },
  });
}

const store = makeStore();

export default store;
