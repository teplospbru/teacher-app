import React, { FC, HTMLAttributes, useState } from 'react';
import './SimpleInputField.scss';

interface SimpleInputFieldProps extends HTMLAttributes<HTMLInputElement> {
  answers?: string[];
}

export const SimpleInputField: FC<SimpleInputFieldProps> = () => {
  const [value, setValue] = useState('');

  return <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />;
};
