import { addStateDoc } from './api';
import { Question, Input } from './types';
import { AdminInitalState, ForStudentInitalState } from './../redux/types';

export async function digestMessage(message: string) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
  return hashHex;
}

export const saveForStudentStateinFirebase = async (state: AdminInitalState, fullName: string, date: string) => {
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
