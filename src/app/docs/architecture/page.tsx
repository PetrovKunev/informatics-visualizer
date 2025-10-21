import fs from 'fs/promises';
import path from 'path';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Архитектура на проекта | CS Visual Lab'
};

export default async function ArchitecturePage() {
  const filePath = path.join(process.cwd(), 'docs', 'architecture.md');
  const content = await fs.readFile(filePath, 'utf-8');

  return (
    <div className="container space-y-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Архитектура и структура</h1>
      <pre className="whitespace-pre-wrap rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-700 shadow-sm">
        {content}
      </pre>
    </div>
  );
}
