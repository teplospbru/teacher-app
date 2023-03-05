import { Grammar } from './seeds';

export const checkYourself: Grammar = {
  title: 'check-yourself',
  data: [
    {
      title: 'Present simple form',
      description: "Choose the correct present simple forms of ‘to be’ for the gaps below.",
      questions: [
        {
          question: 'Hello, Maria. How {{select-1}} you? B: {{select-2}} fine, thanks.',
          id: '1',
          inputs: [
            {
              id: 'select-1',
              type: 'select',
              options: ['am', 'are'],
              correctAnswers: ['are'],
              answer: null,
            },
            {
                id: 'select-2',
                type: 'select',
                options: ['I\'m', 'I are'],
                correctAnswers: ['I\'m'],
                answer: null,
              },
          ],
        },
      ],
    },
    {
      title: 'This, that, these, those',
      description: 'Complete the sentences with this, that, these, those.',
      questions: [
        {
          question: "{{select}} are my trousers.",
          id: '2',
          inputs: [
            {
              id: 'select',
              type: 'select',
              options: ['This', 'These'],
              correctAnswers: ['These'],
              answer: null,
            },
          ],
        },
        
      ],
    },
    {
      title: 'Possessive adjectives and subject pronouns',
      description: 'Choose the correct subject pronouns or possessive adjectives to complete the sentences (I/my, you/your, etc.).',
      questions: [
        {
          question: 'Harry is {{select-1}} friend. {{select-2}} has a nice house.',
          id: '3',
          inputs: [
            {
              id: 'select-1',
              type: 'select',
              options: ['my', 'I',],
              correctAnswers: ['my'],
              answer: null,
            },
            {
              id: 'select-2',
              type: 'select',
              options: ['His', 'He',],
              correctAnswers: ['He'],
              answer: null,
            },
          ],
        },
      ],
    },
    {
      title: 'Adjectives – old, interesting, expensive, etc.',
      description: 'Choose the correct forms with adjectives to complete the following sentences.',
      questions: [
        {
          question: 'With this makeup, your eyes {{radio}}.',
          id: '4',
          inputs: [
            {
              id: 'radio',
              type: 'radio',
              options: ['look differents', 'different look', 'look different'],
              correctAnswers: ['look different'],
              answer: null,
            },
          ],
        },
      ],
    },
    {
        title: 'Questions – word order and question words',
        description: 'Choose the correct questions.',
        questions: [
          {
            question: '{{radio}} to the gym?',
            id: '5',
            inputs: [
              {
                id: 'radio',
                type: 'radio',
                options: ['How often you go', 'How often you do go', 'How often do you go', 'How often go you'],
                correctAnswers: ['How often do you go'],
                answer: null,
              },
            ],
          },
        ],
      },
      {
        title: 'Object pronouns vs subject pronouns',
        description: 'Choose the correct subject pronouns or object pronouns to complete the following sentences (me or I, she or her).',
        questions: [
          {
            question: "What time can I call {{select}}",
            id: '6',
            inputs: [
              {
                id: 'select',
                type: 'select',
                options: ['him', 'he'],
                correctAnswers: ['him'],
                answer: null,
              },
            ],
          },
          
        ],
      },
      {
        title: 'Plurals – singular and plural forms',
        description: 'Choose a/an for the following words.',
        questions: [
          {
            question: 'I need {{select}} new bed.',
            id: '7',
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
        ],
      },
      {
        title: 'The nonsense sentense',
        description: 'The nonsense sentense to show different variants of input in the single question. Choose right words.',
        example: "A nice sofa ⇒ nice 'sofas'.",
        questions: [
          {
            question: "Complex example with several {{select}} in single ('line' or 'lines') ⇒ {{input}}",
            id: '8',
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
          
        ],
      },
      {
        title: 'Prepositions of place',
        description: 'Choose at, in, on to complete the sentences (at, in, on).',
        questions: [
          {
            question: 'They are sitting {{select}} the table.',
            id: '9',
            inputs: [
              {
                id: 'select',
                type: 'select',
                options: ['at', 'in', 'on'],
                correctAnswers: ['at'],
                answer: null,
              },
            ],
          },
        ],
      },
      {
        title: 'Plurals',
        description: 'Choose a/an for the following words.',
        example: "A nice sofa ⇒ nice 'sofas'.",
        questions: [
          {
            question: "Complex example with several {{select}} in single ('line' or 'lines') ⇒ {{input}}",
            id: '10',
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
          
        ],
      },
  ],
};
