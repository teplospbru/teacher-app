import React, { ChangeEvent, FC, HTMLAttributes, useState } from 'react';
import './InputField.scss';

interface InputFieldProps extends HTMLAttributes<HTMLInputElement> {
  answers?: string[];
  id: string; // id инпута!
  onNonEmpyInput: (id: string) => void;
  onEmpyInput: (id: string) => void;
  onAnswer: (id: string, answer: string) => void;
}

export const InputField: FC<InputFieldProps> = ({ 
  onAnswer, 
  id, 
  onNonEmpyInput, 
  onEmpyInput 
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

  return <input type="text" value={value} onChange={handleClick} />;
};
