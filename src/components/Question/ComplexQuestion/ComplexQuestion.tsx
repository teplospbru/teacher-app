import React, { FC, HTMLAttributes } from 'react';
import { Input, isRadioBtn, isSelect, isTextInput } from '../../../core/api/types';
import { useInput } from '../useInput';
import { InputField } from '../InputField/InputField';
import { RadioField } from '../RadioField/RadioField';
import { SelectField } from '../SelectField/SelectField';
import './ComplexQuestion.scss';

interface ComplexQuestionProps extends HTMLAttributes<HTMLDivElement> {
  question: string;
  inputs: Input[];
  index: number;
  secondIndex: number;
}

export const ComplexQuestion: FC<ComplexQuestionProps> = ({ question, inputs, index, secondIndex }) => {
  const { inputSet } = useInput(question, inputs);

  return (
    <div className="question">
      {inputSet.map((item, i) => {
        if (typeof item === 'string') {
          return item;
        } else {
          if (isTextInput(item)) {
            return <InputField key={i} index={ index } secondIndex={ secondIndex } id={ item.id } />;
          }
          if (isSelect(item)) {
            return <SelectField options={item.options} key={item.id} index={ index } secondIndex={ secondIndex } id={ item.id } />;
          }
          if (isRadioBtn(item)) {
            return <RadioField key={item.id} options={item.options} question={question} id={item.id} index={ index } secondIndex={ secondIndex } />;
          }
        }
      })}
    </div>
  );
};
