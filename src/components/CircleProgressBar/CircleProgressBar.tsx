import React, { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import './CircleProgressBar.scss';
import { Transition } from 'react-transition-group';

interface CircleProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  progress: number;
}

type Color = 'green' | 'yellow' | 'red';

type TransitionStyles = { [id: string]: React.CSSProperties };

export const CircleProgressBar: FC<CircleProgressBarProps> = ({ progress }) => {
  const nodeRef = useRef(null);
  const [animation, setAnimation] = useState(false);
  const [transitionStyles, setTransitionStyles] = useState({
    entering: { strokeDashoffset: 565.48 },
    entered: { strokeDashoffset: 565.48 },
    exiting: { strokeDashoffset: 565.48 },
    exited: { strokeDashoffset: 565.48 },
  } as TransitionStyles);
  const [strokeColor, setStrokeColor] = useState<Color>('red');

  const duration = 300;

  const defaultStyle = {
    transition: `stroke-dashoffset ${duration}ms ease-in-out`,
    strokeDashoffset: 565.48,
  };

  useEffect(() => {
    const offset = Number((565.48 - (565.48 * progress) / 100).toFixed(2));

    setTransitionStyles({
      entering: { strokeDashoffset: offset },
      entered: { strokeDashoffset: offset },
      exiting: { strokeDashoffset: offset },
      exited: { strokeDashoffset: offset },
    });

    const color = () => {
      if (progress > 50 && progress <= 75) {
        return 'yellow';
      }

      if (progress > 75) {
        return 'green';
      }

      return 'red';
    };

    setStrokeColor(color);
    setAnimation(true);
  }, [progress]);

  return (
    <Transition nodeRef={nodeRef} timeout={duration} in={animation} appear>
      {(state) => (
        <div className="circle-progress-bar" data-pct={progress}>
          <svg id="svg" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle r="90" cx="100" cy="100" fill="transparent" strokeDasharray="565.48" strokeDashoffset="0"></circle>
            <circle
              id="bar"
              ref={nodeRef}
              r="90"
              cx="100"
              cy="100"
              fill="transparent"
              className={`stroke-${strokeColor}`}
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            ></circle>
          </svg>
        </div>
      )}
    </Transition>
  );
};
