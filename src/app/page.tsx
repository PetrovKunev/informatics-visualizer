import Link from 'next/link';
import { ArrowRight, BrainCircuit, Layers, ListChecks, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SITE_LINKS } from '@/constants/site';

const MODULE_DETAILS = [
  {
    icon: <Workflow className="h-6 w-6 text-brand-600" aria-hidden />,
    title: 'Условни конструкции',
    description: 'Логически разклонения, диаграми и таблици на истинност за if / else.'
  },
  {
    icon: <ListChecks className="h-6 w-6 text-brand-600" aria-hidden />,
    title: 'Цикли и повторения',
    description: 'Визуализации на for/while, броячи и контрол на итерациите.'
  },
  {
    icon: <Layers className="h-6 w-6 text-brand-600" aria-hidden />,
    title: 'Структури от данни',
    description: 'Масиви, свързани списъци, стекове, опашки и подготвените TODO теми.'
  },
  {
    icon: <BrainCircuit className="h-6 w-6 text-brand-600" aria-hidden />,
    title: 'Алгоритми',
    description: 'Търсене и сортиране с псевдокод, сложност и интерактивни стъпки.'
  }
];

export default function HomePage() {
  return (
    <div className="container space-y-16 py-12">
      <section className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-700">
            Ново: Интерактивни визуализации
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            CS Visual Lab – лаборатория за визуално обучение по информатика
          </h1>
          <p className="max-w-xl text-lg text-slate-600">
            Усвоявайте ключови концепции от програмирането, структурите от данни и алгоритмите чрез
            анимирани сценарии, псевдокод, аналитика на сложността и интерактивни куизове. Всичко е
            на български и оптимизирано за следващия ви проект или изпит.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg" asChild>
              <Link href="/algorithms">
                Започни с алгоритмите
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#modules">Разгледай модулите</Link>
            </Button>
          </div>
          <p className="text-sm text-slate-500">
            Изградено с Next.js 14, Tailwind, shadcn/ui, Framer Motion и Zustand. Готово за Vercel.
          </p>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-100 via-white to-brand-50 blur-xl" />
          <div className="relative rounded-3xl border border-brand-200 bg-white p-8 shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-500">
              Какво ще научите
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>• Оптимизиране на мисленето чрез визуални сценарии и псевдокод.</li>
              <li>• Преход от теория към практика с интерактивни контролери.</li>
              <li>• Анализ на сложност и подготовка за технически интервюта.</li>
            </ul>
            <div className="mt-6 rounded-2xl bg-slate-900 px-4 py-5 text-sm text-white">
              <p className="font-semibold">Модулни уроци</p>
              <p className="text-slate-200">
                Всеки модул включва интерактивна визуализация, псевдокод и мини куиз.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="modules" className="space-y-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Модули</h2>
            <p className="text-sm text-slate-500">
              Четири основни теми, всяка с визуализация, псевдокод и изпитни въпроси.
            </p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/docs/architecture">Как е изградена платформата?</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {MODULE_DETAILS.map((module, index) => (
            <Card key={module.title} className="relative overflow-hidden">
              <CardHeader>
                <div className="mb-4 inline-flex items-center justify-center rounded-full bg-brand-50 p-3">
                  {module.icon}
                </div>
                <CardTitle>{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild className="w-full">
                  <Link href={SITE_LINKS[index]?.href.replace('/(modules)', '') ?? '#'}>
                    Отвори модула
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-slate-900">Как работи CS Visual Lab?</h3>
          <p className="text-sm text-slate-600">
            Изберете тема, стартирайте визуализацията, променяйте скоростта, изпълнявайте всяка стъпка,
            след което проверете знанията си с кратък куиз. Поддържат се предпочитания за достъпност,
            включително намалена анимация и клавишна навигация.
          </p>
          <p className="text-sm text-slate-600">
            Платформата е създадена за преподаватели, ученици и любители, които търсят интуитивен начин
            да разберат основите на програмирането и алгоритмите.
          </p>
        </div>
        <div className="grid gap-4 text-sm text-slate-600">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="font-semibold text-slate-900">Контролери</p>
            <p>Стартирайте, паузирайте, изпълнявайте стъпка и нулирайте – всичко от един панел.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="font-semibold text-slate-900">Псевдокод и сложност</p>
            <p>Следете подчертаните редове и сравнявайте Big-O характеристики.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="font-semibold text-slate-900">Куизове</p>
            <p>5–7 въпроса затвърждават знанията веднага след визуализацията.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
