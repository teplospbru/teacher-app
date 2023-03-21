import { getSubcollectionDocs } from './../api/api';
import { CheckYourselfInitalState, ExerciseWithState } from './types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSubcollectionList } from '../api/api';

const initialState: CheckYourselfInitalState = {
  checkYourself: {
    subcollections: [],
    isLoading: true,
    exercises: [],
    answers: [],
    currentIndex: 0,
  },
};

export const fetchState = createAsyncThunk(
  'check-yourself/fetchState',
  async () => {
    try {
      const response = await getSubcollectionList('check-yourself');
      const promises = response.map((item) => getSubcollectionDocs(item.title));
      const questions = await Promise.all(promises);
      const exercises = response.map((item, i) => ({
        title: item.description,
        isLoading: false,
        isOpen: false,
        questions: [...questions[i]],
      }));

      return {
        subcollections: [...response],
        isLoading: false,
        exercises,
        answers: [],
        currentIndex: 0,
        emptyFields: true,
      } as unknown as CheckYourselfInitalState;
    } catch (error) {
      // console.log(error)
    }
  }
);

// @ts-ignore
export const checkYourselfSlice = createSlice({
  name: 'checkYourself',
  initialState,
  reducers: {
    // получаем данные из firebase
    setState(state, action) {
      state.checkYourself = action.payload;
    },
    // обрабатываем клик по инпуту в вопросе при прохождении тестов
    setInputValue(state, action) {
      const exercises = state.checkYourself.exercises as ExerciseWithState[];
      if (exercises.length) {
        const answer: { id: string; answer: string }[] = [...action.payload.answer];
        answer.forEach((item) => {
          const exercise = exercises[action.payload.index] as ExerciseWithState;
          // debugger
          if (exercise.questions) {
            // ищем индекс инпута, в котором сработал useValue и записываем в элемент массива инпута с этим индексом
            // введенный пользователем ответ
            const index = exercise.questions[action.payload.secondIndex].inputs.findIndex(
              (input) => input.id === item.id
            );
            exercise.questions[action.payload.secondIndex].inputs[index].answer = item.answer as string;
            // определяем, был ли ответ правильным и записываем его булево значение в массив ответов checkYourself.answers
            const correctResult = exercise.questions[0].inputs
              .map((input) => input.correctAnswers.includes(input.answer as string))
              .every((item) => item === true);
            state.checkYourself.answers[state.checkYourself.currentIndex] = correctResult;
          }
        });
      }
    },
    // переходим к следующему вопросу
    setExersise(state, action) {
      state.checkYourself.currentIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchState.fulfilled, (state, action) => {
      checkYourselfSlice.caseReducers.setState(state, action);
    });
  },
});

export const { setState, setExersise, setInputValue } = checkYourselfSlice.actions;
export default checkYourselfSlice.reducer;
