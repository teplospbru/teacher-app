import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestionInputAnswer } from '../../core/redux/actions';
import { Dispatch, RootState } from '../../core/redux/store';

/** Данный хук сохраняет в стор значение ввода в в инпуте при покидании компонента (например, при
 * переходе к следующему вопросу или уходе на другую страницу). Значение ввода будет установлено в
 * инпут из стора при возращении в компонент
 */
export const useValue = (index: number, secondIndex: number, id: string) => {
  const { exercises } = useSelector((state: RootState) => state.checkYourself.checkYourself);
  const [value, setValue] = useState('');
  const ref = useRef(value);
  const dispatch = useDispatch<Dispatch>();
  // debugger
  useEffect(() => {
    // Записываем первоначальное значение value при маунте
    const exercise = exercises[index];
    if (exercise.questions) {
      const index = exercise.questions[secondIndex].inputs.findIndex((input) => input.id === id);
      if (exercise.questions[secondIndex].inputs[index].answer !== null) {
        setValue(exercise.questions[secondIndex].inputs[index].answer as string);
      }
    }

    return () => {
      // dispatch(setQuestionInputAnswer(index, secondIndex, id, ref.current));
    };
  }, []);

  // сохраняем value между перерендерами, т.к. иначе оно не записывается в стор при анмаунте выше
  useEffect(() => {
    ref.current = value;
  }, [value]);

  return { value, setValue };
};

// обрабатываем клик по инпуту в вопросе при прохождении тестов
// setInputAnswer(state, action) {
//     const exercises = state.checkYourself.exercises as ExerciseWithState[];
//     if(exercises.length) {
//         const exercise = exercises[action.payload.index] as ExerciseWithState;
//         if(exercise.questions) {
//             // ищем индекс инпута, в котором сработал useValue и записываем в элемент массива инпута с этим индексом
//             // введенный пользователем ответ
//             const index= exercise.questions[action.payload.secondIndex].inputs.findIndex((question) => question.id === action.payload.id);
//             exercise.questions[action.payload.secondIndex].inputs[index].answer = action.payload.answer as string;
//             // определяем, был ли ответ правильным и записываем его булево значение в массив ответов checkYourself.answers
//             const correctResult = exercise.questions[0].inputs
//                 .map((input) => input.correctAnswers.includes(input.answer as string))
//                 .every((item) => item === true);
//             state.checkYourself.answers[state.checkYourself.currentIndex - 1] = correctResult;

//         }
//     }
// },
