import { addStateDoc } from './api';
import { Question, Input } from './types';
import { AdminInitalState, ForStudentInitalState } from '../redux/types';

// создаёт хэш
export async function digestMessage(message: string) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
  return hashHex;
};

/**
 * преобразовывает стейт из слайса forStudentSlice в строку и сохраняет его в firestore
 */
export const saveAdminStateInFirebase = async (state: AdminInitalState, fullName: string, date: string) => {
  const arr: ForStudentInitalState = {
    forStudent: {
      subcollections: [],
      isLoading: true,
      exercises: [],
      answers: [],
      currentIndex: 0,
      student: fullName,
      expiryDate: date,
    },
  };
  state.admin.task.exercises.forEach((exercise) => {
    if (exercise.questions?.length) {
      arr.forStudent.exercises.push({
        title: exercise.title,
        id: exercise.id,
        questions: exercise.questions.map((question) => {
          const index = state.admin.exercises.findIndex((item) => item.title === exercise.title);
          return state.admin.exercises[index].questions.find((item) => item.id === question.id);
        }) as Question<Input>[],
      });
    }
  });
  state.admin.subcollections.forEach((subcollection) => {
    const exercise = state.admin.task.exercises.find((item) => subcollection.id === item.id);
    if (exercise && exercise.questions?.length) {
      arr.forStudent.subcollections.push(subcollection);
    }
  });

  const text = JSON.stringify(arr);
  const hash = await digestMessage(text);
  const data = { hash, text };
  const id = await addStateDoc(data);

  return { id, hash, text };
};

// после прохождения теста преобразовывает стейт из слайса forStudentSlice в строку и сохраняет 
// его в firestore (пока не использую)
export const saveForStudentStateInFirebase = async (state: ForStudentInitalState) => {
  const arr: ForStudentInitalState = {
    forStudent: {
      subcollections: [],
      isLoading: true,
      exercises: [],
      answers: [],
      currentIndex: 0,
      student: '',
      expiryDate: '',
    },
  };

  arr.forStudent.subcollections = [...state.forStudent.subcollections];
  arr.forStudent.exercises = [...state.forStudent.exercises];
  arr.forStudent.answers = [];
  arr.forStudent.currentIndex = 0;
  arr.forStudent.student = state.forStudent.student;
  arr.forStudent.expiryDate = state.forStudent.expiryDate;

  const text = JSON.stringify(arr);
  const hash = await digestMessage(text);
  const data = { hash, text };
  const id = await addStateDoc(data);

  return { id, hash, text };
}