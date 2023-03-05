import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestionInputAnswer } from '../../core/redux/actions';
import { Dispatch, RootState } from '../../core/redux/store';

/** Данный хук сохраняет в стор значение ввода в в инпуте при покидании компонента (например, при 
 * переходе к следующему вопросу или уходе на другую страницу). Значение ввода будет установлено в
 * инпут из стора при возращении в компонент
 */
export const useValue = (index: number, secondIndex: number, id: string) => {
    const {exercises} = useSelector((state: RootState) => state.checkYourself.checkYourself);
    const [value, setValue] = useState('');
    const ref = useRef(value);
    const dispatch = useDispatch<Dispatch>();
// debugger  
    useEffect(() => {
      // Записываем первоначальное значение value при маунте
      const exercise = exercises[index];
      if(exercise.questions) {
        const index = exercise.questions[secondIndex].inputs.findIndex((input) => input.id === id);
        if(exercise.questions[secondIndex].inputs[index].answer !== null) {
          setValue(exercise.questions[secondIndex].inputs[index].answer as string);
        }
      }
      
      return () => {
        dispatch(setQuestionInputAnswer(index, secondIndex, id, ref.current));
       }
    }, [])
  
    // сохраняем value между перерендерами, т.к. иначе оно не записывается в стор при анмаунте выше
    useEffect(() => {
      ref.current = value;
    }, [value]); 

    return { value, setValue }
}