import React, { useEffect, useState, } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../core/redux/store';
import { ForStudentExercise } from '../Question/ForStudentExercise/ForStudentExercise';
import emailjs from '@emailjs/browser';
import { createMessage } from './util';
import './StudentTest.scss';

export const StudentTest = () => {
  const { student, expiryDate, exercises, currentIndex, answers, hash } = useSelector((state: RootState) => state.forStudent.forStudent);
  const [isNowExpiryDate, setNowExpiryDate] = useState(true); // вышел ли срок исполнения теста
  const [isTesting, setTesting] = useState(false); // флаг прохождения теста (после нажатия кнопки "проверь себя")
  const [ isSended, setSended ] = useState(false); // флаг "письмо отправлено"

  useEffect(() => {
    if (expiryDate) {
      const date = new Date();
      const expiry = new Date(expiryDate);

      if (date > expiry) {
        setNowExpiryDate(true);
      } else {
        setNowExpiryDate(false);
      }
    }
  }, [expiryDate]);

  const Intro = () => {
    return expiryDate ? (
      <>
        {isNowExpiryDate ? (
          <>
            <p>ФИО: {student}</p>
            <p>Дата выполнения: {expiryDate} (просрочено)</p>
          </>
        ) : (
          <>
            <p>ФИО: {student}</p>
            <p>Дата выполнения: {expiryDate}</p>
            <button className="quest__button" onClick={() => setTesting(true)}>
              Пройти Тест
            </button>
          </>
        )}
      </>
    ) : null;
  };

  const Testing = () => {

    return (
      <ForStudentExercise />
    );
  };

  const send = () => {
    const doc = createMessage(exercises, student, expiryDate, hash!);

    emailjs.send(
      process.env.YOUR_SERVICE_ID!, 
      process.env.YOUR_1_TEMPLATE_ID!, 
      { message: doc}, 
      process.env.YOUR_PUBLIC_KEY!,
    ).then((result) => {
      setSended(true)
      console.log(result.text);
    }, (error) => {
      setSended(false)
      console.log(error.text);
    });
  }

  return (
    <div className="for-student">
      { answers.length && currentIndex === exercises.length 
        ? !isSended
          ? (<>
              <h2>Отправка преподавателю</h2>
              <p>Нажмите, чтобы отправить результат прохождения преподавателю.</p>
              <button className="quest__button" onClick={() => send()}>
                Отправить результат
              </button>
            </>)
          : (<>
              <h2>Отправка преподавателю</h2>
              <p>Письмо преподавателю отправлено</p>
            </>)
        : (<>
            <h2>Тестовое задание</h2>
            {isTesting ? <Testing /> : <Intro />}
          </>)
      }
    </div>
  );
};