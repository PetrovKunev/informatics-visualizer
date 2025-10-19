"use client";

import { cn } from '@/lib/utils';
import type { PseudocodeStep } from '@/types/visualizer';

interface PseudocodePanelProps {
  steps: PseudocodeStep[];
  activeStepId?: string;
}

export function PseudocodePanel({ steps, activeStepId }: PseudocodePanelProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-900 p-4 text-sm text-slate-100 shadow-inner">
      <p className="mb-3 text-xs uppercase tracking-wide text-slate-400">Псевдокод</p>
      <ol className="space-y-1">
        {steps.map((step) => {
          const isActive = step.id === activeStepId;
          return (
            <li
              key={step.id}
              className={cn(
                'rounded-xl px-3 py-2 transition-colors',
                isActive ? 'bg-brand-500/30 text-white' : 'bg-slate-800/40'
              )}
            >
              <span className="font-mono text-xs text-slate-300">#{step.id}</span>
              <p className="font-medium">{step.label}</p>
              {step.description ? (
                <p className="text-xs text-slate-300">{step.description}</p>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
