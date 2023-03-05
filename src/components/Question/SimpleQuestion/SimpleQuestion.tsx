import React, { FC, HTMLAttributes } from 'react';
import { Input, isRadioBtn, isSelect, isTextInput } from '../../../core/api/types';
import { useInput } from '../useInput';
import { SimpleInputField } from '../SimpleInputField/SimpleInputField';
import { SimpleRadioField } from '../SimpleRadioField/SimpleRadioField';
import { SimpleSelectField } from '../SimpleSelectField/SimpleSelectField';
import './SimpleQuestion.scss';

interface SimpleQuestionProps extends HTMLAttributes<HTMLDivElement> {
  question: string;
  inputs: Input[];
}

export const SimpleQuestion: FC<SimpleQuestionProps> = ({ question, inputs }) => {
  const { inputSet } = useInput(question, inputs);

  return (
    <div className="question">
      {inputSet.map((item, i) => {
        if (typeof item === 'string') {
          return item;
        } else {
          if (isTextInput(item)) {
            return <SimpleInputField key={i} />;
          }
          if (isSelect(item)) {
            return <SimpleSelectField options={item.options} key={item.id} />;
          }
          if (isRadioBtn(item)) {
            return <SimpleRadioField key={item.id} options={item.options} question={question} />;
          }
        }
      })}
    </div>
  );
};
