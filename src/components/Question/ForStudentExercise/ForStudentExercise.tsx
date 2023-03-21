import React, { FC, HTMLAttributes, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../../../core/redux/store';
import { setInputValuesForStudent, setNextExerciseForStudent } from '../../../core/redux/actions';
import { Warning } from '../../Warning/Warning';
import './ForStudentExercise.scss';
import { ForStudentQuestion } from '../ForStudentQuestion/ForStudentQuestion';
import { ForStudentExerciseState } from '../type';

interface ForStudentExerciseProps extends HTMLAttributes<HTMLDivElement> {
    index?: number;
}

export const ForStudentExercise: FC<ForStudentExerciseProps> = () => {
  const dispatch = useDispatch<Dispatch>();
  const { exercises, answers, subcollections, currentIndex } = useSelector(
    (state: RootState) => state.forStudent.forStudent
  );
const exercise = exercises[currentIndex]; // текущее "упражнение"
const [state, setState] = useState<ForStudentExerciseState[]>(exercise.questions.map((question) => ({
    id: question.id,
    answers: [],
    warning: false,
}))); // объект стейта данного компонента
const [isWarning, setWarning] = useState(false); // флаг отображения предупреждения о незаполненных полях

  const nextQuestion = () => {
    // перейти к следующему вопросу
    const w = state.some((item) => item.warning); // есть ли не заполненные поля
    if (w) {
        setWarning(true);
    } else {
        setWarning(false);
        const data = state.map((item) => ({ id: item.id, answers: [ ...item.answers ] })) as Omit<ForStudentExerciseState, 'warning'>[]
        dispatch(setInputValuesForStudent(currentIndex, data));
        dispatch(setNextExerciseForStudent(currentIndex + 1));
    }
  };

// Это нужно для сохранения содержимого инпутов в сторе (нужно разобраться с багом currentIndex + 1)
// для этого нужно создать другой экшн, похожий на setInputValuesForStudent, но который не записывает 
// новое значение currentIndex
//   useEffect(() => {
//     return () => {
//         const data = state.map((item) => ({ id: item.id, answers: [ ...item.answers ] })) as Omit<ForStudentExerciseState, 'warning'>[]
//         dispatch(setInputValuesForStudent(currentIndex, data));
//     }
//   }, [currentIndex, dispatch, state]);

  return (
    <>
      <h3>Упражнение {`${answers.length + 1}/${exercises.length}`}</h3>
      <div className="">
        <p>
          <b>{subcollections[answers.length].title}.</b> {subcollections[answers.length].description}
        </p>
        {exercise &&
            exercise.questions?.length &&
            exercise.questions.map((question, i) => (
                <ForStudentQuestion
                    question={question.question}
                    inputs={question.inputs}
                    index={answers.length}
                    secondIndex={i}
                    key={question.question}
                    state={state}
                    setState={setState}
                    id={question.id}
                />
            ))}
        
        <div className="" style={{ position: 'relative' }}>
          <button className="quest__button" onClick={() => nextQuestion()}>
            Следующее упражнение
          </button>
          {isWarning && <Warning position={{ top: '5px' }}>Заполните поля!</Warning>}
        </div>
      </div>
    </>
  );
};
