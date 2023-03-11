import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getStateDoc } from '../../core/api/api';
import { setForStudentState } from '../../core/redux/actions';
import { Dispatch, RootState } from '../../core/redux/store';
import { ForStudentExercise } from '../Question/ForStudentExercise/ForStudentExercise';
import './StudentTest.scss';

export const StudentTest = () => {
  const dispatch = useDispatch<Dispatch>();
  const { student, expiryDate, exercises, currentIndex, answers } = useSelector((state: RootState) => state.forStudent.forStudent);
  const { hash } = useParams();
  const navigate = useNavigate();
  const [isNowExpiryDate, setNowExpiryDate] = useState(true);
  const [isTesting, setTesting] = useState(false); // флаг прохождения теста (после нажатия кнопки "проверь себя")

  useEffect(() => {
    const getState = async () => {
      if (hash) {
        if(exercises.length === 0) {
          try {
            const { text } = await getStateDoc(hash);
            const data = JSON.parse(text);
            dispatch(setForStudentState(data));
          } catch (error) {
            // console.log(error)
            navigate('/404');
          }
        }
      } else {
        navigate('/404');
      }
    };

    getState();
  }, [hash, dispatch, navigate, exercises.length]);

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

  const send = () => {console.log()}

  return (
    <div className="for-student">
      { answers.length && currentIndex === exercises.length 
        ? (<>
            <h2>Отправка преподавателю</h2>
            <p>Нажмите, чтобы отправить результат прохождения преподавателю.</p>
            <button className="quest__button" onClick={() => send()}>
              Отправить результат преподавателю
            </button>
          </>)
        : (<>
            <h2>Тестовое задание</h2>
            {isTesting ? <Testing /> : <Intro />}
          </>)
      }
    </div>
  );
};