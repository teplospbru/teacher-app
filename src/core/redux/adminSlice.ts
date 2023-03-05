import { getSubcollectionList, getSubcollectionDocs } from './../api/api';
import { AdminInitalState } from './types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Subcollection } from './../api/types';

export const fetchSubcollections = createAsyncThunk('admin/fetchSubcollections', async () => {
  const response = await getSubcollectionList('grammar');
  return response;
});

export const fetchSubcollectionDocuments = createAsyncThunk(
  'admin/fetchSubcollectionDocuments',
  async (title: string) => {
    const response = await getSubcollectionDocs(title);
    return { data: response, title };
  }
);

const initialState: AdminInitalState = {
  admin: {
    grammar: {
      subcollections: [],
      isLoading: true,
      exercises: [],
    },
    task: {
      tests: [],
      student: '',
      expiryDate: '',
      showLink: false,
    },
  },
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setSubcollectionsListData(state, action) {
      state.admin.grammar.subcollections = action.payload;
      state.admin.grammar.exercises = (action.payload as Subcollection[]).map((item) => ({
        title: item.title,
        isLoading: true,
        isOpen: false,
      }));
      state.admin.grammar.isLoading = false;
      state.admin.task.tests = (action.payload as Subcollection[]).map((item) => ({ title: item.title, questions: [] }));
    },
    setSubcollectionDocs(state, action) {
      state.admin.grammar.exercises = state.admin.grammar.exercises.map((item) => {
        if (item.title === action.payload.title) {
          return { ...item, tests: action.payload.data, isLoading: false };
        }
        return { ...item };
      });
    },
    setQuestion(state, action) {
      state.admin.task.tests = state.admin.task.tests.map((item) => {
        if (item.title === action.payload.title && item.questions !== undefined) {
          return { ...item, questions: item.questions.concat({ id: action.payload.id }) };
        }
        return { ...item };
      });
      state.admin.task.showLink = false;
    },
    unsetQuestion(state, action) {
      state.admin.task.tests = state.admin.task.tests.map((item) => {
        if (item.title === action.payload.title && item.questions !== undefined) {
          const index = item.questions.findIndex((i) => i.id === action.payload.id);
          const arr = item.questions;
          if (arr !== undefined && index !== -1) {
            arr.splice(index, 1);
            return { ...item, questions: arr };
          }
        }
        return { ...item };
      });
      state.admin.task.showLink = false;
    },
    setSubcollectionOpen(state, action) {
      const index = state.admin.grammar.exercises.findIndex((item) => item.title === action.payload.title);
      state.admin.grammar.exercises = state.admin.grammar.exercises.map((item, i) => {
        if (i === index) {
          return { ...item, isOpen: action.payload.isOpen };
        }
        return { ...item };
      });
    },
    setFullNameAndExpiryDate(state, action) {
      state.admin.task.student = action.payload.student;
      state.admin.task.expiryDate = action.payload.expiryDate;
      state.admin.task.showLink = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSubcollections.fulfilled, (state, action) => {
      adminSlice.caseReducers.setSubcollectionsListData(state, action);
    }),
    builder.addCase(fetchSubcollectionDocuments.fulfilled, (state, action) => {
      adminSlice.caseReducers.setSubcollectionDocs(state, action);
    });
  },
});

export const { setQuestion, unsetQuestion, setSubcollectionOpen, setFullNameAndExpiryDate } = adminSlice.actions;
export default adminSlice.reducer;
