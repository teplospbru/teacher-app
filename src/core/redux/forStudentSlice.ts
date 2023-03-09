import { ForStudentInitalState } from './types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ForStudentInitalState = {
    forStudent: {
        subcollections: [],
        isLoading: true,
        exercises: [],
        answers: [],
        currentIndex: 0,
        student: '',
        expiryDate: '',
    }
}

const forStudentSlice = createSlice({
    name: 'for-student',
    initialState,
    reducers: {
        setState(state, action) {
            state.forStudent = action.payload.data.forStudent;
        }
    }
});

export const { setState } = forStudentSlice.actions;
export default forStudentSlice.reducer;