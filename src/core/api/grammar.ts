import { Grammar } from './seeds';

export const grammar: Grammar = {
  title: 'grammar',
  data: [
    {
      title: 'a-an_article',
      id: '',
      questions: [
        {
          question: 'I need {{select}} new bed.',
          id: '1',
          inputs: [
            {
              id: 'select',
              type: 'select',
              options: ['a', 'an'],
              correctAnswers: ['an'],
              answer: null,
            },
          ],
        },
        {
          question: "It's {{select}} animal.",
          id: '2',
          inputs: [
            {
              id: 'select',
              type: 'select',
              options: ['a', 'an'],
              correctAnswers: ['a'],
              answer: null,
            },
          ],
        },
      ],
    },
    {
      title: 'plurals',
      id: '',
      description: 'Choose a/an for the following words.',
      example: "A nice sofa ⇒ nice 'sofas'.",
      questions: [
        {
          question: "Complex example with several {{select}} in single ('line' or 'lines') ⇒ {{input}}",
          id: '3',
          inputs: [
            {
              id: 'select',
              type: 'select',
              options: ['inputs', 'input'],
              correctAnswers: ['inputs'],
              answer: null,
            },
            {
              id: 'input',
              type: 'input',
              correctAnswers: ['line'],
              answer: null,
            },
          ],
        },
        {
          question: 'a university ⇒ {{input}}',
          id: '4',
          inputs: [
            {
              id: 'input',
              type: 'input',
              correctAnswers: ['universities'],
              answer: null,
            },
          ],
        },
        {
          question: 'a rich man ⇒ rich {{input}}',
          id: '5',
          inputs: [
            {
              id: 'input',
              type: 'input',
              correctAnswers: ['men'],
              answer: null,
            },
          ],
        },
      ],
    },
    {
      title: 'verbs',
      id: '',
      description: 'Choose the correct present simple forms to complete the following sentences.',
      questions: [
        {
          question: 'My son never {{select}} cartoons.',
          id: '6',
          inputs: [
            {
              id: 'select',
              type: 'select',
              options: ['watch', 'watches', 'watchs'],
              correctAnswers: ['watches'],
              answer: null,
            },
          ],
        },
        {
          question: 'Tom {{select}} work until 10 today.',
          id: '7',
          inputs: [
            {
              id: 'select',
              type: 'select',
              options: ["doesn't starts", "doesn't start", 'do not start'],
              correctAnswers: ["doesn't start"],
              answer: null,
            },
          ],
        },
        {
          question: 'John and I want to be musicians. ⇒ John and I {{input}} to be musicians.',
          id: '8',
          inputs: [
            {
              id: 'input',
              type: 'input',
              correctAnswers: ["don't want"],
              answer: null,
            },
          ],
        },
      ],
    },
    {
      title: 'Possessive adjectives',
      id: '',
      description: 'Choose the correct subject pronouns or possessive adjectives to complete the following sentences.',
      questions: [
        {
          question: 'Go to {{radio}} office.',
          id: '9',
          inputs: [
            {
              id: 'radio',
              type: 'radio',
              options: ['you', 'your', 'yours'],
              correctAnswers: ['your'],
              answer: null,
            },
          ],
        },
        {
          question: "{{radio}} six o'clock. Let's go home.",
          id: '10',
          inputs: [
            {
              id: 'radio',
              type: 'radio',
              options: ["It's", 'Its', 'His'],
              correctAnswers: ['your'],
              answer: null,
            },
          ],
        },
        {
          question: 'Our products are famous for {{radio}} durability.',
          id: '11',
          inputs: [
            {
              id: 'radio',
              type: 'radio',
              options: ['their', 'its', 'they'],
              correctAnswers: ['its'],
              answer: null,
            },
          ],
        },
      ],
    },
  ],
};
