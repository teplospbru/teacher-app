import React, { FC, HTMLAttributes } from 'react';
import { useValue } from '../useValue';
import './RadioField.scss';

interface RadioFieldProps extends HTMLAttributes<HTMLInputElement> {
  answers?: string[];
  options: string[];
  id: string; // id инпута!
  question: string;
  index: number;
  secondIndex: number;
}

export const RadioField: FC<RadioFieldProps> = ({ answers, options, id, question, index, secondIndex, }) => {
  const { value, setValue } = useValue(index, secondIndex, id);

  return (
    <div className="radio">
      {options.map((option) => (
        <div key={option}>
          <label htmlFor={question}>
            <input type="radio" name={question} value={option} checked={ option === value ? true : false } onChange={(e) => setValue(e.target.value)} />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};
