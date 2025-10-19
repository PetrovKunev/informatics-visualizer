"use client";

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const MonacoEditor = dynamic(() => import('@monaco-editor/react').then((mod) => mod.default), {
  ssr: false,
  loading: () => <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500">Зареждане на редактора...</div>
});

interface MonacoSnippetProps {
  language?: string;
  code: string;
  title?: string;
}

export function MonacoSnippet({ language = 'typescript', code, title = 'Примерен код' }: MonacoSnippetProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">{title}</p>
        <Button variant="outline" size="sm" onClick={() => setVisible((prev) => !prev)}>
          {visible ? 'Скрий редактора' : 'Покажи редактора'}
        </Button>
      </div>
      {visible ? (
        <div className="rounded-2xl border border-slate-200 shadow-sm">
          <MonacoEditor height="280px" theme="vs-dark" defaultLanguage={language} defaultValue={code} options={{ minimap: { enabled: false }, readOnly: true }} />
        </div>
      ) : null}
    </div>
  );
}
