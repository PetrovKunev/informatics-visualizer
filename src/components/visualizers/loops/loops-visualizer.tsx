"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import type { VisualizerProps } from '@/types/visualizer';
import { VisualizationFrame } from '@/components/common/visualization-frame';
import { VisualizerControls } from '@/components/controls/visualizer-controls';
import { createVisualizerStore, useVisualizerStore } from '@/hooks/use-visualizer-store';
import { cn } from '@/lib/utils';
import { prefersReducedMotion } from '@/lib/accessibility';

interface LoopStep {
  id: string;
  label: string;
  index: number;
  accumulator: number;
}

const PSEUDOCODE = [
  { id: 'init', label: 'сумата = 0' },
  { id: 'loop', label: 'за i от 0 до n' },
  { id: 'update', label: 'сумата += елемент[i]' },
  { id: 'result', label: 'върни сумата' }
];

export function LoopsVisualizer({
  initialData = [2, 4, 6, 8],
  speed = 1
}: VisualizerProps<LoopStep, number[]>) {
  const [data] = useState<number[]>(() => (Array.isArray(initialData) ? initialData : [1, 2, 3]));
  const storeRef = useRef(createVisualizerStore<LoopStep>());
  const intervalRef = useRef<number | null>(null);

  const status = useVisualizerStore(storeRef.current, (state) => state.status);
  const stepIndex = useVisualizerStore(storeRef.current, (state) => state.stepIndex);
  const currentSpeed = useVisualizerStore(storeRef.current, (state) => state.speed);

  const steps: LoopStep[] = useMemo(() => {
    const produced: LoopStep[] = [];
    let accumulator = 0;
    produced.push({ id: 'init', label: 'Инициализация', index: -1, accumulator });
    for (let i = 0; i < data.length; i++) {
      accumulator += data[i];
      produced.push({
        id: 'loop',
        label: `Итерация ${i}`,
        index: i,
        accumulator
      });
      produced.push({
        id: 'update',
        label: `Добавяне на стойността ${data[i]}`,
        index: i,
        accumulator
      });
    }
    produced.push({
      id: 'result',
      label: 'Край на цикъла',
      index: data.length,
      accumulator
    });
    return produced;
  }, [data]);

  useEffect(() => {
    storeRef.current.getState().setStepIndex(0);
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [steps]);

  const run = () => {
    if (prefersReducedMotion()) {
      storeRef.current.getState().setStepIndex(steps.length - 1);
      storeRef.current.getState().setStatus('finished');
      return;
    }
    storeRef.current.getState().setStatus('running');
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    let counter = storeRef.current.getState().stepIndex;
    intervalRef.current = window.setInterval(() => {
      counter += 1;
      if (counter >= steps.length) {
        if (intervalRef.current) {
          window.clearInterval(intervalRef.current);
        }
        storeRef.current.getState().setStatus('finished');
        storeRef.current.getState().setStepIndex(steps.length - 1);
        return;
      }
      storeRef.current.getState().setStepIndex(counter);
    }, Math.max(300, 1000 / speed));
  };

  const handleStart = () => {
    if (status === 'running') {
      return;
    }
    run();
  };

  const handlePause = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    storeRef.current.getState().setStatus('paused');
  };

  const handleStep = () => {
    const next = Math.min(stepIndex + 1, steps.length - 1);
    storeRef.current.getState().setStepIndex(next);
    if (next === steps.length - 1) {
      storeRef.current.getState().setStatus('finished');
    }
  };

  const handleReset = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    storeRef.current.getState().reset();
  };

  const currentStep = steps[stepIndex];

  return (
    <div className="space-y-6">
      <VisualizationFrame
        title="Обхождане на масив с цикъл"
        description="Следете как цикълът for преминава през всеки елемент и натрупва сума."
        pseudocode={PSEUDOCODE}
        activeStepId={currentStep?.id}
        footer={
          <p className="text-sm text-slate-600">
            Натрупана сума: <span className="font-semibold">{currentStep?.accumulator ?? 0}</span>
          </p>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-2">
            {data.map((value, index) => {
              const isActive = currentStep?.index === index;
              return (
                <div
                  key={index}
                  className={cn(
                    'rounded-2xl border px-4 py-6 text-center font-semibold transition',
                    isActive
                      ? 'border-brand-500 bg-brand-100 text-brand-700'
                      : 'border-slate-200 bg-white text-slate-700'
                  )}
                  aria-live={isActive ? 'assertive' : 'off'}
                >
                  <span className="block text-xs uppercase text-slate-400">Index {index}</span>
                  <span className="text-lg">{value}</span>
                </div>
              );
            })}
          </div>
          <div className="rounded-2xl bg-slate-900/90 p-4 text-sm text-white">
            <p className="mb-2 text-xs uppercase tracking-wide text-slate-300">Хронология</p>
            <ul className="space-y-1">
              {steps.slice(0, stepIndex + 1).map((step) => (
                <li key={`${step.id}-${step.index}`} className="flex justify-between">
                  <span>{step.label}</span>
                  <span className="font-mono text-xs text-slate-300">
                    сумма = {step.accumulator}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </VisualizationFrame>
      <VisualizerControls
        status={status}
        speed={currentSpeed}
        onStart={handleStart}
        onPause={handlePause}
        onStep={handleStep}
        onReset={handleReset}
        onSpeedChange={(value) => storeRef.current.getState().setSpeed(value)}
      />
    </div>
  );
}
