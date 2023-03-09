import React, { ChangeEvent, FC, HTMLAttributes, useState } from 'react';
import { useValue } from '../useValue';
import './InputField.scss';

interface InputFieldProps extends HTMLAttributes<HTMLInputElement> {
  answers?: string[];
  index: number;
  secondIndex: number;
  id: string; // id инпута!
  onNonEmpyInput: (id: string) => void;
  onEmpyInput: (id: string) => void;
  onAnswer: (id: string, answer: string) => void;
}

export const InputField: FC<InputFieldProps> = ({ onAnswer, index, secondIndex, id, onNonEmpyInput, onEmpyInput }) => {
  // const { value, setValue } = useValue(index, secondIndex, id);
  const [ value, setValue ] = useState('')

  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;

    if(v.length) {
      onNonEmpyInput(id);
      onAnswer(id, v);
    } else {
      onEmpyInput(id)
    }

    setValue(e.target.value)
  }

  return <input type="text" value={value} onChange={handleClick} />;
};
