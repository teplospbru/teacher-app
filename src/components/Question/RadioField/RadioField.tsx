import React, { ChangeEvent, FC, HTMLAttributes, useState } from 'react';
import './RadioField.scss';

interface RadioFieldProps extends HTMLAttributes<HTMLInputElement> {
  answers?: string[];
  options: string[];
  id: string; // id инпута!
  question: string;
  onNonEmpyInput: (id: string) => void;
  onEmpyInput: (id: string) => void;
  onAnswer: (id: string, answer: string) => void;
}

export const RadioField: FC<RadioFieldProps> = ({
  onAnswer,
  options,
  id,
  question,
  onNonEmpyInput,
  onEmpyInput,
}) => {
  const [value, setValue] = useState('');

  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;

    if (v.length) {
      onNonEmpyInput(id);
      onAnswer(id, v);
    } else {
      onEmpyInput(id);
    }

    setValue(e.target.value);
  };

  return (
    <div className="radio">
      {options.map((option) => (
        <div key={option}>
          <label htmlFor={question}>
            <input
              type="radio"
              name={question}
              value={option}
              checked={option === value ? true : false}
              onChange={handleClick}
            />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};
