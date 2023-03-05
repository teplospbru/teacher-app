import { useState } from 'react';

type ArrowClick = 'left' | 'right';

export const useCertificate = (certificates: string[]) => {
  const [certificate, setIndex] = useState<number>(0);

  const setCertificate = (arrowClick?: ArrowClick) => {
    if (arrowClick === 'left') {
      if (certificate > 0) {
        setIndex((certificate) => certificate - 1);
      } else {
        setIndex(certificates.length - 1);
      }
    }

    if (arrowClick === 'right') {
      if (certificate < certificates.length - 1) {
        setIndex((certificate) => certificate + 1);
      } else {
        setIndex(0);
      }
    }

    if (arrowClick === undefined) {
      setIndex(0);
    }
  };

  return { certificate, setCertificate };
};
