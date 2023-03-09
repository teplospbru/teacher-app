import { fetchCheckYourselfSubcollections, setAnswer, setInputAnswer, } from './checkYourselfSlice';
import { Dispatch } from './store';
import {
  // fetchSubcollections,
  fetchSubcollectionDocuments,
  setQuestion,
  unsetQuestion,
  setSubcollectionOpen,
  setFullNameAndExpiryDate,
  fetchAdminSubcollections,
} from './adminSlice';

/**
 * Получает из firebase список "субколлекций" для adminSlice
 */
export const getAdminSubcollectionsList = () => (dispatch: Dispatch) => {
  return dispatch(fetchAdminSubcollections());
}

// export const getSubcolloctionsData = () => (dispatch: Dispatch) => {
//   return dispatch(fetchSubcollections());
// };

/**
 * Получает из firebase список "вопросов" для одной "субколлекции" для adminSlice
 */
export const getSubcollectionDocuments = (title: string) => (dispatch: Dispatch) => {
  return dispatch(fetchSubcollectionDocuments(title));
};

/**
 * Устанавливает галочку на "вопрос" в админке
 */
export const setAdminQuestion = (title: string, id: string) => (dispatch: Dispatch) => {
  return dispatch(setQuestion({ title, id }));
};

/**
 * Снимаем галочку с "вопроса" в админке
 */
export const unsetAdminQuestion = (title: string, id: string) => (dispatch: Dispatch) => {
  return dispatch(unsetQuestion({ title, id }));
};

export const setAdminSubcollectionOpen = (id: string, isOpen: boolean) => (dispatch: Dispatch) => {
  return dispatch(setSubcollectionOpen({ id, isOpen }));
};

export const setAdminFullNameAndExpiryDate = (student: string, expiryDate: string) => (dispatch: Dispatch) => {
  return dispatch(setFullNameAndExpiryDate({ student, expiryDate }));
};

export const getCheckYourselfSubcollectionData = () => (dispatch: Dispatch) => {
  return dispatch(fetchCheckYourselfSubcollections());
}

export const setQuestionAnswer = (currentIndex: number) => (dispatch: Dispatch) => {
  return dispatch(setAnswer(currentIndex));
}

export const setQuestionInputAnswer = (index: number, secondIndex: number, answer: { id: string, answer: string }[]) => (dispatch: Dispatch) => {
  return dispatch(setInputAnswer({ index, secondIndex, answer }));
}