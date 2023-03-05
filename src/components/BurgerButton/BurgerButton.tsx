import React, { FC } from 'react';
import '../../assets/svg/menu-40.svg';
import '../../assets/svg/cross-40.svg';
import './BurgerButton.scss';

interface BurgerButtonProps {
  isMobileMenuOpen: boolean;
  onBurgerClick: () => void;
}

export const BurgerButton: FC<BurgerButtonProps> = ({ isMobileMenuOpen, onBurgerClick }) => {
  return (
    <button className="menu-button" onClick={onBurgerClick}>
      <div className="menu-button__icon">
        <svg className="icon" aria-hidden="true">
          <use xlinkHref={isMobileMenuOpen ? '#cross-40' : '#menu-40'}></use>
        </svg>
      </div>
    </button>
  );
};
