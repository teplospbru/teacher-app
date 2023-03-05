import React, { ChangeEvent, FC, HTMLAttributes } from 'react';
import { useValue } from '../useValue';
import './SelectField.scss';

interface SelectFieldProps extends HTMLAttributes<HTMLInputElement> {
  answers?: string[];
  options: string[];
  index: number;
  secondIndex: number;
  id: string; // id инпута!
  onNonEmpyInput: (id: string) => void;
  onEmpyInput: (id: string) => void;
}

export const SelectField: FC<SelectFieldProps> = ({ answers, options, index, secondIndex, id, onNonEmpyInput, onEmpyInput  }) => {
  const { value, setValue } = useValue(index, secondIndex, id);

  const handleClick = (e: ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value;

    if(v.length) {
      onNonEmpyInput(id)
    } else {
      onEmpyInput(id)
    }

    setValue(e.target.value)
  }

  return (
    <select onChange={handleClick} value={value}>
      <option key={1} value={""}></option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
