import React, { ChangeEvent, FC, HTMLAttributes } from 'react';
import { useValue } from '../useValue';
import './InputField.scss';

interface InputFieldProps extends HTMLAttributes<HTMLInputElement> {
  answers?: string[];
  index: number;
  secondIndex: number;
  id: string; // id инпута!
  onNonEmpyInput: (id: string) => void;
  onEmpyInput: (id: string) => void;
}

export const InputField: FC<InputFieldProps> = ({ answers, index, secondIndex, id, onNonEmpyInput, onEmpyInput }) => {
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

  return <input type="text" value={value} onChange={handleClick} />;
};
