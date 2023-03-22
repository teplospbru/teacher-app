import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  collectionGroup,
  query,
  where,
} from 'firebase/firestore';
import { Input, Question, Subcollection, StateFromFirebase } from './types';

// Initialize Firebase
export const initializeAPI = (): FirebaseApp => {
  const firebaseApp = initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
  });

  getFirestore(firebaseApp);

  return firebaseApp;
};

const app = initializeAPI();

// Получаем субколлекции
export const getSubcollectionList = async (name: string): Promise<Subcollection[]> => {
  const db = getFirestore(app);
  const arr: Subcollection[] = [];

  try {
    const querySnapshot = await getDocs(collection(db, name));

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Subcollection;
      arr.push({ ...data, id: doc.id });
    });

    return Promise.resolve(arr);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Получаем все документы из субколлекции в БД
export const getSubcollectionDocs = async (name: string): Promise<Question<Input>[]> => {
  const db = getFirestore(app);
  const arr: Question<Input>[] = [];

  try {
    const querySnapshot = await getDocs(collectionGroup(db, name));

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Question<Input>;
      // console.log(data)
      arr.push({ ...data, id: doc.id });
    });

    return Promise.resolve(arr);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Записываем стейт в Firebase
export const addStateDoc = async (data: { hash: string; text: string }) => {
  const db = getFirestore(app);

  try {
    const res = await addDoc(collection(db, 'for-student'), data);

    return res.id;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Получаем стейт из firebase
export const getStateDoc = async (hash: string) => {
  const db = getFirestore(app);

  try {
    const q = await query(collection(db, 'for-student'), where('hash', '==', hash));
    const querySnapshot = await getDocs(q);
    const arr: StateFromFirebase[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log(data)
      arr.push({ ...data, id: doc.id } as StateFromFirebase);
    });

    if (arr[0]) {
      return arr[0];
    } else {
      throw Error;
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
