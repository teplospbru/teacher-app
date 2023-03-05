import phoneBox from '../../assets/img/phone-box-1.jpg';
import woman1 from '../../assets/img/woman-1.jpg';
import woman2 from '../../assets/img/woman-2.jpg';
import teacher from '../../assets/img/teacher-1.jpg';

import doc1 from '../../assets/docx/recommendations-1.doc';
import doc2 from '../../assets/docx/recommendations-2.doc';
import doc3 from '../../assets/docx/recommendations-3.docx';
import doc4 from '../../assets/docx/recommendations-4.docx';

import girl from '../../assets/img/girl-2.jpg';
import flags from '../../assets/img/flags.jpg';
import hp from '../../assets/img/harry-potter.jpg';
import abc from '../../assets/img/abc.jpg';

import doc5 from '../../assets/docx/recommendations-5.doc';
import doc6 from '../../assets/docx/recommendations-6.docx';
import doc7 from '../../assets/docx/recommendations-7.doc';
import doc8 from '../../assets/docx/recommendations-8.doc';

import cert6 from '../../assets/img/уд-6.png';
import cert2 from '../../assets/img/уд-2.png';
import cert3 from '../../assets/img/уд-3.png';
import cert4 from '../../assets/img/уд-4.png';
import cert5 from '../../assets/img/уд-5.png';
import cert1 from '../../assets/img/уд-1.png';

export interface DownloadCard {
  id: number;
  title: string;
  image: string;
  download: string;
}

export const certificates: string[] = [cert6, cert2, cert3, cert4, cert5, cert1];

export const downloadCardsForParents: DownloadCard[] = [
  {
    id: 1,
    title: 'Общие рекомендации родителям при обучении детей иностранным языкам',
    image: phoneBox,
    download: doc1,
  },
  {
    id: 2,
    title: 'Рекомендации родителям учащихся начальной школы по выполнению домашнего задания',
    image: woman1,
    download: doc2,
  },
  {
    id: 3,
    title: 'Ваши дети начали изучать иностранный язык',
    image: woman2,
    download: doc3,
  },
  {
    id: 4,
    title: 'Методические рекомендации родителям младших школьников, изучающих английский язык',
    image: teacher,
    download: doc4,
  },
];

export const downloadCardsForTeachers: DownloadCard[] = [
  {
    id: 5,
    title: 'Обучение чтению',
    image: girl,
    download: doc5,
  },
  {
    id: 6,
    title: 'Английский 2ИЯ 7-8кл 2021',
    image: flags,
    download: doc6,
  },
  {
    id: 7,
    title: 'Сборник музыкальных театральных постановок и мероприятий на английском языке',
    image: hp,
    download: doc7,
  },
  {
    id: 8,
    title: 'Первый урок английского при ДО',
    image: abc,
    download: doc8,
  },
];
