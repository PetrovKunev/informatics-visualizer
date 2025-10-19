import type { LessonCollection } from '@/types/lesson';

export const algorithmLessons: LessonCollection = {
  linearSearch: {
    slug: 'linear-search',
    title: 'Линейно търсене',
    summary:
      'Линейното търсене проверява последователно всеки елемент, докато намери търсената стойност.',
    heroIllustration: '/diagrams/linear-search.svg',
    estimatedTime: '10 мин',
    prerequisites: ['Масиви', 'Цикли'],
    objectives: [
      'Разбиране на линейното обхождане',
      'Оценка на сложността O(n)',
      'Сравнение с двоично търсене'
    ],
    pseudocode: [
      { id: 'loop', label: 'за всеки елемент в масива' },
      { id: 'check', label: 'ако елемент == търсената стойност → върни индекса' },
      { id: 'not-found', label: 'ако няма съвпадение → върни -1' }
    ],
    sections: [
      {
        id: 'steps',
        title: 'Алгоритъм стъпка по стъпка',
        content:
          'Методът е прост: започваме от първия елемент и сравняваме, докато намерим съвпадение или стигнем края.',
        objective: 'Следене на индекс и сравнения.'
      },
      {
        id: 'analysis',
        title: 'Сложност',
        content:
          'В най-добрия случай стойността е на първа позиция (O(1)), а в най-лошия – отсъства (O(n)).',
        objective: 'Оценка на времевата цена.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Какво връща линейното търсене при ненамерен елемент?',
        answers: [
          { id: 'a', label: '0', correct: false },
          { id: 'b', label: '-1', correct: true },
          { id: 'c', label: 'undefined', correct: false }
        ],
        explanation: 'Условие за неуспех.'
      },
      {
        id: 'q2',
        question: 'Как калкулираме сложността?',
        answers: [
          { id: 'a', label: 'Брой сравнения = n в най-лош случай', correct: true },
          { id: 'b', label: 'Логаритъм от n', correct: false },
          { id: 'c', label: 'Константа', correct: false }
        ],
        explanation: 'В най-лош случай се сравняват всички елементи.'
      }
    ],
    bigO: {
      best: 'O(1)',
      average: 'O(n/2)',
      worst: 'O(n)',
      space: 'O(1)'
    }
  },
  binarySearch: {
    slug: 'binary-search',
    title: 'Двоично търсене',
    summary:
      'Двоичното търсене използва стратегия „разделяй и владей“ върху сортиран масив за бързо намиране на стойност.',
    heroIllustration: '/diagrams/binary-search.svg',
    estimatedTime: '15 мин',
    prerequisites: ['Масиви', 'Сортиране'],
    objectives: [
      'Разделяне на диапазона наполовина',
      'Обработка на среден индекс',
      'Сравнение с линейно търсене'
    ],
    pseudocode: [
      { id: 'init', label: 'left = 0, right = n - 1' },
      { id: 'loop', label: 'докато left <= right' },
      { id: 'mid', label: 'mid = floor((left + right) / 2)' },
      { id: 'compare', label: 'ако arr[mid] == target → върни mid' },
      { id: 'branch', label: 'ако arr[mid] < target → left = mid + 1, иначе right = mid - 1' }
    ],
    sections: [
      {
        id: 'requirements',
        title: 'Изисквания',
        content:
          'Нужен е сортиран масив и достъп по индекс. При несортирани данни алгоритъмът не работи коректно.',
        objective: 'Правилно прилагане на двоичното търсене.'
      },
      {
        id: 'analysis',
        title: 'Сложност',
        content:
          'При всяка итерация размерът се дели на две, което води до сложност O(log n).',
        objective: 'Осъзнаване на предимството пред линейното търсене.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Кога двоичното търсене не работи?',
        answers: [
          { id: 'a', label: 'При сортиран масив', correct: false },
          { id: 'b', label: 'При несортиран масив', correct: true },
          { id: 'c', label: 'При масив с отрицателни стойности', correct: false }
        ],
        explanation: 'Изисква предварително сортиране.'
      },
      {
        id: 'q2',
        question: 'Какво се случва ако target е по-малък от arr[mid]?',
        answers: [
          { id: 'a', label: 'left = mid + 1', correct: false },
          { id: 'b', label: 'right = mid - 1', correct: true },
          { id: 'c', label: 'Връща -1', correct: false }
        ],
        explanation: 'Търсим в лявата половина.'
      }
    ],
    bigO: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)',
      space: 'O(1)'
    }
  },
  sorting: {
    slug: 'sorting',
    title: 'Сортиране',
    summary:
      'Сравнение на основните алгоритми за сортиране: балонно, избор, вмъкване, сливане и бързо сортиране.',
    heroIllustration: '/diagrams/sorting.svg',
    estimatedTime: '30 мин',
    prerequisites: ['Масиви', 'Цикли', 'Рекурсия'],
    objectives: [
      'Проследяване на основните стъпки при сортиране',
      'Разбиране на сложността и стабилността',
      'Интерактивно сравнение на резултатите'
    ],
    pseudocode: [
      { id: 'compare', label: 'сравни съседни елементи' },
      { id: 'swap', label: 'размени ако са в грешен ред' },
      { id: 'repeat', label: 'повтори до подреждане' }
    ],
    sections: [
      {
        id: 'bubble',
        title: 'Балонно сортиране',
        content:
          'Повтарящи се сравнения и размени на съседни елементи. Лесно за разбиране, но бавно при големи масиви.',
        objective: 'Проследяване на итерациите.'
      },
      {
        id: 'selection',
        title: 'Сортиране чрез избор',
        content:
          'Намира се минималният елемент и се поставя в началото, след което процесът продължава за останалите.',
        objective: 'Разбиране на избора на минимум.'
      },
      {
        id: 'insertion',
        title: 'Сортиране чрез вмъкване',
        content:
          'Изгражда се сортирана част чрез вмъкване на всеки следващ елемент на правилното място.',
        objective: 'Наблюдение на сравнението за вмъкване.'
      },
      {
        id: 'merge',
        title: 'Сливане',
        content:
          'Рекурсивно разделяне на масива и сливане на подредени подмасиви. Сложност O(n log n).',
        objective: 'Проследяване на рекурсивните извиквания.'
      },
      {
        id: 'quick',
        title: 'Бързо сортиране',
        content:
          'Избира се пивот, разделя се масивът на по-малки и по-големи елементи и се сортират рекурсивно.',
        objective: 'Разбиране на избор на пивот и подразделяне.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Кой алгоритъм е стабилен по подразбиране?',
        answers: [
          { id: 'a', label: 'Бързо сортиране', correct: false },
          { id: 'b', label: 'Сортиране чрез вмъкване', correct: true },
          { id: 'c', label: 'Сортиране чрез избор', correct: false }
        ],
        explanation: 'Insertion sort запазва относителния ред.'
      },
      {
        id: 'q2',
        question: 'Кой алгоритъм има най-добра средна сложност?',
        answers: [
          { id: 'a', label: 'Merge sort', correct: true },
          { id: 'b', label: 'Bubble sort', correct: false },
          { id: 'c', label: 'Selection sort', correct: false }
        ],
        explanation: 'Merge sort гарантира O(n log n).'
      },
      {
        id: 'q3',
        question: 'Какво е предимство на quick sort?',
        answers: [
          { id: 'a', label: 'Не използва рекурсия', correct: false },
          { id: 'b', label: 'Често е най-бърз на практика', correct: true },
          { id: 'c', label: 'Изисква допълнителна памет O(n)', correct: false }
        ],
        explanation: 'При добър избор на пивот quick sort е много ефективен.'
      }
    ],
    bigO: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n^2)',
      space: 'O(n)'
    }
  }
  // TODO: Добавяне на BFS и DFS визуализации с графи.
};
