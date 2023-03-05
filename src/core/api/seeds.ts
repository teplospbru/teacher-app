import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { Input, Exercise } from './types';
import { initializeAPI } from './api';

export interface Grammar {
  title: string;
  data: Exercise<Input>[];
}

export interface DocId {
  _key: {
    path: {
      segments: string[];
    };
  };
}

type Arr = ({ [index: string]: string } | null)[];

const app = initializeAPI();

// Функция заполнения БД
export const seeds = async (object: Grammar): Promise<void> => {
  const db = getFirestore(app);

  // Создаём корневую коллекцию и записываем документы в неё
  const documents = await Promise.all(
    object.data.map((document) => {
      try {
        const ref = addDoc(collection(db, object.title), {
          title: document.title,
          description: document.description ? document.description : '',
          example: document.example ? document.example : '',
        });

        return ref as unknown as Promise<DocId>;
      } catch (e) {
        return null;
      }
    })
  );

  // Получаем id элементов корневой коллекции
  const arr: Arr = documents.map((document, i) => {
    if (document !== null) {
      return {
        id: document._key.path.segments[1].toString(),
        title: object.data[i].title,
      };
    } else {
      return null;
    }
  });

  // Создаём субколлекции и записываем в них документы
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== null) {
      await Promise.all(
        object.data
          .filter((document) => arr[i]?.title === document?.title)[0]
          .questions.map((question) => {
            try {
              // @ts-ignore
              const ref = addDoc(collection(db, object.title, arr[i]?.id, arr[i]?.title), question);

              return ref as unknown as Promise<DocId>;
            } catch (e) {
              return null;
            }
          })
      );
    }
  }

  // return arr;
};
