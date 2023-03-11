import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubcollectionDocuments } from '../../core/redux/actions';
import { Dispatch, RootState } from '../../core/redux/store';
import './AdminQuestionsSet.scss';
import { Question, Input } from '../../core/api/types';
import { AdminQuestion } from '../AdminQuestion/AdminQuestion';

interface AdminQuestionsSetProps {
  title: string;
  index: number;
  id: string;
}

// "вопросы" данной "субколлекции"
export const AdminQuestionsSet: FC<AdminQuestionsSetProps> = ({ title, index, id }) => {
  const dispatch = useDispatch<Dispatch>();
  const { exercises } = useSelector((state: RootState) => state.admin.admin);
  const exercise: { id: string; questions?: Question<Input>[]; isLoading: boolean } | undefined = exercises.find(
    (t) => t.id === id
  );

  useEffect(() => {
    if (exercise?.isLoading) {
      // Загружает "документы" данной "субколлекции", если флаг isLoading равен true
      dispatch(getSubcollectionDocuments(title));
    }
  }, [dispatch, title, exercise?.isLoading]);

  return (
    <div className="admin__subcollection-question-set">
      {exercise && exercise.isLoading
        ? 'Loading...'
        : exercise &&
          exercise.questions?.map(({ question, id, inputs }, secondIndex) => (
            <AdminQuestion
              key={question}
              question={question}
              inputs={inputs}
              id={id.toString()}
              title={title}
              secondIndex={secondIndex}
              index={index}
            />
          ))}
    </div>
  );
};
