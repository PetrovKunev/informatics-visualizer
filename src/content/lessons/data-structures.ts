import type { LessonCollection } from '@/types/lesson';

export const dataStructureLessons: LessonCollection = {
  arrays: {
    slug: 'arrays',
    title: 'Масиви',
    summary:
      'Масивът е последователна структура от данни, достъпна чрез индекс и подходяща за линейно пресичане.',
    heroIllustration: '/diagrams/arrays.svg',
    estimatedTime: '18 мин',
    prerequisites: ['Цикли', 'Работа с индекси'],
    objectives: [
      'Достъп до елементи по индекс',
      'Търсене в масив (линейно и двоично)',
      'Добавяне и премахване на елементи'
    ],
    pseudocode: [
      { id: 'iterate', label: 'за i от 0 до n - 1' },
      { id: 'compare', label: 'сравни елемент[i] с търсената стойност' },
      { id: 'return', label: 'ако съвпада, върни i, иначе продължи' }
    ],
    sections: [
      {
        id: 'indexing',
        title: 'Достъп по индекс',
        content:
          'Достъпът по индекс в масива е операция с константна сложност O(1), тъй като адресът се изчислява директно.',
        objective: 'Управление на последователни данни.'
      },
      {
        id: 'search',
        title: 'Линейно срещу двоично търсене',
        content:
          'Линейното търсене проверява всеки елемент последователно, докато двоичното изисква сортиран масив и разделя диапазона наполовина.',
        objective: 'Избор на подходящ алгоритъм за търсене.'
      },
      {
        id: 'mutations',
        title: 'Вмъкване и изтриване',
        content:
          'Добавянето в края е O(1) (амортизирано), а в началото – O(n), защото елементите се преместват.',
        objective: 'Оценка на цената на модификациите.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Каква е сложността на линейното търсене в масив?',
        answers: [
          { id: 'a', label: 'O(1)', correct: false },
          { id: 'b', label: 'O(log n)', correct: false },
          { id: 'c', label: 'O(n)', correct: true }
        ],
        explanation: 'В най-лош случай се преглеждат всички елементи.'
      },
      {
        id: 'q2',
        question: 'Какво изисква двоичното търсене?',
        answers: [
          { id: 'a', label: 'Произволен ред на елементите', correct: false },
          { id: 'b', label: 'Сортиран масив', correct: true },
          { id: 'c', label: 'Уникални стойности', correct: false }
        ],
        explanation: 'Разделянето наполовина работи само при сортирани данни.'
      },
      {
        id: 'q3',
        question: 'Коя операция е O(1) при масив?',
        answers: [
          { id: 'a', label: 'Вмъкване в средата', correct: false },
          { id: 'b', label: 'Извличане по индекс', correct: true },
          { id: 'c', label: 'Сортиране', correct: false }
        ],
        explanation: 'Достъпът по индекс е моментален.'
      },
      {
        id: 'q4',
        question: 'Какво представлява амортизирана сложност?',
        answers: [
          { id: 'a', label: 'Средна стойност между най-добрия и най-лошия случай', correct: false },
          { id: 'b', label: 'Анализ на поредица от операции', correct: true },
          { id: 'c', label: 'Специален тип памет', correct: false }
        ],
        explanation: 'Амортизираният анализ разглежда множество операции наведнъж.'
      },
      {
        id: 'q5',
        question: 'Кога изтриването в масив е най-скъпо?',
        answers: [
          { id: 'a', label: 'В края', correct: false },
          { id: 'b', label: 'В началото', correct: true },
          { id: 'c', label: 'При празен масив', correct: false }
        ],
        explanation: 'При изтриване в началото трябва да се пренаредят останалите елементи.'
      }
    ],
    bigO: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)',
      space: 'O(n)'
    }
  },
  linkedList: {
    slug: 'linked-list',
    title: 'Свързан списък',
    summary:
      'Свързаният списък съхранява елементи чрез възли с препратки към следващия (и предишния) елемент.',
    heroIllustration: '/diagrams/linked-list.svg',
    estimatedTime: '20 мин',
    prerequisites: ['Указатели или референции', 'Основни структури'],
    objectives: [
      'Създаване на единично свързан списък',
      'Вмъкване в начало, край и среда',
      'Премахване и обход на списъка'
    ],
    pseudocode: [
      { id: 'node', label: 'struct Node { value, next }' },
      { id: 'insert', label: 'нов възел → сочи към стария head' },
      { id: 'update', label: 'head ← нов възел' }
    ],
    sections: [
      {
        id: 'structure',
        title: 'Структура на възела',
        content:
          'Всеки възел съдържа стойност и указател към следващия възел. Паметта не е последователна.',
        objective: 'Разбиране на референтната структура.'
      },
      {
        id: 'operations',
        title: 'Операции',
        content:
          'Вмъкването в началото и изтриването са O(1), а намирането на елемент е O(n), тъй като се обхожда списъкът.',
        objective: 'Управление на указатели за манипулация на възлите.'
      },
      {
        id: 'tradeoffs',
        title: 'Предимства и недостатъци',
        content:
          'Свързаните списъци са динамични и пестят преместването на елементи, но имат по-голям разход на памет.',
        objective: 'Избор между масив и списък спрямо контекста.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Каква е сложността за добавяне на нов възел в началото?',
        answers: [
          { id: 'a', label: 'O(1)', correct: true },
          { id: 'b', label: 'O(log n)', correct: false },
          { id: 'c', label: 'O(n)', correct: false }
        ],
        explanation: 'Head се актуализира директно.'
      },
      {
        id: 'q2',
        question: 'Как се намира елемент със стойност X?',
        answers: [
          { id: 'a', label: 'Чрез индекс', correct: false },
          { id: 'b', label: 'Чрез линейно обхождане', correct: true },
          { id: 'c', label: 'С двоично търсене', correct: false }
        ],
        explanation: 'Обхождаме докато намерим стойността.'
      },
      {
        id: 'q3',
        question: 'Какво става при липса на актуализиране на указателите при изтриване?',
        answers: [
          { id: 'a', label: 'Паметта се освобождава автоматично', correct: false },
          { id: 'b', label: 'Веригата се разкъсва и губим част от списъка', correct: true },
          { id: 'c', label: 'Списъкът се сортира', correct: false }
        ],
        explanation: 'Липсата на връзка води до загубени възли.'
      },
      {
        id: 'q4',
        question: 'Какъв е разходът на памет на възел?',
        answers: [
          { id: 'a', label: 'Само стойността', correct: false },
          { id: 'b', label: 'Стойност + референция', correct: true },
          { id: 'c', label: 'Две стойности', correct: false }
        ],
        explanation: 'Всеки възел съхранява стойност и указател.'
      },
      {
        id: 'q5',
        question: 'Кое е предимство на двусвързания списък?',
        answers: [
          { id: 'a', label: 'Няма нужда от памет', correct: false },
          { id: 'b', label: 'Обхождане в двете посоки', correct: true },
          { id: 'c', label: 'Автоматично сортиране', correct: false }
        ],
        explanation: 'Възлите имат next и prev, което улеснява обратното обхождане.'
      }
    ],
    bigO: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)',
      space: 'O(n)'
    }
  },
  stack: {
    slug: 'stack',
    title: 'Стек',
    summary:
      'Стекът работи по принципа последен влязъл – първи излязъл (LIFO) и се използва за управление на извикванията на функции.',
    heroIllustration: '/diagrams/stack.svg',
    estimatedTime: '12 мин',
    prerequisites: ['Масиви или списъци'],
    objectives: ['push/pop операции', 'Следене на капацитет', 'Детекция на под- и преливане'],
    pseudocode: [
      { id: 'push', label: 'push(x): постави x на върха' },
      { id: 'pop', label: 'pop(): премахни и върни върха' }
    ],
    sections: [
      {
        id: 'usage',
        title: 'Приложения',
        content:
          'Стекът се използва за рекурсивни извиквания, отмяна на операции и парсинг на изрази.',
        objective: 'Създаване на практически асоциации.'
      },
      {
        id: 'implementation',
        title: 'Имплементация',
        content:
          'Може да се реализира върху масив или списък. Капацитетът се проверява за да се избегне overflow.',
        objective: 'Избор на подходяща базова структура.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Как се нарича премахването на елемент от стека?',
        answers: [
          { id: 'a', label: 'enqueue', correct: false },
          { id: 'b', label: 'pop', correct: true },
          { id: 'c', label: 'dequeue', correct: false }
        ],
        explanation: 'pop премахва върха.'
      },
      {
        id: 'q2',
        question: 'Каква е сложността на push?',
        answers: [
          { id: 'a', label: 'O(1)', correct: true },
          { id: 'b', label: 'O(n)', correct: false },
          { id: 'c', label: 'O(log n)', correct: false }
        ],
        explanation: 'Добавяме елемент на върха незабавно.'
      },
      {
        id: 'q3',
        question: 'Какво е overflow?',
        answers: [
          { id: 'a', label: 'Когато стекът е празен', correct: false },
          { id: 'b', label: 'Когато капацитетът е надвишен', correct: true },
          { id: 'c', label: 'Когато средният случай е O(n)', correct: false }
        ],
        explanation: 'Не може да се добавя при пълен стек.'
      },
      {
        id: 'q4',
        question: 'Как се проверява дали стекът е празен?',
        answers: [
          { id: 'a', label: 'size === 0', correct: true },
          { id: 'b', label: 'top === capacity', correct: false },
          { id: 'c', label: 'front === rear', correct: false }
        ],
        explanation: 'Размерът 0 означава празен стек.'
      },
      {
        id: 'q5',
        question: 'Кое е пример за използване на стек?',
        answers: [
          { id: 'a', label: 'Планиране на задачи по FIFO', correct: false },
          { id: 'b', label: 'Обратен полски запис', correct: true },
          { id: 'c', label: 'Търсене в граф ширина първо', correct: false }
        ],
        explanation: 'Стекът подпомага парсинга на изрази.'
      }
    ],
    bigO: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
      space: 'O(n)'
    }
  },
  queue: {
    slug: 'queue',
    title: 'Опашка',
    summary:
      'Опашката работи по принципа първи влязъл – първи излязъл (FIFO) и се прилага при управление на задачи.',
    heroIllustration: '/diagrams/queue.svg',
    estimatedTime: '12 мин',
    prerequisites: ['Масиви или списъци'],
    objectives: ['enqueue/dequeue операции', 'Кръгова опашка', 'Детекция на underflow'],
    pseudocode: [
      { id: 'enqueue', label: 'enqueue(x): добави x в края' },
      { id: 'dequeue', label: 'dequeue(): премахни и върни първия' }
    ],
    sections: [
      {
        id: 'circular',
        title: 'Кръгова опашка',
        content:
          'Кръговата опашка използва масив и два индекса (front и rear), които се въртят при достигане на края.',
        objective: 'Оптимизиране на използваната памет.'
      },
      {
        id: 'applications',
        title: 'Приложения',
        content:
          'Опашките са основа за BFS, управление на заявки до сървъри и буфериране.',
        objective: 'Свързване с реални сценарии.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Каква е сложността на dequeue?',
        answers: [
          { id: 'a', label: 'O(1)', correct: true },
          { id: 'b', label: 'O(n)', correct: false },
          { id: 'c', label: 'O(log n)', correct: false }
        ],
        explanation: 'Премахва се първият елемент без преместване при подходяща имплементация.'
      },
      {
        id: 'q2',
        question: 'Какво е underflow?',
        answers: [
          { id: 'a', label: 'Опашката е пълна', correct: false },
          { id: 'b', label: 'Опашката е празна и се прави dequeue', correct: true },
          { id: 'c', label: 'Опашката е сортирана', correct: false }
        ],
        explanation: 'Не можем да премахваме от празна опашка.'
      },
      {
        id: 'q3',
        question: 'Кой алгоритъм използва опашка?',
        answers: [
          { id: 'a', label: 'DFS', correct: false },
          { id: 'b', label: 'BFS', correct: true },
          { id: 'c', label: 'Бързо сортиране', correct: false }
        ],
        explanation: 'Breadth-First Search се базира на опашка.'
      },
      {
        id: 'q4',
        question: 'Как се отбелязва празна кръгова опашка?',
        answers: [
          { id: 'a', label: 'front === rear', correct: true },
          { id: 'b', label: 'rear === capacity', correct: false },
          { id: 'c', label: 'front === 0', correct: false }
        ],
        explanation: 'Когато двата индекса съвпадат, няма елементи.'
      },
      {
        id: 'q5',
        question: 'Какво е предимство на опашката пред стека?',
        answers: [
          { id: 'a', label: 'Поддържа FIFO ред за задачи', correct: true },
          { id: 'b', label: 'Изисква по-малко памет', correct: false },
          { id: 'c', label: 'Премахва два елемента наведнъж', correct: false }
        ],
        explanation: 'Опашката обслужва задачите в реда на постъпване.'
      }
    ],
    bigO: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
      space: 'O(n)'
    }
  },
  hashTable: {
    slug: 'hash-table',
    title: 'Хеш таблица',
    summary:
      'Хеш таблицата осигурява достъп до данни чрез хеш функция и управление на колизиите.',
    heroIllustration: '/diagrams/hash-table.svg',
    estimatedTime: '25 мин',
    prerequisites: ['Функции', 'Масиви'],
    objectives: [
      'Хеширане на ключове',
      'Колизии и техники за разрешаването им',
      'Амортизиран анализ на операциите'
    ],
    pseudocode: [
      { id: 'hash', label: 'index ← hash(key) % capacity' },
      { id: 'collision', label: 'ако заето → приложи стратегия' },
      { id: 'store', label: 'постави двойката (key, value)' }
    ],
    sections: [
      {
        id: 'hash-functions',
        title: 'Хеш функции',
        content:
          'Хеш функцията преобразува ключа до индекс. Добрата функция минимизира колизиите и разпределя равномерно.',
        objective: 'Разбиране на критериите за добра хеш функция.'
      },
      {
        id: 'collisions',
        title: 'Колизии',
        content:
          'Колизиите се разрешават чрез верижно свързване или отворено адресиране (линейно, квадратично, двойно хеширане).',
        objective: 'Избор на стратегия според случая.'
      },
      {
        id: 'analysis',
        title: 'Анализ',
        content:
          'Очакваната сложност при равномерно разпределение е O(1), но при влошено хеширане може да достигне O(n).',
        objective: 'Разбиране на амортизирания анализ.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Какво е натоварване (load factor)?',
        answers: [
          { id: 'a', label: 'Брой ключове / капацитет', correct: true },
          { id: 'b', label: 'Размер на масива', correct: false },
          { id: 'c', label: 'Сумата на ключовете', correct: false }
        ],
        explanation: 'Load factor = n / m определя колко е пълна таблицата.'
      },
      {
        id: 'q2',
        question: 'Какъв е най-често използваният метод за колизии?',
        answers: [
          { id: 'a', label: 'Двоично дърво', correct: false },
          { id: 'b', label: 'Верижно свързване', correct: true },
          { id: 'c', label: 'Рекурсия', correct: false }
        ],
        explanation: 'Верижното свързване пази списък от елементи.'
      },
      {
        id: 'q3',
        question: 'Какво става при лоша хеш функция?',
        answers: [
          { id: 'a', label: 'Всички ключове имат различни индекси', correct: false },
          { id: 'b', label: 'Честите колизии забавят операциите', correct: true },
          { id: 'c', label: 'Таблицата става динамика', correct: false }
        ],
        explanation: 'Колизиите увеличават времето за достъп.'
      },
      {
        id: 'q4',
        question: 'Кога се прави rehash?',
        answers: [
          { id: 'a', label: 'При намаляване на натоварването', correct: false },
          { id: 'b', label: 'При превишаване на допустимия фактор', correct: true },
          { id: 'c', label: 'На всеки 100 операции', correct: false }
        ],
        explanation: 'Увеличава се капацитетът и ключовете се преразпределят.'
      },
      {
        id: 'q5',
        question: 'Коя операция има амортизирана сложност O(1)?',
        answers: [
          { id: 'a', label: 'find(key)', correct: true },
          { id: 'b', label: 'sort()', correct: false },
          { id: 'c', label: 'dfs()', correct: false }
        ],
        explanation: 'Търсенето е константно при добро хеширане.'
      }
    ],
    bigO: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(n)',
      space: 'O(n)'
    }
  },
  // TODO: Добавяне на уроци за дървета, графи и свързани визуализации.
};
