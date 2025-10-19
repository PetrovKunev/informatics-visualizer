import type { LessonCollection } from '@/types/lesson';

export const conditionalsLessons: LessonCollection = {
  basics: {
    slug: 'basics',
    title: 'Условни оператори',
    summary:
      'Условните оператори управляват потока на програмата чрез взимане на решения на база логически изрази.',
    heroIllustration: '/diagrams/conditionals.svg',
    estimatedTime: '15 мин',
    prerequisites: ['Основи на синтаксиса', 'Логически оператори'],
    objectives: [
      'Разбиране на if/else конструкции',
      'Изграждане на вложени условия',
      'Създаване на таблици на истинност'
    ],
    pseudocode: [
      { id: 'start', label: 'начало' },
      { id: 'condition', label: 'ако (условие)' },
      { id: 'true-branch', label: 'изпълни код при истина' },
      { id: 'false-branch', label: 'иначе изпълни код при лъжа' },
      { id: 'end', label: 'край' }
    ],
    sections: [
      {
        id: 'what-is',
        title: 'Какво е условен оператор?',
        content:
          'Условният оператор проверява логически израз и поема контрола към различни разклонения на програмата. Той позволява на алгоритмите да реагират на различни входни данни.',
        objective: 'Разбиране на ролята на условията в контрола на потока.'
      },
      {
        id: 'syntax',
        title: 'Структура на if / else',
        content:
          'Типичната форма е if (условие) { ... } else { ... }. Условията се комбинират с &&, || и ! и се основават на сравнения (<, >, ==, ===).',
        objective: 'Приложение на синтаксиса в реални примери.'
      },
      {
        id: 'truth-table',
        title: 'Таблица на истинност',
        content:
          'Таблицата на истинност показва стойността на логически израз при всички възможни комбинации от входни булеви стойности.',
        objective: 'Конструиране и анализ на таблица на истинност.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Каква е стойността на условието (3 > 1) && (2 == 2)?',
        answers: [
          { id: 'a', label: 'Вярно', correct: true },
          { id: 'b', label: 'Невярно', correct: false }
        ],
        explanation: 'И двете части са истина, следователно && връща истина.'
      },
      {
        id: 'q2',
        question: 'Кое е валиден начин за комбиниране на две условия?',
        answers: [
          { id: 'a', label: 'if условие1, условие2', correct: false },
          { id: 'b', label: 'if (условие1 && условие2)', correct: true },
          { id: 'c', label: 'if {условие1 or условие2}', correct: false }
        ],
        explanation: 'Логическите оператори && и || се използват вътре в условието.'
      },
      {
        id: 'q3',
        question: 'Какво прави операторът else?',
        answers: [
          { id: 'a', label: 'Прекъсва програмата', correct: false },
          { id: 'b', label: 'Изпълнява блок при истинно условие', correct: false },
          { id: 'c', label: 'Изпълнява блок при невярно условие', correct: true }
        ],
        explanation: 'Блокът else се активира, когато условието е невярно.'
      },
      {
        id: 'q4',
        question: 'Какво ще стане ако липсва else?',
        answers: [
          { id: 'a', label: 'Компилационна грешка', correct: false },
          { id: 'b', label: 'Кодът просто пропуска алтернативния блок', correct: true },
          { id: 'c', label: 'Цикъл се изпълнява безкрайно', correct: false }
        ],
        explanation: 'Else е опционален; при липса програмата продължава след блока.'
      },
      {
        id: 'q5',
        question: 'Как се нарича комбинация от множество влагания на if?',
        answers: [
          { id: 'a', label: 'Каскада', correct: true },
          { id: 'b', label: 'Цикъл', correct: false },
          { id: 'c', label: 'Рекурсия', correct: false }
        ],
        explanation: 'Каскадата от if позволява многократно разклоняване.'
      }
    ],
    bigO: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
      space: 'O(1)'
    }
  }
};
