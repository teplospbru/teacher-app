import React, { FC, HTMLAttributes } from 'react';
import { useValue } from '../useValue';
import './InputField.scss';

interface InputFieldProps extends HTMLAttributes<HTMLInputElement> {
  answers?: string[];
  index: number;
  secondIndex: number;
  id: string; // id инпута!
}

export const InputField: FC<InputFieldProps> = ({ answers, index, secondIndex, id }) => {
  const { value, setValue } = useValue(index, secondIndex, id);

  return <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />;
};
