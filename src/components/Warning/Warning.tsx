import React, { CSSProperties, FC, HTMLAttributes } from 'react';
import './Warning.scss';

interface WarningProps extends HTMLAttributes<HTMLDivElement> {
  warning: string;
  position?: string;
}

export const Warning: FC<WarningProps> = ({ warning, position }) => {
  const styles: CSSProperties = {
    position: 'absolute',
    left: '0',
    top: '-16px',
  };

  return (
    <div className="warning" style={position ? styles : {}}>
      <div className="icon">
        <svg aria-hidden="true">
          <use xlinkHref="#warning-24"></use>
        </svg>
      </div>
      {warning}
    </div>
  );
};
