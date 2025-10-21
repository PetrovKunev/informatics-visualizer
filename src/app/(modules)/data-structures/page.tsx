import type { Metadata } from 'next';
import { ArrayVisualizer } from '@/components/visualizers/data-structures/array-visualizer';
import { LinkedListVisualizer } from '@/components/visualizers/data-structures/linked-list-visualizer';
import { StackVisualizer } from '@/components/visualizers/data-structures/stack-visualizer';
import { QueueVisualizer } from '@/components/visualizers/data-structures/queue-visualizer';
import { QuizCard } from '@/components/quiz/quiz-card';
import { dataStructureLessons } from '@/content/lessons/data-structures';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ComplexityBadge } from '@/components/common/complexity-badge';
import { MonacoSnippet } from '@/components/common/monaco-snippet';

export const metadata: Metadata = {
  title: 'Структури от данни | CS Visual Lab',
  description:
    'Интерактивни визуализации за масиви, свързани списъци, стек и опашка с анализ на операции.'
};

const STRUCTURE_KEYS = ['arrays', 'linkedList', 'stack', 'queue'] as const;

type StructureKey = (typeof STRUCTURE_KEYS)[number];

const VISUALIZERS: Record<StructureKey, JSX.Element> = {
  arrays: <ArrayVisualizer />,
  linkedList: <LinkedListVisualizer />,
  stack: <StackVisualizer />,
  queue: <QueueVisualizer />
};

const STRUCTURE_CODE_SNIPPETS: Record<
  StructureKey,
  { title: string; code: string }
> = {
  arrays: {
    title: 'Работа с масив (C#)',
    code: `static int FindMax(int[] values)
{
    var max = int.MinValue;
    for (var i = 0; i < values.Length; i++)
    {
        if (values[i] > max)
        {
            max = values[i];
        }
    }
    return max;
}`
  },
  linkedList: {
    title: 'Свързан списък (C#)',
    code: `using System.Collections.Generic;

static LinkedList<int> BuildList(int[] values)
{
    var list = new LinkedList<int>();
    foreach (var value in values)
    {
        list.AddLast(value);
    }
    return list;
}`
  },
  stack: {
    title: 'Стек операции (C#)',
    code: `using System;
using System.Collections.Generic;

static void EvaluateStack()
{
    var stack = new Stack<string>();
    stack.Push("HTML");
    stack.Push("CSS");
    stack.Push("JS");

    while (stack.Count > 0)
    {
        Console.WriteLine(stack.Pop());
    }
}`
  },
  queue: {
    title: 'Опашка операции (C#)',
    code: `using System;
using System.Collections.Generic;

static void ServeQueue()
{
    var queue = new Queue<string>();
    queue.Enqueue("Анна");
    queue.Enqueue("Борис");
    queue.Enqueue("Галя");

    while (queue.Count > 0)
    {
        Console.WriteLine(queue.Dequeue());
    }
}`
  }
};

export default function DataStructuresModulePage() {
  return (
    <div className="container space-y-12 py-12">
      <section className="space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-700">
          Модул: Структури от данни
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Основни структури от данни
        </h1>
        <p className="max-w-3xl text-lg text-slate-600">
          Изследвайте поведението на масиви, свързани списъци, стекове и опашки. Контролирайте всяка
          операция и наблюдавайте как състоянието се променя стъпка по стъпка.
        </p>
      </section>

      {STRUCTURE_KEYS.map((key) => {
        const lesson = dataStructureLessons[key];
        if (!lesson) return null;
        return (
          <section key={key} className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">{lesson.title}</h2>
              <p className="max-w-3xl text-sm text-slate-600">{lesson.summary}</p>
              <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                <span>Цели: {lesson.objectives.join(' • ')}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <ComplexityBadge label="Среден случай" value={lesson.bigO.average} />
                <ComplexityBadge label="Най-лош" value={lesson.bigO.worst} />
                <ComplexityBadge label="Памет" value={lesson.bigO.space} />
              </div>
            </div>
            {VISUALIZERS[key]}
            <div className="space-y-3">
              <p className="text-sm text-slate-600">
                Приложете показаните операции в реална C# имплементация.
              </p>
              <MonacoSnippet
                language="csharp"
                title={STRUCTURE_CODE_SNIPPETS[key].title}
                code={STRUCTURE_CODE_SNIPPETS[key].code}
              />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {lesson.sections.map((section) => (
                <Card key={section.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    <CardDescription>{section.objective}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600">{section.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <QuizCard questions={lesson.quiz} />
          </section>
        );
      })}

      <section className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
        <p className="font-semibold text-slate-700">Предстоящи теми</p>
        <p>TODO: Хеш таблици – допълнителни визуализации, дървета, графи, BFS/DFS.</p>
      </section>
    </div>
  );
}
