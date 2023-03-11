import { getSubcollectionList, getSubcollectionDocs } from './../api/api';
import { AdminInitalState, ForStudentInitalState } from './types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Question, Subcollection, Input } from './../api/types';

const initialState: AdminInitalState = {
  admin: {
    subcollections: [],
    isLoading: true,
    exercises: [],
    task: {
      exercises: [],
      student: '',
      expiryDate: '',
      showLink: false,
    },
  },
};

export const fetchAdminSubcollections = createAsyncThunk('admin/fetchAdminSubcollections', async () => {
  try {
    const response = await getSubcollectionList('grammar');
    const exercises = response.map((item) => ({
      title: item.title,
      isLoading: true,
      isOpen: false,
      id: item.id,
    }));

    return {
      subcollections: [...response],
      isLoading: false,
      exercises,
      task: {
        exercises: [],
        student: '',
        expiryDate: '',
        showLink: false,
      },
    } as unknown as AdminInitalState;
  } catch (error) {
    // console.log(error)
  }
});

export const fetchSubcollectionDocuments = createAsyncThunk(
  'admin/fetchSubcollectionDocuments',
  async (title: string) => {
    const response = await getSubcollectionDocs(title);
    const exercise = response.map((item) => ({
      id: item.id,
      title,
      isLoading: false,
      isOpen: false,
      question: item.question,
      inputs: item.inputs,
    }));

    return { exercise, title };
  }
);

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    // получаем данные "субколлекций" из firebase
    setAdminSubcollectionsListData(state, action) {
      state.admin = action.payload;

      state.admin.task.exercises = (action.payload.subcollections as Subcollection[]).map((item) => ({
        title: item.title,
        id: item.id,
        questions: [],
      }));
    },

    // получаем "документы" определённой "субколлекции"
    setSubcollectionDocs(state, action) {
      state.admin.exercises = state.admin.exercises.map((item) => {
        if (item.title === action.payload.title) {
          return { ...item, questions: [...action.payload.exercise], isLoading: false };
        }
        return { ...item };
      });
    },

    // запоминает открыт ли раздел ("субколлекция") в админке
    setSubcollectionOpen(state, action) {
      const index = state.admin.exercises.findIndex((item) => item.id === action.payload.id);
      state.admin.exercises = state.admin.exercises.map((item, i) => {
        if (i === index) {
          return { ...item, isOpen: action.payload.isOpen };
        }
        return { ...item };
      });
    },

    // запоминаем чекнутый "вопрос" в админке
    setQuestion(state, action) {
      state.admin.task.exercises = state.admin.task.exercises.map((item) => {
        if (item.title === action.payload.title && item.questions !== undefined) {
          return { ...item, questions: item.questions.concat({ id: action.payload.id }) };
        }
        return { ...item };
      });
      state.admin.task.showLink = false; // нужно, чтобы сбрасывать отображение ссылки в админке при любом изменении
    },

    // забываем чекнутый "вопрос" в админке
    unsetQuestion(state, action) {
      state.admin.task.exercises = state.admin.task.exercises.map((item) => {
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
      state.admin.task.showLink = false; // нужно, чтобы сбрасывать отображение ссылки в админке при любом изменении
    },

    // запоминаем данные ученика
    setFullNameAndExpiryDate(state, action) {
      state.admin.task.student = action.payload.student;
      state.admin.task.expiryDate = action.payload.expiryDate;
      state.admin.task.showLink = true;
    },

    // Генерируем данные и записываем это в firebase
    setDataAndLinkInFirebase(state) {
      const arr: ForStudentInitalState = {
        forStudent: {
          subcollections: [],
          isLoading: true,
          exercises: [],
          answers: [],
          currentIndex: 0,
          student: state.admin.task.student,
          expiryDate: state.admin.task.expiryDate,
        },
      };
      state.admin.task.exercises.forEach((exercise) => {
        if (exercise.questions?.length) {
          arr.forStudent.exercises.push({
            title: exercise.title,
            id: exercise.id,
            questions: exercise.questions.map((question) => {
              const index = state.admin.exercises.findIndex((item) => item.title === exercise.title);
              return state.admin.exercises[index].questions.find((item) => item.id === question.id);
            }) as Question<Input>[],
          });
        }
      });
      state.admin.subcollections.forEach((subcollection) => {
        const exercise = state.admin.task.exercises.find((item) => subcollection.id === item.id);
        if (exercise && exercise.questions?.length) {
          arr.forStudent.subcollections.push(subcollection);
        }
      });
      state.admin.forSt = arr;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSubcollectionDocuments.fulfilled, (state, action) => {
      adminSlice.caseReducers.setSubcollectionDocs(state, action);
    });
    builder.addCase(fetchAdminSubcollections.fulfilled, (state, action) => {
      adminSlice.caseReducers.setAdminSubcollectionsListData(state, action);
    });
  },
});

export const { setQuestion, unsetQuestion, setSubcollectionOpen, setFullNameAndExpiryDate, setDataAndLinkInFirebase } =
  adminSlice.actions;
export default adminSlice.reducer;
