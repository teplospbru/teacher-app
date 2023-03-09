import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  addDoc,
  collection,
  doc,
  deleteDoc,
  updateDoc,
  getDocs,
  setDoc,
  collectionGroup,
  query
} from 'firebase/firestore';
import { Input, Question, Subcollection, Exercise } from './types';

// Initialize Firebase
export const initializeAPI = (): FirebaseApp => {
  const firebaseApp = initializeApp({
    apiKey: 'AIzaSyAyNJgIvFhVDFrSGIDa10sbpAsIvh18Zyw',
    authDomain: 'fefilova-17d9d.firebaseapp.com',
    projectId: 'fefilova-17d9d',
    storageBucket: 'fefilova-17d9d.appspot.com',
    messagingSenderId: '576429311396',
    appId: '1:576429311396:web:4d596700b15fca83d7ad31',
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
export const addStateDoc = async (data: { hash: string, text: string }) => {
  const db = getFirestore(app);

  try {
    const res = await addDoc(collection(db, 'for-student'), data);

    return res.id;
  } catch(error) {
    return Promise.reject(error);
  }
}