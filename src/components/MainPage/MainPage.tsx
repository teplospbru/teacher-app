import React, { RefObject, useEffect, useRef } from 'react';
import './MainPage.scss';
import '../../assets/svg/arrow-down.svg';
import { Link, animateScroll as scroll } from "react-scroll";
import { useLocation } from 'react-router-dom';

export const MainPage = () => {
    const aboutRef = useRef<null | HTMLDivElement>(null);
    const forTeacherRef = useRef<null | HTMLDivElement>(null);
    const forParentRef = useRef<null | HTMLDivElement>(null);
    const link = useLocation();

    const scrollTo = (ref: RefObject<null | HTMLDivElement>) => {
        if(ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" })
        }
    } 

    useEffect(() => {
        if(link.hash === '#about') {
            scrollTo(aboutRef)
        };
        if(link.hash === '#for-teacher') {
            scrollTo(forTeacherRef)
        };
        if(link.hash === '#for-parent') {
            scrollTo(forParentRef)
        };
    }, [link]);

    return (
        <>
            <section className='banner'>
                <div className='banner__container'>
                    <div className='banner__info'>
                        <h1>Фефилова Ольга Алексеевна</h1>
                        учитель английского языка
                    </div>
                    <div className='banner__img'>
                        <img src={ require('../../assets/img/Фефилова.png') } alt="фото Фефиловой" className='banner__img-img' />
                    </div>
                </div>
                <Link to="about"  smooth duration={500} className='banner__arrow' href='#about'>
                    <div className='icon'>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#arrow-down"></use>
                        </svg>
                    </div>
                </Link>
            </section>

            <section className='about'>
                <h2 id='about' ref={ aboutRef }>Обо Мне</h2>
                <div className='about__gallery'>
                    <div className='about__text'>
                        Я учитель английского языка высшей категории со стажем работы 13 лет. Имею успешный опыт исследовательской работы с учениками и подготовки их к ОГЭ. Но больше всего мне нравится работать с малышами начальной школы.
                    </div>
                    <div className='about__img-single'>
                        <div className='about__img-container'>
                            <img src={ require('../../assets/img/листья-1.jpg') } className="about__img-img" alt="" />
                        </div>
                    </div>
                    <div className='about__img-single'>
                        <div className='about__img-container'>
                            <img src={ require('../../assets/img/книга-1.jpg') } className="about__img-img" alt="" />
                        </div>
                    </div>
                    <div className='about__img-single'>
                        <div className='about__img-container'>
                            <img src={ require('../../assets/img/Ученица.png') } className="about__img-img" alt="" />
                        </div>
                    </div>
                    <div className='about__img-single'>
                        <div className='about__img-container'>
                            <img src={ require('../../assets/img/Мама и дочка.jpg') } className="about__img-img" alt="" />
                        </div>
                    </div>
                    <div className='about__img-double'>
                        <div className='about__img-container'>
                            <img src={ require('../../assets/img/Клава с флагом.jpg') } className="about__img-img" alt="" />
                        </div>
                    </div>
                    
                </div>
            </section>

            <section className='for-download'>
                <h2 id='for-teacher' ref={ forTeacherRef }>Учителям</h2>

                <div className='for-download__tiles'>
                    <div className='for-download__tile'>
                        <div className='for-download__img'>
                            <img src={ require('../../assets/img/Ученица.png') } className="for-download__img-img" alt="" />
                        </div>
                        Инновационный проект «Научное общество обучающихся»
                        <a href='#' className='for-download__button'>Скачать</a>
                    </div>
                    <div className='for-download__tile'>
                        <div className='for-download__img'>
                            <img src={ require('../../assets/img/Ученица.png') } className="for-download__img-img" alt="" />
                        </div>
                        Инновационный проект «Научное общество обучающихся»
                        <a href='#' className='for-download__button'>Скачать</a>
                    </div>
                    <div className='for-download__tile'>
                        <div className='for-download__img'>
                            <img src={ require('../../assets/img/Ученица.png') } className="for-download__img-img" alt="" />
                        </div>
                        Инновационный проект «Научное общество обучающихся»
                        <a href='#' className='for-download__button'>Скачать</a>
                    </div>
                    <div className='for-download__tile'>
                        <div className='for-download__img'>
                            <img src={ require('../../assets/img/Ученица.png') } className="for-download__img-img" alt="" />
                        </div>
                        Инновационный проект «Научное общество обучающихся»
                        <a href='#' className='for-download__button'>Скачать</a>
                    </div>
                </div>
            </section>

            <section className='for-download'>
                <h2 id='for-parent'  ref={ forParentRef }>Родителям</h2>

                <div className='for-download__tiles'>
                    <div className='for-download__tile'>
                        <div className='for-download__img'>
                            <img src={ require('../../assets/img/карандаши.png') } className="for-download__img-img" alt="" />
                        </div>
                        Инновационный проект «Научное общество обучающихся»
                        <a href='#' className='for-download__button'>Скачать</a>
                    </div>
                    <div className='for-download__tile'>
                        <div className='for-download__img'>
                            <img src={ require('../../assets/img/карандаши.png') } className="for-download__img-img" alt="" />
                        </div>
                        Инновационный проект «Научное общество обучающихся»
                        <a href='#' className='for-download__button'>Скачать</a>
                    </div>
                    <div className='for-download__tile'>
                        <div className='for-download__img'>
                            <img src={ require('../../assets/img/карандаши.png') } className="for-download__img-img" alt="" />
                        </div>
                        Инновационный проект «Научное общество обучающихся»
                        <a href='#' className='for-download__button'>Скачать</a>
                    </div>
                    <div className='for-download__tile'>
                        <div className='for-download__img'>
                            <img src={ require('../../assets/img/карандаши.png') } className="for-download__img-img" alt="" />
                        </div>
                        Инновационный проект «Научное общество обучающихся»
                        <a href='#' className='for-download__button'>Скачать</a>
                    </div>
                </div>
            </section>
        </>
    )
}