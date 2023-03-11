import { Input } from '../../core/api/types';

/**
 * Массив объектов со свойствами:
 *   - id инпута
 *   - value заполнен ли инпут значением
 */
export type WarningsArr = { id: string; value: boolean }[];

/**
 * Массив объекта, из которого мапится "вопрос". Может состоять из:
 *   - string - текстовая часть вопроса
 *   - Input - объект описания инпута
 */
export type InputSet = (Input | string)[];

/**
 * Массив объектов со свойствами:
 *   - id инпута
 *   - answer - значение введённое в инпут
 */
export type AnswersArr = { id: string; answer: string }[];

/**
 * Объект стейта компонента ForStudentExercise со свойствами:
 *   - id "вопроса"
 *   - answers - массив со значениями из инпутов вопроса
 *   - warning - флаг отображения сообщения "заполните поля!"
 */
export type ForStudentExerciseState = {
    id: string, 
    answers: AnswersArr, 
    warning: boolean;
}
