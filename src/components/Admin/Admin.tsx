import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminFullNameAndExpiryDate, getAdminSubcollectionsList } from '../../core/redux/actions';
import { Dispatch, RootState } from '../../core/redux/store';
import { AdminSubcollection } from '../AdminSubcollection/AdminSubcollection';
import '../../assets/svg/copy-40.svg';
import '../../assets/svg/warning-24.svg';
import './Admin.scss';
import { Warning } from '../Warning/Warning';
import { saveAdminStateInFirebase } from '../../core/api/utils';

export const Admin = () => {
  const dispatch = useDispatch<Dispatch>();
  const { subcollections, isLoading: isSubcollectionsLoading } = useSelector((state: RootState) => state.admin.admin);
  const { exercises, student, expiryDate, showLink } = useSelector((state: RootState) => state.admin.admin.task);
  const state = useSelector((state: RootState) => state.admin);
  const [fullName, setFullName] = useState<string>(student); // Стейт ФИО
  const [date, setExpiryDate] = useState<string>(expiryDate); // Стейт даты
  const [warning, setWarning] = useState<string>(''); // Сообщение об ошибке
  const [link, setLink] = useState<string>(''); // сгенерированная ссылка

  useEffect(() => {
    if (isSubcollectionsLoading) {
      // загружаем список "субколлекций", если флаг isLoading равен true
      dispatch(getAdminSubcollectionsList());
    }
  }, [dispatch, isSubcollectionsLoading]);

  // хендлер сообщения об ошибке
  const handleButtonClick = () => {
    if (fullName.length === 0) {
      setWarning('Заполните ФИО');
    } else if (date.length === 0) {
      setWarning('Выберите дату');
    } else if (!exercises.some((exercise) => exercise.questions !== undefined && exercise.questions?.length > 0)) {
      setWarning('Выберите хотя бы один вопрос');
    } else {
      setWarning('');
      dispatch(setAdminFullNameAndExpiryDate(fullName, date));
      saveAdminStateInFirebase(state, fullName, date).then((response) =>
        setLink(`${process.env.URL}/#/test/${response.hash}`)
      );
    }
  };

  return (
    <div className="admin">
      <h2>Все тесты</h2>
      <div className="admin__subcollections">
        {isSubcollectionsLoading
          ? 'Loading...'
          : subcollections.map(({ title, description, example, id }, index) => (
              <AdminSubcollection
                key={title}
                title={title}
                description={description}
                example={example}
                index={index}
                id={id}
              />
            ))}
      </div>

      <h2>Данные ученика</h2>
      <div className="student">
        <label htmlFor="fullName" className="student__label">
          ФИО:
          <input name="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}></input>
        </label>
        <label htmlFor="data" className="student__label">
          Выполнить до:
          <input name="data" type="date" value={date} onChange={(e) => setExpiryDate(e.target.value)}></input>
        </label>
        <div className="student__button">
          <button className="student__button-btn" onClick={() => handleButtonClick()}>
            Сгенерировать ссылку
          </button>
          {!!warning.length && <Warning>{warning}</Warning>}
        </div>
        {showLink && (
          <div className="student__link">
            <a rel="noreferrer" href={link} target="_blank">
              {link}
            </a>
            <div className="icon" onClick={() => navigator.clipboard.writeText(link)}>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#copy-40"></use>
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
