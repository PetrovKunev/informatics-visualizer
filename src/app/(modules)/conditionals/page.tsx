import type { Metadata } from 'next';
import { ConditionalsVisualizer } from '@/components/visualizers/conditionals/conditionals-visualizer';
import { QuizCard } from '@/components/quiz/quiz-card';
import { conditionalsLessons } from '@/content/lessons/conditionals';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ComplexityBadge } from '@/components/common/complexity-badge';
import { MonacoSnippet } from '@/components/common/monaco-snippet';

const CONDITIONALS_CSHARP_CODE = `static string CheckAccess(int age, bool hasTicket)
{
    if (age < 18)
    {
        return "Нужен е придружител.";
    }

    if (hasTicket)
    {
        return "Добре дошли!";
    }

    return "Моля, закупете билет.";
}`;

export const metadata: Metadata = {
  title: 'Условни оператори | CS Visual Lab',
  description:
    'Интерактивна визуализация на условни оператори, таблици на истинност и куиз за проверка на знанията.'
};

export default function ConditionalsModulePage() {
  const lesson = conditionalsLessons.basics;

  if (!lesson) {
    throw new Error('Липсва дефиниция за урока в модула „Условия“.');
  }

  return (
    <div className="container space-y-12 py-12">
      <section className="space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-700">
          Модул: Условия
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          {lesson.title}
        </h1>
        <p className="max-w-3xl text-lg text-slate-600">{lesson.summary}</p>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span>Очаквано време: {lesson.estimatedTime}</span>
          <span className="hidden h-1 w-1 rounded-full bg-slate-300 md:inline-block" />
          <span>Предпоставки: {lesson.prerequisites.join(', ')}</span>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Цели на урока</CardTitle>
            <CardDescription>Какво ще постигнете след визуализацията.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-inside list-disc space-y-2 text-sm text-slate-600">
              {lesson.objectives.map((objective) => (
                <li key={objective}>{objective}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Сложност</CardTitle>
            <CardDescription>Условните оператори работят в константно време.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <ComplexityBadge label="Най-добър" value={lesson.bigO.best} />
            <ComplexityBadge label="Среден" value={lesson.bigO.average} />
            <ComplexityBadge label="Най-лош" value={lesson.bigO.worst} />
            <ComplexityBadge label="Памет" value={lesson.bigO.space} />
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Визуализация</h2>
        <ConditionalsVisualizer />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Пример на C# код</h2>
        <p className="text-sm text-slate-600">
          Сравнете условните оператори във визуализацията с реална C# имплементация.
        </p>
        <MonacoSnippet language="csharp" title="Условни оператори (C#)" code={CONDITIONALS_CSHARP_CODE} />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-900">Разгледай детайлите</h2>
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
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Провери знанията си</h2>
        <QuizCard questions={lesson.quiz} />
      </section>
    </div>
  );
}
