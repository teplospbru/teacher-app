import React, { CSSProperties, FC, HTMLAttributes } from 'react';
import './Warning.scss';

interface WarningProps extends HTMLAttributes<HTMLDivElement> {
  position?: CSSProperties;
}

export const Warning: FC<WarningProps> = ({ children, position, ...restProps }) => {
  const styles: CSSProperties = {
    position: 'absolute',
    left: '0',
    top: '-16px',
  };

  return (
    <div className="warning" {...restProps} style={{ ...styles, ...position }}>
      <div className="icon">
        <svg aria-hidden="true">
          <use xlinkHref="#warning-24"></use>
        </svg>
      </div>
      {children}
    </div>
  );
};
