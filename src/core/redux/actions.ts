import { fetchCheckYourselfSubcollections, setAnswer, setEmptyFieldsWarning, setInputAnswer } from './checkYourselfSlice';
import { Dispatch } from './store';
import {
  fetchSubcollections,
  fetchSubcollectionDocuments,
  setQuestion,
  unsetQuestion,
  setSubcollectionOpen,
  setFullNameAndExpiryDate,
} from './adminSlice';

export const getSubcolloctionsData = () => (dispatch: Dispatch) => {
  return dispatch(fetchSubcollections());
};

export const getSubcolloctionDocuments = (title: string) => (dispatch: Dispatch) => {
  return dispatch(fetchSubcollectionDocuments(title));
};

export const setAdminQuestion = (title: string, id: string) => (dispatch: Dispatch) => {
  return dispatch(setQuestion({ title, id }));
};

export const unsetAdminQuestion = (title: string, id: string) => (dispatch: Dispatch) => {
  return dispatch(unsetQuestion({ title, id }));
};

export const setAdminSubcollectionOpen = (title: string, isOpen: boolean) => (dispatch: Dispatch) => {
  return dispatch(setSubcollectionOpen({ title, isOpen }));
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

export const setQuestionInputAnswer = (index: number, secondIndex: number, id: string, answer: string) => (dispatch: Dispatch) => {
  return dispatch(setInputAnswer({ index, secondIndex, id, answer }));
}

export const setQuestionEmptyFieldsWarning = (warning: boolean) => (dispatch: Dispatch) => {
  return dispatch(setEmptyFieldsWarning(warning));
}
