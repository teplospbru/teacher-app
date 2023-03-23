import { ForStudentInitalState, ExerciseWithState } from './types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ForStudentExerciseState } from './../../components/Question/type';
import { getStateDoc } from '../api/api';

const initialState: ForStudentInitalState = {
  forStudent: {
    subcollections: [],
    isLoading: true,
    exercises: [],
    answers: [],
    currentIndex: 0,
    student: '',
    expiryDate: '',
    hash: null,
  },
};

export const fetchState = createAsyncThunk('for-student/fetchState', async (hash: string) => {
  try {
    const { text } = await getStateDoc(hash);
    const data = JSON.parse(text);
console.log(data)
    return {data, hash};
  } catch (error) {
    // console.log(error)
  }
})

const forStudentSlice = createSlice({
  name: 'for-student',
  initialState,
  reducers: {
    // наполняем стейт
    setState(state, action) {
      state.forStudent = action.payload.data.forStudent;
      state.forStudent.hash = action.payload.hash;
    },
    // переходим к следующему вопросу
    setExersise(state, action) {
      state.forStudent.currentIndex = action.payload;
    },
    // запоминаем ответы из инпутов
    setInputValue(state, action) {
      // const arr = rememberInputValues(state, action.payload.index, action.payload.answers);
      const answers = action.payload.answers as Omit<ForStudentExerciseState, 'warning'>[];
      const currentIndex = action.payload.index;
      const exercises = state.forStudent.exercises;
      if (exercises.length) {
        const exercise = exercises[currentIndex] as ExerciseWithState;
        if (exercise.questions) {
            exercise.questions.forEach((question, index) => {
                // извлекаем из аргумента answers массив с ответами для данного вопроса
                const obj = answers.find((answer) => answer.id === question.id); 

                // ищем индекс инпута и записываем в элемент массива инпута с этим индексом
                // введенный пользователем ответ
                if(obj) {
                  exercise.questions[index].inputs.forEach((input) => {
                      const secondIndex = obj.answers.findIndex((answer) => answer.id === input.id);
                      if(obj.answers[secondIndex]) {
                        input.answer = obj.answers[secondIndex].answer as string;
                      }  
                  });
                }
            })
        }

        // определяем, был ли ответ правильным и записываем его булево значение в массив ответов forStudent.answers
        const correctResult = exercise.questions.map((question) => {
            return question.inputs
                .map((input) => input.correctAnswers.includes(input.answer as string))
                .every((item) => item === true);
        }).every((question) => question === true)

        state.forStudent.answers[state.forStudent.currentIndex] = correctResult;
      }
    }
  },
  extraReducers:(builder) => {
    builder.addCase(fetchState.fulfilled, (state, action) => {
      forStudentSlice.caseReducers.setState(state, action);
    })
  }
});

export const { setState, setExersise, setInputValue } = forStudentSlice.actions;
export default forStudentSlice.reducer;
