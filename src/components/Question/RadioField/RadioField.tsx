import React, { ChangeEvent, FC, HTMLAttributes } from 'react';
import { useValue } from '../useValue';
import './RadioField.scss';

interface RadioFieldProps extends HTMLAttributes<HTMLInputElement> {
  answers?: string[];
  options: string[];
  id: string; // id инпута!
  question: string;
  index: number;
  secondIndex: number;
  onNonEmpyInput: (id: string) => void;
  onEmpyInput: (id: string) => void;
}

export const RadioField: FC<RadioFieldProps> = ({ answers, options, id, question, index, secondIndex, onNonEmpyInput, onEmpyInput }) => {
  const { value, setValue } = useValue(index, secondIndex, id);

  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;

    if(v.length) {
      onNonEmpyInput(id)
    } else {
      onEmpyInput(id)
    }

    setValue(e.target.value)
  }

  return (
    <div className="radio">
      {options.map((option) => (
        <div key={option}>
          <label htmlFor={question}>
            <input type="radio" name={question} value={option} checked={ option === value ? true : false } onChange={handleClick} />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};
