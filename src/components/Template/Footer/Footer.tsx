import React from 'react';
import './Footer.scss';
import { Link } from 'react-scroll';
import { useLocation, useNavigate } from 'react-router-dom';
import { email, name_surname, phone } from './../constants'

export const Footer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const redirectHandler = () => {
    //console.log(location)
    if (pathname === '/quest') {
      navigate('/');
    }
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__info">
          <div className="footer__logo">
            <Link to="header" href="header" smooth duration={500} className="icon" onClick={redirectHandler}>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#logo"></use>
              </svg>
            </Link>
          </div>
          <div className="footer__contacts">
            {name_surname}<br></br>
            Телефон: <a href={`tel:${phone}`}>{phone}</a>
            <br></br>
            Email: <a href={`mailto:${email}`}>{email}</a>
            <br></br>
          </div>
        </div>
        <div className="footer__disclaimer">
          © Все права защищены | 2023 г<br></br>Материалы, выложенные на сайте, являются интеллектуальной собственностью
          и доступны только для частного использования.
        </div>
      </div>
    </footer>
  );
};
