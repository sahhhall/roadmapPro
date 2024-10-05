import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import themeReducer from "./slices/themeSlice";
import authReducer from './slices/authSlice'
import adminReducer from './slices/adminSlice'

const rootReducer = combineReducers({
    theme: themeReducer,
    auth: authReducer,
    adminAuth: adminReducer
})

const persistConfig = {
    key: "root",
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch