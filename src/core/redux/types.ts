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
};

// тип объекта задания ученику
export type Task = {
  tests: {
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
    grammar: {
      subcollections: Subcollection[];
      isLoading: boolean;
      exercises: Omit<ExerciseWithState, 'questions'>[];
    };
    task: Task;
  };
}

/**
 * Первоначальный стейт слайса "проверь себя". Состоит:
 *   - subcollections - список "субколлекций"
 *   - isLoading - флаг загрузки теста
 *   - exercises - список "упражнений"
 *   - answers - массив ответов на "вопросы"
 *   - currentIndex - текущий индекс (равен номеру вопроса в тесте - 1)
 */
export interface CheckYourselfInitalState {
  checkYourself: {
    subcollections: Subcollection[];
    isLoading: boolean;
    exercises: Exercise<Input>[];
    answers: boolean[];
    currentIndex: number,
  };
}
