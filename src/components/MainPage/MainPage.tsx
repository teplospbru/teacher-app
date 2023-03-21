import React, { RefObject, useEffect, useRef } from 'react';
import './MainPage.scss';
import '../../assets/svg/arrow-down.svg';
import { Link } from 'react-scroll';
import { useLocation } from 'react-router-dom';
import { Carousel } from '../Carousel/Carousel';
import { Cards } from '../Cards/Cards';
import { certificates, downloadCardsForParents, downloadCardsForTeachers } from './content';
import { name_surname } from '../Template/constants';

export const MainPage = () => {
  const aboutRef = useRef<null | HTMLDivElement>(null);
  const carouselRef = useRef<null | HTMLDivElement>(null);
  const forMaterialRef = useRef<null | HTMLDivElement>(null);
  const link = useLocation();

  const scrollTo = (ref: RefObject<null | HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (link.hash === '#about') {
      scrollTo(aboutRef);
    }
    if (link.hash === '#carousel') {
      scrollTo(carouselRef);
    }
    if (link.hash === '#for-material') {
      scrollTo(forMaterialRef);
    }
  }, [link]);

  return (
    <>
      <section className="banner">
        <div className="banner__container">
          <div className="banner__info">
            <h1>{name_surname}</h1>
            учитель английского языка
          </div>
          <div className="banner__img">
            <img src={require('../../assets/img/Фефилова.png')} alt={'фото: ' + name_surname} className="banner__img-img" />
          </div>
        </div>
        <Link to="about" smooth duration={500} className="banner__arrow" href="#about">
          <div className="icon">
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#arrow-down"></use>
            </svg>
          </div>
        </Link>
      </section>

      <section className="about">
        <h2 id="about" ref={aboutRef}>
          Обо Мне
        </h2>
        <div className="about__gallery">
          <div className="about__text">
            Я учитель английского языка высшей категории со стажем работы 17 лет. Имею успешный опыт исследовательской
            работы с учениками и подготовки их к ОГЭ. Но больше всего мне нравится работать с малышами начальной школы.
          </div>
          <div className="about__img-single">
            <div className="about__img-container">
              <img src={require('../../assets/img/листья-1.jpg')} className="about__img-img" alt="листья" />
            </div>
          </div>
          <div className="about__img-single">
            <div className="about__img-container">
              <img src={require('../../assets/img/книга-1.jpg')} className="about__img-img" alt="книга" />
            </div>
          </div>
          <div className="about__img-single">
            <div className="about__img-container">
              <img src={require('../../assets/img/Ученица.png')} className="about__img-img" alt="Ученица" />
            </div>
          </div>
          <div className="about__img-single">
            <div className="about__img-container">
              <img src={require('../../assets/img/Мама и дочка.jpg')} className="about__img-img" alt="Мама и дочка" />
            </div>
          </div>
          <div className="about__img-double">
            <div className="about__img-container">
              <img
                src={require('../../assets/img/Клава с флагом.jpg')}
                className="about__img-img"
                alt="Клава с флагом"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 id="carousel" ref={carouselRef}>
          Сертификаты
        </h2>

        <Carousel certificates={certificates} />
      </section>

      <section className="section">
        <h2 id="for-material" ref={forMaterialRef}>
          Материалы
        </h2>

        <Cards tiles={downloadCardsForParents} title="Родителям" />
      </section>

      <section className="section">
        <Cards tiles={downloadCardsForTeachers} title="Учителям" />
      </section>
    </>
  );
};
