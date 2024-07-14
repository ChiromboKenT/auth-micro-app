import {configureStore} from "@reduxjs/toolkit";
import {api} from "../services/api";
import authReducer from "../features/auth/authSlice";
import {combineReducers} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});


export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
