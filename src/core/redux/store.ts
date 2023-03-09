import checkYourselfSlice from './checkYourselfSlice';
import adminSlice from './adminSlice';
import { configureStore, ThunkDispatch, ThunkAction, PayloadAction, Action } from '@reduxjs/toolkit';
import forStudentSlice from './forStudentSlice';

export const store = configureStore({
  reducer: {
    admin: adminSlice,
    checkYourself: checkYourselfSlice,
    forStudent: forStudentSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = ThunkDispatch<RootState, unknown, PayloadAction>;
export type AppDispatch = typeof store.dispatch;
