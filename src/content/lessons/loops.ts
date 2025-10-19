import type { LessonCollection } from '@/types/lesson';

export const loopsLessons: LessonCollection = {
  basics: {
    slug: 'basics',
    title: 'Цикли и повторения',
    summary:
      'Циклите позволяват повторно изпълнение на блок от инструкции, докато дадено условие е изпълнено.',
    heroIllustration: '/diagrams/loops.svg',
    estimatedTime: '20 мин',
    prerequisites: ['Условни оператори'],
    objectives: [
      'Разбиране на for и while конструкции',
      'Проследяване на итерации и броячи',
      'Контрол върху прекъсване и продължаване'
    ],
    pseudocode: [
      { id: 'init', label: 'за (инициализация; условие; стъпка)' },
      { id: 'body', label: 'изпълни блок с инструкции' },
      { id: 'step', label: 'обнови променливите' },
      { id: 'check', label: 'провери условието отново' }
    ],
    sections: [
      {
        id: 'for-loop',
        title: 'Определен брой повторения',
        content:
          'Цикълът for се използва, когато знаем точния брой повторения. Пример: for (let i = 0; i < n; i++).',
        objective: 'Следене на индекс и лимит.'
      },
      {
        id: 'while-loop',
        title: 'Докато условието е вярно',
        content:
          'Цикълът while продължава да се изпълнява, докато условието остава вярно. Трябва да се гарантира промяна на състоянието, за да се избегнат безкрайни цикли.',
        objective: 'Контрол на условията за прекъсване.'
      },
      {
        id: 'control-flow',
        title: 'break и continue',
        content:
          'Операторът break прекъсва цикъла, а continue пропуска текущата итерация и продължава със следващата.',
        objective: 'Използване на допълнителни оператори за контрол.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Кое е правилното условие за цикъл for, който се изпълнява 5 пъти?',
        answers: [
          { id: 'a', label: 'for (let i = 0; i <= 5; i++)', correct: false },
          { id: 'b', label: 'for (let i = 0; i < 5; i++)', correct: true },
          { id: 'c', label: 'for (let i = 1; i <= 5; i--)', correct: false }
        ],
        explanation: 'Итерациите са i = 0..4, общо 5 пъти.'
      },
      {
        id: 'q2',
        question: 'Как се предотвратява безкраен цикъл while?',
        answers: [
          { id: 'a', label: 'Няма нужда, while винаги спира', correct: false },
          { id: 'b', label: 'Условието трябва да стане лъжа чрез промяна в тялото', correct: true },
          { id: 'c', label: 'Добавя се else блок', correct: false }
        ],
        explanation: 'Трябва да има промяна, която прави условието невярно.'
      },
      {
        id: 'q3',
        question: 'Какво прави операторът continue?',
        answers: [
          { id: 'a', label: 'Прекъсва целия цикъл', correct: false },
          { id: 'b', label: 'Пропуска текущата итерация и продължава нататък', correct: true },
          { id: 'c', label: 'Нулира брояча', correct: false }
        ],
        explanation: 'След continue се преминава към проверката на условието.'
      },
      {
        id: 'q4',
        question: 'Каква е сложността на прост цикъл for, който обработва масив с n елемента?',
        answers: [
          { id: 'a', label: 'O(1)', correct: false },
          { id: 'b', label: 'O(log n)', correct: false },
          { id: 'c', label: 'O(n)', correct: true }
        ],
        explanation: 'Цикълът преминава през всеки елемент веднъж.'
      },
      {
        id: 'q5',
        question: 'Кога използваме цикъл do/while?',
        answers: [
          { id: 'a', label: 'Когато искаме тялото да се изпълни поне веднъж', correct: true },
          { id: 'b', label: 'Когато не искаме условие', correct: false },
          { id: 'c', label: 'Когато трябва да прекъснем', correct: false }
        ],
        explanation: 'do/while проверява условието след първото изпълнение.'
      }
    ],
    bigO: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)',
      space: 'O(1)'
    }
  }
};
