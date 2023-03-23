import { Input, Exercise, Subcollection } from './../api/types';

/**
 * Это объект "субколлекции" с дополнительными полями стейта.
 * Формирует раскрывающиеся разделы в админке
 *   - isLoading - флаг загрузки
 *   - isOpen - открыт или закрыт раздел
 */
export interface ExerciseWithState extends Exercise<Input> {
  isLoading: boolean;
  isOpen: boolean;
}

// тип объекта задания ученику
export type Task = {
  exercises: {
    id: string;
    title: string; // название коллекции
    questions?: {
      // выбранные учителем вопросы
      id: string; // id вопроса
      answers?: {
        // ответы ученика
        id: string; // id инпута
        answer: string; // ответ для этого инпута
      }[];
    }[];
  }[];
  student: string; // ФИО
  expiryDate: string; // Требуемая дата выполнения
  showLink: boolean; // Флаг отображения сгенерированной ссылки
};

/**
 * Первоначальный стейт слайса админа. Состоит:
 *   - subcollections - список "субколлекций"
 *   - isLoading - флаг загрузки теста
 *   - exercises - список "упражнений"
 *   - объект с заданием для ученика
 */
export interface AdminInitalState {
  admin: {
    subcollections: Subcollection[];
    isLoading: boolean;
    exercises: ExerciseWithState[]; // Omit<ExerciseWithState, 'questions'>[]
    task: Task;
    forSt?: ForStudentInitalState;
  };
}

/**
 * Первоначальный стейт слайса "проверь себя". Состоит:
 *   - subcollections - список "субколлекций"
 *   - isLoading - флаг загрузки теста
 *   - exercises - список "упражнений"
 *   - answers - массив ответов на "вопросы"
 *   - currentIndex - текущий индекс (равен номеру вопроса в тесте - 1)
 *   - emptyFields - флаг незаполненных полей
 */
export interface CheckYourselfInitalState {
  checkYourself: {
    subcollections: Subcollection[];
    isLoading: boolean;
    exercises: Exercise<Input>[];
    answers: boolean[];
    currentIndex: number;
  };
}

/**
 * Первоначальный стейт слайса "для ученика". Состоит:
 *   - subcollections - список "субколлекций"
 *   - isLoading - флаг загрузки теста
 *   - exercises - список "упражнений"
 *   - answers - массив ответов на "вопросы"
 *   - currentIndex - текущий индекс (равен номеру вопроса в тесте - 1)
 *   - emptyFields - флаг незаполненных полей
 */
export interface ForStudentInitalState {
  forStudent: {
    subcollections: Subcollection[];
    isLoading: boolean;
    exercises: Exercise<Input>[];
    answers: boolean[];
    currentIndex: number;
    student: string; // ФИО
    expiryDate: string; // Требуемая дата выполнения
    hash?: string | null;
  };
}
