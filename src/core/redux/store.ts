import checkYourselfSlice from './checkYourselfSlice';
import adminSlice from './adminSlice';
import { configureStore, ThunkDispatch, ThunkAction, PayloadAction, Action } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    admin: adminSlice,
    checkYourself: checkYourselfSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = ThunkDispatch<RootState, unknown, PayloadAction>;
export type AppDispatch = typeof store.dispatch;
