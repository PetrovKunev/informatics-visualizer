"use client";

import { useState } from 'react';
import type { LessonQuizQuestion } from '@/types/lesson';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { sendToast } from '@/components/common/toaster';

interface QuizCardProps {
  questions: LessonQuizQuestion[];
}

export function QuizCard({ questions }: QuizCardProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = () => {
    setShowResults(true);
    const correctCount = questions.reduce((acc, question) => {
      const selected = answers[question.id];
      const correct = question.answers.find((answer) => answer.correct)?.id;
      return acc + (selected === correct ? 1 : 0);
    }, 0);
    sendToast(`Верни отговори: ${correctCount} / ${questions.length}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Кратък куиз</CardTitle>
        <CardDescription>
          Тествайте знанията си по темата. Отговорете на всички въпроси и натиснете „Провери“.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((question, index) => (
          <div key={question.id} className="space-y-3">
            <p className="text-sm font-semibold text-slate-900">
              Въпрос {index + 1}: {question.question}
            </p>
            <div className="space-y-2">
              {question.answers.map((answer) => {
                const checked = answers[question.id] === answer.id;
                const correct = showResults && answer.correct;
                const incorrect = showResults && checked && !answer.correct;
                return (
                  <label
                    key={answer.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-3 py-2 text-sm transition ${
                      checked ? 'border-brand-500 bg-brand-50' : 'border-slate-200 bg-white'
                    } ${correct ? 'border-emerald-500 bg-emerald-50' : ''} ${
                      incorrect ? 'border-red-400 bg-red-50' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={answer.id}
                      checked={checked}
                      onChange={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          [question.id]: answer.id
                        }))
                      }
                      className="h-4 w-4"
                    />
                    <span>{answer.label}</span>
                  </label>
                );
              })}
            </div>
            {showResults ? (
              <p className="text-xs text-slate-500">
                {question.explanation}
              </p>
            ) : null}
          </div>
        ))}
        <Button onClick={handleSubmit} className="w-full md:w-auto">
          Провери резултата
        </Button>
      </CardContent>
    </Card>
  );
}
