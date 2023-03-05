import React, { useState, HTMLAttributes, FC, useEffect } from 'react';
import './Carousel.scss';
import '../../assets/svg/arrow-left.svg';
import '../../assets/svg/arrow-right.svg';
import { CSSTransition } from 'react-transition-group';
import { useCertificate } from './useCertificate';

interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  certificates: string[];
}

export const Carousel: FC<CarouselProps> = ({ certificates }) => {
  const { certificate, setCertificate } = useCertificate(certificates);
  const [animate, setAnimate] = useState(false);

  // Хэндлеры нажатия по стрелкам слайдера
  const leftArrowClickHandler = () => {
    setAnimate(false);
    setTimeout(() => {
      setAnimate(true);
      setCertificate('left');
    }, 200);
  };

  const rightArrowClickHandler = () => {
    setAnimate(false);
    setTimeout(() => {
      setAnimate(true);
      setCertificate('right');
    }, 200);
  };

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 200);
  }, [certificate]);

  return (
    <div className="carousel">
      <CSSTransition in={animate} timeout={200} mountOnEnter unmountOnExit classNames="carousel__img" appear>
        <div className="carousel__img">
          <img src={certificates[certificate]} className="carousel__img-img"></img>
        </div>
      </CSSTransition>

      {/* Стрелка влево */}
      <div className="carousel__arrow left" onClick={leftArrowClickHandler}>
        <svg className="icon" aria-hidden="true">
          <use xlinkHref="#arrow-left"></use>
        </svg>
      </div>

      {/* Стрелка вправо */}
      <div className="carousel__arrow right" onClick={rightArrowClickHandler}>
        <svg className="icon" aria-hidden="true">
          <use xlinkHref="#arrow-right"></use>
        </svg>
      </div>
    </div>
  );
};
