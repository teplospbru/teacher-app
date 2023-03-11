import { useEffect, useState } from 'react';
import { AnswersArr, InputSet } from './type';

export const useAnswer = (inputSet: InputSet) => {
  const [values, setValues] = useState<AnswersArr>([]);

  useEffect(() => {
    const arr: AnswersArr = [];
    if (inputSet.length) {
      inputSet.forEach((item) => {
        if (typeof item !== 'string') {
          arr.push({ id: item.id, answer: '' });
        }
      });
    }

    setValues([...arr]);
  }, [inputSet]);

  const setAnswer = (id: string, answer: string) => {
    const a = values.map((value) => {
      if (value.id === id) {
        return { ...value, answer };
      }
      return { ...value };
    });

    setValues(a);
  };

  const answer = [...values];

  return { answer, setAnswer };
};
