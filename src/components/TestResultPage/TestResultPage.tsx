import React, { FC, PropsWithChildren, useState } from 'react';
import './TestResultPage.scss';
import { Warning } from '../Warning/Warning';

interface TestResultPageProps extends PropsWithChildren {
  grade: number;
  amount: number;
  progress: number;
}

export const TestResultPage: FC<TestResultPageProps> = ({ children, grade, amount, progress }) => {
  const [warning, setWarning] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const getColor = () => {
    if (progress > 50 && progress <= 75) {
      return 'yellow';
    }

    if (progress > 75) {
      return 'green';
    }

    return 'red';
  };

  const getText = () => {
    if (progress >= 0 && progress <= 20) {
      return (
        <p>
          Уровень знаний по теме теста недостаточный. Но данный тест оценивает только ваше знание грамматики английского
          языка. Для того, чтобы оценить общий уровень английского необходимо проверить также навык чтения, аудирования,
          письма и устной речи.
        </p>
      );
    }

    if (progress > 20 && progress <= 50) {
      return (
        <p>
          Вам знакомы азы английского языка. Скорее всего, Вы только начали изучать английский или обладаете остаточными
          знаниями языка со времен школы. Вы умеете читать и писать, знаете алфавит, можете представиться и сообщить
          самую простую информацию о себе на английском. Но Ваших знаний совершенно недостаточно для общения в типичных
          жизненных ситуациях.
        </p>
      );
    }

    if (progress > 50 && progress <= 80) {
      return (
        <>
          <p>
            {' '}
            Поздравляем! Вы хорошо знаете тему, но есть вопросы, которые необходимо проработать. Данный тест оценивает
            только ваше знание грамматики английского языка. Для того, чтобы оценить общий уровень английского
            необходимо проверить также навык чтения, аудирования, письма и устной речи.
          </p>
          <p>Это не плохо, но я вам рекомендую подтянуть ваши знания.</p>
        </>
      );
    }

    return (
      <p>
        Поздравляем! У вас высокий уровень знаний по теме теста! Но данный тест оценивает только ваше знание грамматики
        английского языка. Для того, чтобы оценить общий уровень владения языком необходимо проверить также навык
        чтения, аудирования, письма и устной речи.
      </p>
    );
  };

  const handleButtonClick = () => {
    return null;
  };

  return (
    <>
      {children}
      <p className="text-result">
        Вы ответили правильно на <span className={`text-color-${getColor()}`}>{grade}</span> из <span>{amount}</span>{' '}
        вопросов.
      </p>
      {getText()}
      <p>
        Обратиться за консультацией по поводу допущенных вами ошибок с их разбором можно по адресу{' '}
        <a href="mailto:fefilova@gmail.com">fefilova@gmail.com</a>
      </p>
      <h3>Получить рекомендации от преподавателя</h3>
      <p className="">
        Введите свой email, и мы бесплатно отправим вам подробный разбор каждой вашей ошибки, а также посоветуем, как не
        допускать подобных ошибок в будущем.
      </p>
      <div className="email">
        <input name="fullName" type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <div className="email__button">
          <button className="email__button-btn" onClick={() => handleButtonClick()}>
            Отправить письмо преподавателю
          </button>
          {warning.length > 0 && <Warning>Отправить email</Warning>}
        </div>
      </div>
    </>
  );
};
