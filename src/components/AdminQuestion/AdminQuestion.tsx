import React, { ChangeEvent, FC, HTMLAttributes } from 'react';
import { Input } from '../../core/api/types';
import { SimpleQuestion } from '../Question/SimpleQuestion/SimpleQuestion';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../../core/redux/store';
import './AdminQuestion.scss';
import { setAdminQuestion, unsetAdminQuestion } from '../../core/redux/actions';

interface AdminQuestionProps extends HTMLAttributes<HTMLDivElement> {
  question: string;
  inputs: Input[];
  id: string;
  title: string;
  index: number;
  secondIndex: number;
}

export const AdminQuestion: FC<AdminQuestionProps> = ({ question, id, inputs, title }) => {
  const dispatch = useDispatch<Dispatch>();
  const { exercises } = useSelector((state: RootState) => state.admin.admin.task);
  const test = exercises.find((item) => item.title === title);
  let checked;

  if (test && test?.questions) {
    checked = test.questions.some((item) => item.id === id);
  }

  // Хэндлер кликак по чекбоксу
  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {

    if (e.target.checked) {
      dispatch(setAdminQuestion(title, id));
    } else {
      dispatch(unsetAdminQuestion(title, id));
    }
  };

  return (
    <div className="admin-question">
      <div className="admin-question__checkbox">
        <input type="checkbox" onChange={(e) => handleClick(e)} checked={checked} />
      </div>
      <SimpleQuestion question={question} inputs={inputs} />
    </div>
  );
};
