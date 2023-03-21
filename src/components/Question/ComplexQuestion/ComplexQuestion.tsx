import React, { FC, HTMLAttributes, useState } from 'react';
import { Input, isRadioBtn, isSelect, isTextInput } from '../../../core/api/types';
import { useInput } from '../useInput';
import { InputField } from '../InputField/InputField';
import { RadioField } from '../RadioField/RadioField';
import { SelectField } from '../SelectField/SelectField';
import { useWarning } from '../useWarning';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../../../core/redux/store';
import { setQuestionAnswer } from '../../../core/redux/actions';
import { Warning } from '../../Warning/Warning';
import { useAnswer } from '../useAnswer';
import { setQuestionInputAnswer } from '../../../core/redux/actions';
import './ComplexQuestion.scss';

interface ComplexQuestionProps extends HTMLAttributes<HTMLDivElement> {
  question: string;
  inputs: Input[];
  index: number;
  secondIndex: number;
}

export const ComplexQuestion: FC<ComplexQuestionProps> = ({ question, inputs, index, secondIndex }) => {
  const dispatch = useDispatch<Dispatch>();
  const { exercises, answers, subcollections, currentIndex } = useSelector(
    (state: RootState) => state.checkYourself.checkYourself
  );
  const { inputSet } = useInput(question, inputs); // Строит объект, из которого мапится вопрос
  const { warning, setValueTrue, setValueFalse } = useWarning(inputSet); // флаг warning - поля в вопросе не заполнены
  const { answer, setAnswer } = useAnswer(inputSet); // Создаёт массив с ответами, введёнными в инпуты
  const [isWarning, setWarning] = useState(false); // флаг отображения предупреждения о незаполненных полях

  const nextQuestion = () => {
    // перейти к следующему вопросу
    if (warning) {
      setWarning(true);
    } else {
      dispatch(setQuestionInputAnswer(index, secondIndex, answer));
      dispatch(setQuestionAnswer(currentIndex + 1));
    }
  };

  return (
    <>
      <h3>Вопрос {`${answers.length + 1}/${exercises.length}`}</h3>
      <div className="">
        <p>
          <b>{subcollections[answers.length].title}.</b> {subcollections[answers.length].description}
        </p>
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
          <button className="quest__button" onClick={() => nextQuestion()}>
            Следующий вопрос
          </button>
          {isWarning && <Warning position={{ top: '5px' }}>Заполните поля!</Warning>}
        </div>
      </div>
    </>
  );
};
