import { Exercise, Input } from "../../core/api/types";
import { parseQuestion } from '../Question/useInput';

/**
 * Генерирует письмо с результатами прохождения теста учеником
 */
export const createMessage = (exercises: Exercise<Input>[], student: string, expiryDate: string, hash: string) => {
    let doc = ''; // Отчёт о прохождении теста

    doc = doc + `Ученик: ${student}\nЗадание должно быть выполнено до: ${expiryDate}\n\n`
    
    exercises.forEach((exercise, i) => {
      doc = doc + '  Упражнение ' + (i + 1) + '\n'; // заголовок упражнения
      exercise.questions.forEach((question, j) => {
        // парсим строку вопроса в массив типа Input
        const arr = parseQuestion(question.question, question.inputs); 
        // подменяем элемент типа Input на ответ из этого инпута
        const res = arr.map((item) => {
          if(typeof item === 'string') {
            return item
          } else {
            return item.answer
          }
        });
        
        // Проверяем, есть ли неправильные ответы в вопоросе
        const wrong = question.inputs
            .map((input) => input.correctAnswers.includes(input.answer!))
            .some((answer) => answer === false);
        doc = `${doc} Вопрос ${j + 1}  ${res.join('')} ${wrong ? '!!' : ''} \n`
      })
      doc = doc + '\n';
    });

    doc = doc + `Тест: ${process.env.URL}/#/test/${hash}\n\n`

    return doc;
}