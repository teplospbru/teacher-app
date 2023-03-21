/**
 * функция создания письма после "выходного тестирования"
 */
export const createMessage = (grade: number, amount: number, progress: number, userEmail: string) => {
    const doc = `Пользователь ${userEmail} прошёл входное тестирование и набрал\n
    ${grade} из ${amount} баллов.`

    return doc;
}

/**
 * функция валидации email
 */
export const validateEmail = (value: string) => {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    return EMAIL_REGEXP.test(value);
}