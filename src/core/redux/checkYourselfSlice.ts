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
        emptyFields: true,
    },
}

export const fetchCheckYourselfSubcollections = createAsyncThunk('admin/fetchCheckYourselfSubcollections', async () => {
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
    } catch(error) {
        // console.log(error)
    }
  });

export const checkYourselfSlice = createSlice({
    name: 'checkYourself',
    initialState,
    reducers: {
        // получаем данные из firebase
        setCheckYourselfSubcollectionsListData(state, action) { 
            state.checkYourself = action.payload;
        },
        // обрабатываем клик по инпуту в вопросе при прохождении тестов
        setInputAnswer(state, action) {
            const exercises = state.checkYourself.exercises as ExerciseWithState[];
            if(exercises.length) {
                const exercise = exercises[action.payload.index] as ExerciseWithState;
                if(exercise.questions) {
                    // ищем индекс инпута, в котором сработал useValue и записываем в элемент массива инпута с этим индексом
                    // введенный пользователем ответ
                    const index= exercise.questions[action.payload.secondIndex].inputs.findIndex((question) => question.id === action.payload.id);
                    exercise.questions[action.payload.secondIndex].inputs[index].answer = action.payload.answer as string;
                    // определяем, был ли ответ правильным и записываем его булево значение в массив ответов checkYourself.answers
                    const correctResult = exercise.questions[0].inputs
                        .map((input) => input.correctAnswers.includes(input.answer as string))
                        .every((item) => item === true);
                    state.checkYourself.answers[state.checkYourself.currentIndex - 1] = correctResult;
                    
                }
            }
        },
        setEmptyFieldsWarning(state, action) {
            state.checkYourself.emptyFields = action.payload;
        },
        // переходим к следующему вопросу
        setAnswer(state, action) { 
            state.checkYourself.currentIndex = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCheckYourselfSubcollections.fulfilled, (state, action) => {
            checkYourselfSlice.caseReducers.setCheckYourselfSubcollectionsListData(state, action);
        })
    }
})

export const { setCheckYourselfSubcollectionsListData, setAnswer, setInputAnswer, setEmptyFieldsWarning } = checkYourselfSlice.actions;
export default checkYourselfSlice.reducer;