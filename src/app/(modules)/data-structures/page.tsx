import { Metadata } from 'next';
import { ArrayVisualizer } from '@/components/visualizers/data-structures/array-visualizer';
import { LinkedListVisualizer } from '@/components/visualizers/data-structures/linked-list-visualizer';
import { StackVisualizer } from '@/components/visualizers/data-structures/stack-visualizer';
import { QueueVisualizer } from '@/components/visualizers/data-structures/queue-visualizer';
import { QuizCard } from '@/components/quiz/quiz-card';
import { dataStructureLessons } from '@/content/lessons/data-structures';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ComplexityBadge } from '@/components/common/complexity-badge';

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
