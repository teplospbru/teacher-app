import React, { FC, HTMLAttributes } from 'react';
import { useValue } from '../useValue';
import './SelectField.scss';

interface SelectFieldProps extends HTMLAttributes<HTMLInputElement> {
  answers?: string[];
  options: string[];
  index: number;
  secondIndex: number;
  id: string; // id инпута!
}

export const SelectField: FC<SelectFieldProps> = ({ answers, options, index, secondIndex, id }) => {
  const { value, setValue } = useValue(index, secondIndex, id);

  return (
    <select onChange={(e) => setValue(e.target.value)} value={value}>
      <option key={1} value={""}></option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
