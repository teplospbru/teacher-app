import { ForStudentExerciseState } from './../../components/Question/type';
import { Dispatch } from './store';
import { 
  fetchState as fetchStateCheckYourself, 
  setExersise as setExersiseCheckYourself,
  setInputValue as  setInputValueCheckYourself,
} from './checkYourselfSlice';
import {
  fetchSubcollectionDocuments,
  setQuestion,
  unsetQuestion,
  setSubcollectionOpen,
  setFullNameAndExpiryDate,
  fetchAdminSubcollections,
} from './adminSlice';
import { 
  fetchState as fetchStateForStudent,
  setExersise as setExersiseForStudent,
  setInputValue as setInputValueForStudent
} from './forStudentSlice';

/**
 * Получает из firebase список "субколлекций" для adminSlice
 */
export const getAdminSubcollectionsList = () => (dispatch: Dispatch) => {
  return dispatch(fetchAdminSubcollections());
};

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

/**
 * Разворачиваем "субколлекцию" в админке
 */
export const setAdminSubcollectionOpen = (id: string, isOpen: boolean) => (dispatch: Dispatch) => {
  return dispatch(setSubcollectionOpen({ id, isOpen }));
};

/**
 * Сворачиваем "субколлекцию" в админке
 */
export const setAdminFullNameAndExpiryDate = (student: string, expiryDate: string) => (dispatch: Dispatch) => {
  return dispatch(setFullNameAndExpiryDate({ student, expiryDate }));
};

/**
 * Создаёт стейт в слайсе chek-yourself после загрузки
 */
export const getCheckYourselfSubcollectionData = () => (dispatch: Dispatch) => {
  return dispatch(fetchStateCheckYourself());
};

/**
 * Переходим к следующему вопросу в chek-yourself
 */
export const setQuestionAnswer = (currentIndex: number) => (dispatch: Dispatch) => {
  return dispatch(setExersiseCheckYourself(currentIndex));
};

/**
 * Записывает ответ из инпута в стейт в слайсе chek-yourself
 */
export const setQuestionInputAnswer =
  (index: number, secondIndex: number, answer: { id: string; answer: string }[]) => (dispatch: Dispatch) => {
    return dispatch(setInputValueCheckYourself({ index, secondIndex, answer }));
  };
  
/**
 * Создаёт стейт в слайсе for-student после загрузки стейта по проходу по ссылке
 */  
export const setForStudentStateWithHash = (hash: string) => (dispatch: Dispatch) => {
  return dispatch(fetchStateForStudent(hash));
};

/**
 * Переходим к следующему вопросу в for-student
 */
export const setNextExerciseForStudent = (currentIndex: number) => (dispatch: Dispatch) => {
  return dispatch(setExersiseForStudent(currentIndex));
};

/**
 * Записывает ответ из инпута в стейт в слайсе for-student
 */
export const setInputValuesForStudent = 
  (index: number, answers: Omit<ForStudentExerciseState, 'warning'>[]) => (dispatch: Dispatch) => {
      return dispatch(setInputValueForStudent({ index, answers }));
  };