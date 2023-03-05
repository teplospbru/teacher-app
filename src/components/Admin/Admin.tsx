import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubcolloctionsData, setAdminFullNameAndExpiryDate } from '../../core/redux/actions';
import { Dispatch, RootState } from '../../core/redux/store';
import { AdminSubcollection } from '../AdminSubcollection/AdminSubcollection';
import '../../assets/svg/copy-40.svg';
import '../../assets/svg/warning-24.svg';
import './Admin.scss';
import { Warning } from '../Warning/Warning';

export const Admin = () => {
  const dispatch = useDispatch<Dispatch>();
  const { subcollections, isLoading: isSubcollectionsLoading } = useSelector(
    (state: RootState) => state.admin.admin.grammar
  );
  const { tests, student, expiryDate, showLink } = useSelector((state: RootState) => state.admin.admin.task);
  const [fullName, setFullName] = useState<string>(student);
  const [date, setExpiryDate] = useState<string>(expiryDate);
  const [warning, setWarning] = useState<string>('');

  useEffect(() => {
    if (isSubcollectionsLoading) {
      dispatch(getSubcolloctionsData());
    }
  }, [dispatch, isSubcollectionsLoading]);

  const handleButtonClick = () => {
    if (fullName.length === 0) {
      setWarning('Заполните ФИО');
    } else if (date.length === 0) {
      setWarning('Выберите дату');
    } else if (!tests.some((test) => test.questions !== undefined && test.questions?.length > 0)) {
      setWarning('Выберите хотя бы один вопрос');
    } else {
      setWarning('');
      dispatch(setAdminFullNameAndExpiryDate(fullName, date));
    }
  };

  return (
    <div className="admin">
      <h2>Все тесты</h2>
      <div className="admin__subcollections">
        {isSubcollectionsLoading
          ? 'Loading...'
          : subcollections.map(({ title, description, example }, index) => (
              <AdminSubcollection key={title} title={title} description={description} example={example} index={index} />
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
          {warning.length > 0 && <Warning>{warning}</Warning>}
        </div>
        {showLink && (
          <div className="student__link">
            <a rel="noreferrer" href="http://localhost:8080/quest/c5e0424a8f42d5d4fa0c" target="_blank">
              http://localhost:8080/quest/c5e0424a8f42d5d4fa0c
            </a>
            <div
              className="icon"
              onClick={() => document.execCommand('http://localhost:8080/quest/c5e0424a8f42d5d4fa0c')}
            >
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
