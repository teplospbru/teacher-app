import React, { FC, HTMLAttributes, useState } from 'react';
import './SimpleRadioField.scss';

interface SimpleRadioFieldProps extends HTMLAttributes<HTMLInputElement> {
  options: string[];
  question: string;
}

export const SimpleRadioField: FC<SimpleRadioFieldProps> = ({ options, question }) => {
  const [value, setValue] = useState('');

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
              onChange={(e) => setValue(e.target.value)}
            />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};
