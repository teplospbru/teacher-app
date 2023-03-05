import React, { FC, PropsWithChildren, useState } from 'react';
import './TestResultPage.scss';
import { Warning } from '../Warning/Warning';

interface TestResultPageProps extends PropsWithChildren {
    grade: number;
    amount: number;
    progress: number;
}

export const TestResultPage: FC<TestResultPageProps> = ({ children, grade, amount, progress }) => {
    const [warning, setWarning] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const getColor = () => {

        if(progress > 50 && progress <= 75) {
            return 'yellow'
        };

        if(progress > 75) {
            return 'green';
        }

        return 'red';
    }

    const getText = () => {
        if(progress > 50 && progress <= 75) {
            return (
                <p>Сложные грамматические конструкции, чтение больших текстов, прослушивание интервью на английском уже не представляют особых трудностей для Вас. Однако Ваши знания скорее общего характера без тематического уклона. Вам знакомы слова общей тематики, которые часто используются в речи, но специфическая лексика, частные случаи употребления фразовых глаголов, многие идиомы пока неизвестны. Это задача следующих уровней.</p>
            )
        };

        if(progress > 75) {
            return (
                <>
                    <p> Вам знакомы азы английского языка. Скорее всего, Вы только начали изучать английский или обладаете остаточными знаниями языка со времен школы. Вы умеете читать и писать, знаете алфавит, можете представиться и сообщить самую простую информацию о себе на английском. Но Ваших знаний совершенно недостаточно для общения в типичных жизненных ситуациях.</p>
                    <p>Это не плохо, но я вам рекомендую подтянуть ваши знания.</p>
                </>
            )
        }

        return (
            <p>Вам знакомы азы английского языка. Скорее всего, Вы только начали изучать английский или обладаете остаточными знаниями языка со времен школы. Вы умеете читать и писать, знаете алфавит, можете представиться и сообщить самую простую информацию о себе на английском. Но Ваших знаний совершенно недостаточно для общения в типичных жизненных ситуациях.</p>
        )
    }

    const handleButtonClick = () => {
        return null
    }

    return (
        <>
            { children }
            <p>Вы ответили правильно на <span className={`text-color-${getColor()}`}>{grade}</span> из {amount} вопросов.</p>
            { getText() }
            <h3>Получить рекомендации от преподавателя</h3>
            <p className=''>Введите свой email, и мы бесплатно отправим вам подробный разбор каждой вашей ошибки, а также посоветуем, как не допускать подобных ошибок в будущем.</p>
            <div className='email'>
                <input name="fullName" type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <div className="email__button">
                    <button className="email__button-btn" onClick={() => handleButtonClick()}>
                        Отправить письмо преподавателю
                    </button>
                    {warning.length > 0 && <Warning warning='Отправить email' position={'absolute'} />}
                </div>
            </div>
        </>
    )
}