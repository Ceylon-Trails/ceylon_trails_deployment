import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/index.js";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import provinceDetailReducer from "./provinceDetailSlice/index.js";

const persistConfig = {
    key : "root",
    storage,
    whitelist: ["auth"], 
}

const rootReducer = combineReducers({
   auth : authReducer,
   provinceDetail : provinceDetailReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer : persistedReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false
    })
})


export const persistor = persistStore(store)
export default store;