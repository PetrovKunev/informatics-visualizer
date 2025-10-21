import type { Metadata } from 'next';
import { SortingVisualizer } from '@/components/visualizers/algorithms/sorting-visualizer';
import { ArrayVisualizer } from '@/components/visualizers/data-structures/array-visualizer';
import { QuizCard } from '@/components/quiz/quiz-card';
import { algorithmLessons } from '@/content/lessons/algorithms';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ComplexityBadge } from '@/components/common/complexity-badge';
import { MonacoSnippet } from '@/components/common/monaco-snippet';

const QUICK_SORT_TS_CODE = `function quickSort(array: number[]): number[] {
  if (array.length <= 1) return array;
  const pivot = array[array.length - 1];
  const left: number[] = [];
  const right: number[] = [];
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] <= pivot) left.push(array[i]);
    else right.push(array[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}`;

const QUICK_SORT_CSHARP_CODE = `using System;
using System.Collections.Generic;
using System.Linq;

public static class Sorter
{
    public static int[] QuickSort(int[] array)
    {
        if (array.Length <= 1) return array;

        var pivot = array[^1];
        var left = new List<int>();
        var right = new List<int>();

        for (var i = 0; i < array.Length - 1; i++)
        {
            if (array[i] <= pivot)
            {
                left.Add(array[i]);
            }
            else
            {
                right.Add(array[i]);
            }
        }

        return QuickSort(left.ToArray())
            .Concat(new[] { pivot })
            .Concat(QuickSort(right.ToArray()))
            .ToArray();
    }
}`;

export const metadata: Metadata = {
  title: 'Алгоритми за търсене и сортиране | CS Visual Lab',
  description:
    'Симулации на линейно и двоично търсене, пет класически алгоритъма за сортиране и куиз въпроси.'
};

export default function AlgorithmsModulePage() {
  const searchLesson = algorithmLessons.linearSearch;
  const binaryLesson = algorithmLessons.binarySearch;
  const sortingLesson = algorithmLessons.sorting;

  if (!searchLesson || !binaryLesson || !sortingLesson) {
    throw new Error('Липсват дефиниции за уроците в модула „Алгоритми“.');
  }

  return (
    <div className="container space-y-12 py-12">
      <section className="space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-700">
          Модул: Алгоритми
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Търсене и сортиране с визуален псевдокод
        </h1>
        <p className="max-w-3xl text-lg text-slate-600">
          Сравнете линейното и двоичното търсене, след което експериментирайте с пет алгоритъма за
          сортиране. Проследете всяка операция, наблюдавайте псевдокода и анализирайте сложността.
        </p>
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-900">Търсене в масив</h2>
          <p className="text-sm text-slate-600">
            {searchLesson.summary} Сравнете го с {binaryLesson.summary.toLowerCase()}.
          </p>
          <div className="flex flex-wrap gap-2">
            <ComplexityBadge label="Линейно" value={searchLesson.bigO.average} />
            <ComplexityBadge label="Двоично" value={binaryLesson.bigO.average} />
          </div>
        </div>
        <ArrayVisualizer />
        <div className="grid gap-6 md:grid-cols-2">
          {[searchLesson, binaryLesson].map((lesson) => (
            <Card key={lesson.slug}>
              <CardHeader>
                <CardTitle className="text-lg">{lesson.title}</CardTitle>
                <CardDescription>{lesson.objectives.join(' • ')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-inside list-disc space-y-2 text-sm text-slate-600">
                  {lesson.sections.map((section) => (
                    <li key={section.id}>{section.title}: {section.content}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-900">Алгоритми за сортиране</h2>
          <p className="text-sm text-slate-600">{sortingLesson.summary}</p>
          <div className="flex flex-wrap gap-2">
            <ComplexityBadge label="Средна сложност" value={sortingLesson.bigO.average} />
            <ComplexityBadge label="Най-лош случай" value={sortingLesson.bigO.worst} />
            <ComplexityBadge label="Памет" value={sortingLesson.bigO.space} />
          </div>
        </div>
        <SortingVisualizer />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sortingLesson.sections.map((section) => (
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
        <div className="grid gap-6 lg:grid-cols-2">
          <MonacoSnippet title="Quick Sort (TypeScript)" code={QUICK_SORT_TS_CODE} />
          <MonacoSnippet language="csharp" title="Quick Sort (C#)" code={QUICK_SORT_CSHARP_CODE} />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <QuizCard questions={searchLesson.quiz} />
        <QuizCard questions={sortingLesson.quiz} />
      </section>

      <section className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
        <p className="font-semibold text-slate-700">Предстоящи теми</p>
        <p>TODO: Добавяне на визуализации за BFS и DFS върху графи.</p>
      </section>
    </div>
  );
}
