import classNames from 'classnames';
import React, { FC, HTMLAttributes, useState, useRef } from 'react';
import { DownloadCard } from '../MainPage/content';
import './Cards.scss';

interface CardsProps extends HTMLAttributes<HTMLDivElement> {
  tiles: DownloadCard[];
  title: string;
}

export const Cards: FC<CardsProps> = ({ tiles, title }) => {
  const [showTile, setShowTile] = useState(true);
  const ref = useRef<null | HTMLDivElement>(null);

  const handleButtonClick = () => {
    if (showTile) {
      setShowTile(false);
    } else {
      setShowTile(true);

      if (ref?.current !== null) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      <h3 ref={ref}>{title}</h3>
      <div className="tiles">
        {tiles.map(({ title, image, download, id }) => (
          <div className={classNames('tiles__tile', { 'show-tile': showTile })} key={id}>
            <div className="tiles__img">
              <img src={image} className="tiles__img-img" alt={'Изображение на тему: ' + title} />
            </div>
            <div className="tiles__description">{title}</div>
            <a href={download} className="tiles__button" download={title}>
              Скачать
            </a>
          </div>
        ))}
      </div>

      <div className="tiles-hide">
        <button className="tiles-hide__button" onClick={handleButtonClick}>
          {showTile ? 'Показать все' : 'Свернуть'}
        </button>
      </div>
    </>
  );
};
