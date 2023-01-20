import React from 'react';
import './Footer.scss';
import { Link } from "react-scroll";
import { useLocation, useNavigate } from 'react-router-dom';

export const Footer = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const redirectHandler = () => {
        //console.log(location)
        if(pathname === '/quest') {
            navigate('/')
        }
    }

    return (
        <footer className='footer'>
            <div className='footer__container'>
                <div className='footer__info'>
                    <div className='footer__logo'>
                        <Link to="header" href="header" smooth duration={500} className='icon' onClick={ redirectHandler }>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#logo"></use>
                            </svg>
                        </Link>
                    </div>
                    <div className='footer__contacts'>
                        Фефилова Ольга Алексеевна<br></br>
                        Телефон: <a href="tel:+1234567890">+71234567890</a><br></br>
                        Email: <a href="mailto:fefilova@gmail.com">fefilova@gmail.com</a><br></br>
                    </div>
                </div>
                <div className='footer__disclaimer'>
                    © Все права защищены | 2023 г<br></br>Материалы, выложенные на сайте, являются интеллектуальной собственностью и доступны только для частного использования.
                </div>
            </div>
        </footer>
    )
}