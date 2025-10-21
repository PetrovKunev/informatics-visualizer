"use client";

import type { PseudocodeStep } from '@/types/visualizer';
import { PseudocodePanel } from '@/components/visualization/pseudocode-panel';

interface VisualizationFrameProps {
  title: string;
  description: string;
  pseudocode: PseudocodeStep[];
  activeStepId?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function VisualizationFrame({
  title,
  description,
  pseudocode,
  activeStepId,
  children,
  footer
}: VisualizationFrameProps) {
  return (
    <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-600">{description}</p>
        </div>
        <div className="rounded-2xl border border-dashed border-brand-200 bg-brand-50/60 p-6">
          {children}
        </div>
        {footer}
      </div>
      <PseudocodePanel
        steps={pseudocode}
        {...(activeStepId !== undefined ? { activeStepId } : {})}
      />
    </section>
  );
}
