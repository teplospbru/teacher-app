import { useEffect, useState } from 'react';
import { Input } from '../../core/api/types';
import { WarningsArr } from './type';

/**
 * Данный хук определяет, нужно ли будет показывать warning, что поля в вопросе
 * не заполнены. В переменной warning вернёт true, если хоть какое-то поле не заполнено.
 */
export const useWarning = (inputSet: (string | Input)[]) => {
  const [values, setValues] = useState<WarningsArr>([]);

  useEffect(() => {
    const arr: WarningsArr = [];
    if (inputSet.length) {
      inputSet.forEach((item) => {
        if (typeof item !== 'string') {
          arr.push({ id: item.id, value: false });
        }
      });
    }

    setValues([...arr]);
  }, [inputSet]);

  const setValueTrue = (id: string) => {
    const a = values.map((value) => {
      if (value.id === id) {
        return { ...value, value: true };
      }
      return { ...value };
    });

    setValues(a);
  };

  const setValueFalse = (id: string) => {
    const a = values.map((value) => {
      if (value.id === id) {
        return { ...value, value: false };
      }
      return { ...value };
    });

    setValues(a);
  };

  const warning = values.some((item) => !item.value);

  return { warning, setValueTrue, setValueFalse };
};
