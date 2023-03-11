import React, { FC, HTMLAttributes, useState } from 'react';
import './SimpleSelectField.scss';

interface SimpleSelectFieldProps extends HTMLAttributes<HTMLInputElement> {
  options: string[];
}

export const SimpleSelectField: FC<SimpleSelectFieldProps> = ({ options }) => {
  const [value, setValue] = useState('');

  return (
    <select onChange={(e) => setValue(e.target.value)} value={value}>
      <option key={1} value={''}></option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
