import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import jobHuntSlice from './jobHuntSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        jobHunt: jobHuntSlice
    }
});
export default store;