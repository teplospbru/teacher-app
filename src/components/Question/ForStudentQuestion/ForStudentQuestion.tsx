import React, { FC, HTMLAttributes, useEffect } from 'react';
import { Input, isRadioBtn, isSelect, isTextInput } from '../../../core/api/types';
import { useInput } from '../useInput';
import { InputField } from '../InputField/InputField';
import { RadioField } from '../RadioField/RadioField';
import { SelectField } from '../SelectField/SelectField';
import { useWarning } from '../useWarning';
import { useAnswer } from '../useAnswer';
import './ForStudentQuestion.scss';
import _ from 'lodash';
import { ForStudentExerciseState } from '../type';

interface ForStudentQuestionProps extends HTMLAttributes<HTMLDivElement> {
  question: string;
  inputs: Input[];
  index: number;
  secondIndex: number;
  state: ForStudentExerciseState[]
  setState: (state: ForStudentExerciseState[]) => void;
  id: string;
}

export const ForStudentQuestion: FC<ForStudentQuestionProps> = ({ question, inputs, index, secondIndex, state, setState, id }) => {
  const { inputSet } = useInput(question, inputs); // Строит объект, из которого мапится вопрос
  const { warning, setValueTrue, setValueFalse } = useWarning(inputSet); // флаг warning - поля в вопросе не заполнены
  const { answer, setAnswer } = useAnswer(inputSet); // Создаёт массив с ответами, введёнными в инпуты

  useEffect(() => {
    // здесь создаём новый объект типа ForStudentExerciseState  сравниваем его с предыдущим состоянием родительского компонента
    // если что-то поменялось, тогда меняем стейт родительского компонента (нужно, чтобы предотвратить циклический перерендеринг)
    const data = state.map((item) => {
        if(id === item.id) {
            return { ...item, warning, answers: answer, }
        }
        return { ...item }
    });

    const isStateChanged = _.isEqual(state, data);

    if(!isStateChanged) {
        setState(data);
    }
    
  }, [warning, answer, state, setState, id])

  return (
    <>
      <p>Вопрос {secondIndex + 1}</p>
      <div className="">
        <div className="question">
          {inputSet.map((item, i) => {
            if (typeof item === 'string') {
              return item;
            } else {
              if (isTextInput(item)) {
                return (
                  <InputField
                    key={i}
                    id={item.id}
                    onNonEmpyInput={() => setValueTrue(item.id)}
                    onEmpyInput={() => setValueFalse(item.id)}
                    onAnswer={setAnswer}
                  />
                );
              }
              if (isSelect(item)) {
                return (
                  <SelectField
                    options={item.options}
                    key={item.id}
                    id={item.id}
                    onNonEmpyInput={() => setValueTrue(item.id)}
                    onEmpyInput={() => setValueFalse(item.id)}
                    onAnswer={setAnswer}
                  />
                );
              }
              if (isRadioBtn(item)) {
                return (
                  <RadioField
                    key={item.id}
                    options={item.options}
                    question={question}
                    id={item.id}
                    onNonEmpyInput={() => setValueTrue(item.id)}
                    onEmpyInput={() => setValueFalse(item.id)}
                    onAnswer={setAnswer}
                  />
                );
              }
            }
          })}
        </div>
        <div className="" style={{ position: 'relative' }}>
        </div>
      </div>
    </>
  );
};
