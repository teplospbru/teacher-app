import React, { FC } from 'react';
import './AdminSubcollection.scss';
import '../../assets/svg/plus-24.svg';
import '../../assets/svg/minus-24.svg';
import { AdminQuestionsSet } from '../AdminQuestionsSet/AdminQuestionsSet';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../../core/redux/store';
import { ExerciseWithState } from '../../core/redux/types';
import { setAdminSubcollectionOpen } from '../../core/redux/actions';

interface AdminSubcollectionProps {
  title: string;
  description: string;
  example: string;
  index: number;
  id: string;
}

export const AdminSubcollection: FC<AdminSubcollectionProps> = ({ title, description, example, index, id }) => {
  const { exercises } = useSelector((state: RootState) => state.admin.admin);
  const exercise = exercises.find((item) => item.id === id) as ExerciseWithState;
  const dispatch = useDispatch<Dispatch>();

  // Хэндлер открытия/закрытия "вопросов" из данной "субколлекции"
  const clickHandler = () => {
    if (exercise.isOpen) {
      dispatch(setAdminSubcollectionOpen(id, false));
    } else {
      dispatch(setAdminSubcollectionOpen(id, true));
    }
  };

  return (
    <div className="admin__subcollection-item">
      <div className="admin__subcollection-header" onClick={clickHandler}>
        <div className="icon">
          <svg className="icon" aria-hidden="true">
            <use xlinkHref={exercise.isOpen ? '#minus-24' : '#plus-24'}></use>
          </svg>
        </div>
        <h4>{title}</h4>
      </div>
      {exercise.isOpen && (
        <>
          <div className="admin__subcollection-description">
            <p className="p-bold">{description}</p>
            {example && <p className="p-italic">Example: {example}</p>}
          </div>

          <AdminQuestionsSet title={title} index={index} id={id} />
        </>
      )}
    </div>
  );
};
