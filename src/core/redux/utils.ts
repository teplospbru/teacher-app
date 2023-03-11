import { ForStudentExerciseState } from './../../components/Question/type';
import { ForStudentInitalState, ExerciseWithState } from './types';

export const rememberInputValues = (state: ForStudentInitalState, currentIndex: number, answers: Omit<ForStudentExerciseState, 'warning'>[]) => {
    const exercises = state.forStudent.exercises;
      if (exercises.length) {
        const exercise = exercises[currentIndex] as ExerciseWithState;
        if (exercise.questions) {
            exercise.questions.forEach((question) => {
                const index = exercise.questions.findIndex((question) => question.id); // индекс итерируемого вопроса
                // извлекаем из аргумента answers массив с ответами для данного вопроса
                const obj = answers.find((answer) => answer.id === question.id); 

                // ищем индекс инпута, в котором сработал useValue и записываем в элемент массива инпута с этим индексом
                // введенный пользователем ответ
                if(obj) {
                    obj.answers.forEach(element => {
                        const secondIndex = exercise.questions[index].inputs.findIndex((input) => input.id === element.id);
                        exercise.questions[index].inputs[secondIndex].answer = element.answer as string;
                    });
                }
            })
        }

        // определяем, был ли ответ правильным и записываем его булево значение в массив ответов forStudent.answers
        const correctResult = exercise.questions.map((question) => {
            return question.inputs
                .map((input) => input.correctAnswers.includes(input.answer as string))
                .every((item) => item === true);
        }).every((question) => question === true)

        state.forStudent.answers[state.forStudent.currentIndex] = correctResult;
    }
}

// console.log(exercises, currentIndex, answers)

// const correctResult = exercise.questions[0].inputs
//         .map((input) => input.correctAnswers.includes(input.answer as string))
//         .every((item) => item === true);