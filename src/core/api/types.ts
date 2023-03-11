// СТРУКТУРА ДАННЫХ, КОТОРЫЕ ХРАНЯТСЯ В FIRESTORE
//
// Тесты
//
// Глобально тесты хранятся в 2-х разделах:
//   - checkYourself - тесты для раздела "проверь себя"
//   - grammar - тесты для учителя, которые он даёт ученикам
//
// В обоих разделах структура хранения тестов одинакова. В каждом разделе создаются "субколлекции"
// (тип Subcollection). В "субколлекции" хранятся все "вопросы" (тип Question), которые относятся
// к одной теме. Например: "Prepositions of place - at, in, on"
//
// СТРУКТУРА ДАННЫХ ПРИЛОЖЕНИЯ
//
// Тесты
//
// Приложение позволяет пройти тест. "Тест" - это набор шагов с вопросами, ответив на которые
// можно получить оценку. Каждый шаг состоит из "упражнения" (тип Exercise) с одним и более
// "вопросов" (тип Question), относящихся к одной "субколлекции" (тип Subcollection).
//
// Админка
//
// В админку выводятся названия всех "субколлекций" (тип Subcollection). Название разделов отражают
// названия "субколлекций". Клик по названию "субколлекции" вызывает загрузку всех "вопросов"
// (тип Question) из этой "субколлекции"

/**
 * "Субколлекция" - это описание темы. Состоит из:
 *   - id - уникальный id, присвоенный документу в firebase
 *   - title - название "упражнения" (не должно включать "/")
 *   - description - описание "упражнения"
 *   - example - пример решения
 */
export interface Subcollection {
  id: string;
  title: string;
  description: string;
  example: string;
}

/**
 * Question - это "вопрос", который включает в себя:
 *   - строку вопроса, которая содержит вопрос и ссылки на инпуты, которые он должен включать
 *     Ссылки на инпуты заключены в фигурные скобки. Строка распарсивается этой функцией: parseQuestion
 *   - id вопроса, присвоенный документу в firebase
 *   - массив с инпутами, в котором храняться объекты описания инпутов из строки
 *   @example "Complex example with several {{select-1}} in single ('line' or 'lines') ⇒ {{input-1}}"
 */
export interface Question<Input> {
  question: string;
  id: string;
  inputs: Input[];
}

/**
 * Объект описания инпута из строки "вопроса" из @type {Question} и
 * является подтипом @type {Input}
 */
export interface TextInput {
  id: string;
  type: 'input';
  correctAnswers: string[];
  answer: string | null;
}

/**
 * Объект описания инпута из строки "вопроса" из @type {Question} и
 * является подтипом @type {Input}
 */
export interface Select {
  id: string;
  type: 'select';
  options: string[];
  correctAnswers: string[];
  answer: string | null;
}

/**
 * Объект описания инпута из строки "вопроса" из @type {Question} и
 * является подтипом @type {Input}
 */
export interface RadioBtn {
  id: string;
  type: 'radio';
  options: string[];
  correctAnswers: string[];
  answer: string | null;
}

/**
 * Input - это описание инпута из "вопроса" @type {Question}. Содержит:
 *   - id инпута, которое содержится в строке вопроса в фигурных скобках. Служит для сопоставления
 *     инпута из строки с нужным описанием в массиве инпутов. Должен быть уникальным в рамках
 *     одного "вопроса"
 *   - type описание типа, допустимы только типы @type {Input['type']}
 *   - options - options в инпуте, если тип инпута предполагает их наличие
 *   - correctAnswers массив с правильными ответами
 *   - answer сюда запишется ответ пользователя
 */
export type Input = TextInput | Select | RadioBtn;

/**
 * Exercise<Input> - это описание "упражнения". Состоит из:
 *   - id - уникальный id, присвоенного документу в firebase
 *   - title - название "упражнения" (не должно включать "/")
 *   - description - описание "упражнения"
 *   - example - пример решения
 *   - массив с вопросами @type {Question<Input>[]}
 */
export interface Exercise<Input> {
  id: string;
  title: string;
  description?: string;
  example?: string;
  questions: Question<Input>[];
}

/**
 * Функция выявления инпута типа @type {TextInput}
 */
export const isTextInput = (input: Input): input is TextInput => {
  return (<TextInput>input).type === 'input';
};

/**
 * Функция выявления инпута типа @type {Select}
 */
export const isSelect = (input: Input): input is Select => {
  return (<Select>input).type === 'select' && (<Select>input).options !== undefined;
};

/**
 * Функция выявления инпута типа @type {RadioBtn}
 */
export const isRadioBtn = (input: Input): input is RadioBtn => {
  return (<RadioBtn>input).type === 'radio' && (<RadioBtn>input).options !== undefined;
};

/**
 * Объект со стейтом в виде строки
 */
export interface StateFromFirebase {
  hash: string;
  id: string;
  text: string;
}
