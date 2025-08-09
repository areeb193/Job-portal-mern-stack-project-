import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import jobSlice from './jobSlice';
import companySlice from './companySlice'
import jobHuntSlice from './jobHuntSlice';
import applicationSlice from './applicationSlice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web


const persistConfig = {
    key: 'root',
    storage,
    version: 1, // Optional: specify the version of your persisted state
};

const rootReducer = combineReducers({
    auth: authSlice,
    job: jobSlice,
    jobHunt: jobHuntSlice,
    company: companySlice,
    application: applicationSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export default store;