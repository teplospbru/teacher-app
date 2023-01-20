import React, { FC, useState, } from 'react';
import './Header.scss';
import '../../assets/svg/logo.svg';
import { Link, animateScroll as scroll  } from "react-scroll";
import { useNavigate } from 'react-router-dom';
import { BurgerButton } from '../BurgerButton/BurgerButton';

export const Header: FC = () => {
    const navigate = useNavigate();
    const [ isMobileMenuOpen, setMobileMenuOpen ] = useState(false);

    const clickLinkHandler = (link: string) => {
        setMobileMenuOpen(false);
        navigate(link);
    }

    return (
        <header className='header' id='#header'>
            <div className='header__container'>
                <Link to="/" href="/" className='icon' onClick={ () => navigate('/') }>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#logo"></use>
                    </svg>
                </Link>
                <ul className='header__navigation'>
                    <li><Link to="about" href="/#about" smooth duration={300} onClick={ () => clickLinkHandler('/#about') }>Обо мне</Link></li>
                    <li><Link to="for-teacher" href="/#for-teacher" smooth duration={400} onClick={ () => clickLinkHandler('/#for-teacher') }>Учителям</Link></li>
                    <li><Link to="for-parent" href="/#for-parent" smooth duration={500} onClick={ () => clickLinkHandler('/#for-parent') }>Родителям</Link></li>
                    <li><Link to="/quest" href="/quest" onClick={ () => clickLinkHandler('/quest') }>Проверь себя</Link></li>
                </ul>
                <BurgerButton isMobileMenuOpen={ isMobileMenuOpen } onBurgerClick={ () => setMobileMenuOpen(isMobileMenuOpen => !isMobileMenuOpen) } />
                {
                    isMobileMenuOpen && (
                        <ul className='header__mobile-navigation'>
                            <li><Link to="about" href="/#about" smooth duration={300} onClick={ () => clickLinkHandler('/#about') }>Обо мне</Link></li>
                            <li><Link to="for-teacher" href="/#for-teacher" smooth duration={400} onClick={ () => clickLinkHandler('/#for-teacher') }>Учителям</Link></li>
                            <li><Link to="for-parent" href="/#for-parent" smooth duration={500} onClick={ () => clickLinkHandler('/#for-parent') }>Родителям</Link></li>
                            <li><Link to="/quest" href="/quest" onClick={ () => clickLinkHandler('/quest') }>Проверь себя</Link></li>
                        </ul>
                    )
                }
            </div>
        </header>
    )
}