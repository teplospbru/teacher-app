import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../../core/redux/store';
import { getCheckYourselfSubcollectionData, setQuestionAnswer } from '../../core/redux/actions';
import { CircleProgressBar } from '../CircleProgressBar/CircleProgressBar';
import { TestResultPage } from '../TestResultPage/TestResultPage';
import { ComplexQuestion } from '../Question/ComplexQuestion/ComplexQuestion';
import { Exercise, Input } from '../../core/api/types'
import './TestPage.scss';

export const TestPage = () => {
  const dispatch = useDispatch<Dispatch>();
  const { isLoading, exercises, answers, subcollections, currentIndex } = useSelector((state: RootState) => state.checkYourself.checkYourself);
  const [ isTesting, setTesting ] = useState(false); // флаг прохождения теста (после нажатия кнопки "проверь себя")
  const [test, setTest] = useState<Exercise<Input>>(exercises[answers.length]); // элемент с "вопросом"

  useEffect(() => {
    if(!exercises.length && isTesting) { // сделает запрос в базу, если ещё не делал
      dispatch(getCheckYourselfSubcollectionData());
    }
  }, [dispatch, isTesting, exercises.length]);

  useEffect(() => { // записывает в стейт следующий элемент с вопросом
    if(exercises.length) {
      setTest(exercises[answers.length]);
    }
  }, [answers.length, exercises])

  const nextQuestion = () => { // перейти к следующему вопросу
    dispatch(setQuestionAnswer(currentIndex + 1));
  }

  // компонент "введения"
  const Intro = () => {
    return (
      <>
        <p>
          Пройдите наш бесплатный онлайн-тест по английскому языку и определите свой уровень знаний, чтобы подобрать для
          себя подходящие учебные материалы.
        </p>
        <p>Тест состоит из 10 вопросов. Внимательно прочитайте и ответьте на каждый из них.</p>
        <p>
          По окончанию теста вы узнаете примерный уровень знания основных тем английского языка. Зная это, вы сможете
          найти материалы на нашем сайте, которые подойдут именно вам.
        </p>
        <p>*Обратите внимание, этот тест предназначен только для личного использования.</p>
        <button className="quest__button" onClick={ () => setTesting(true) }>Пройти Тест</button>

        <Link to="/admin" style={{ marginLeft: '20px' }}>
          Админка
        </Link>
      </>
    )
  }

  // компонент с вопросами
  const Testing = () => {

    if(isLoading) {
      return <>{ 'Loading...' }</>
    }

    return (
      <>
        <h3>Вопрос {`${answers.length + 1}/${exercises.length}`}</h3>
        <div className=''>
          <p><b>{subcollections[answers.length].title}.</b> {subcollections[answers.length].description}</p>
          { test && test.questions?.length && <ComplexQuestion 
            question={ (test.questions[0]).question } 
            inputs={ test.questions[0].inputs } 
            index={answers.length} 
            secondIndex={0}
          /> }
          <button className="quest__button" onClick={ () => nextQuestion() }>Следующий вопрос</button>
        </div>
      </>
    );
  }
  
  return (
    <div className="quest">
      {
        answers.length < 10 
          ? (<>
            <h2>Проверь свой уровень владения английским языком</h2>
            { exercises.length || isTesting ? <Testing /> : <Intro /> }
            </>)
          : (<>
              <h2>Результат тестирования</h2>
              <TestResultPage grade={answers.filter((item) => item).length} amount={answers.length} progress={Number((answers.filter((item) => item).length / answers.length).toFixed(1)) * 100}>
                <CircleProgressBar progress={Number((answers.filter((item) => item).length / answers.length).toFixed(1)) * 100} />
              </TestResultPage>
            </>)
      }
    </div>
  );
};
