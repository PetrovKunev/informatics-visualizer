"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import type { VisualizerProps } from '@/types/visualizer';
import { VisualizationFrame } from '@/components/common/visualization-frame';
import { VisualizerControls } from '@/components/controls/visualizer-controls';
import { createVisualizerStore, useVisualizerStore } from '@/hooks/use-visualizer-store';
import { createStack, type StackController, type StackState } from '@/algorithms/data-structures/stack';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sendToast } from '@/components/common/toaster';
import { cn } from '@/lib/utils';
import { prefersReducedMotion } from '@/lib/accessibility';

interface StackScenarioStep {
  id: string;
  description: string;
  action: (stack: StackController<number>) => StackState<number>;
}

const PSEUDOCODE = [
  { id: 'push', label: 'push(x): ако има място → постави елемента на върха' },
  { id: 'overflow', label: 'ако стекът е пълен → overflow' },
  { id: 'pop', label: 'pop(): премахни върха и върни стойността' },
  { id: 'underflow', label: 'ако стекът е празен → underflow' }
];

export function StackVisualizer({
  initialData = [2, 5],
  speed = 1
}: VisualizerProps<StackState<number>, number[]>) {
  const controllerRef = useRef(
    createStack<number>(6, Array.isArray(initialData) ? initialData : [2, 5])
  );
  const storeRef = useRef(createVisualizerStore<StackState<number>>());
  const intervalRef = useRef<number | null>(null);
  const [snapshot, setSnapshot] = useState(controllerRef.current.snapshot());
  const [inputValue, setInputValue] = useState(7);
  const [summary, setSummary] = useState('Демонстрация на push и pop операции.');

  const status = useVisualizerStore(storeRef.current, (state) => state.status);
  const stepIndex = useVisualizerStore(storeRef.current, (state) => state.stepIndex);
  const currentSpeed = useVisualizerStore(storeRef.current, (state) => state.speed);

  const steps = useMemo<StackScenarioStep[]>(() => {
    return [
      {
        id: 'push',
        description: 'Добавяме елемент 9 на върха.',
        action: (stack) => stack.push(9)
      },
      {
        id: 'push2',
        description: 'Добавяме елемент 12 на върха.',
        action: (stack) => stack.push(12)
      },
      {
        id: 'pop',
        description: 'Премахваме текущия връх.',
        action: (stack) => stack.pop()
      },
      {
        id: 'overflow',
        description: 'Провокираме overflow чрез няколко push операции.',
        action: (stack) => {
          let state = stack.snapshot();
          while (!state.overflow) {
            state = stack.push(Math.floor(Math.random() * 20) + 1);
          }
          return state;
        }
      },
      {
        id: 'underflow',
        description: 'Изпразваме стека, за да демонстрираме underflow.',
        action: (stack) => {
          let state = stack.snapshot();
          while (!state.underflow) {
            state = stack.pop();
          }
          return state;
        }
      }
    ];
  }, []);

  const executeStep = (index: number) => {
    const controller = controllerRef.current;
    controller.reset(Array.isArray(initialData) ? initialData : [2, 5]);
    let state = controller.snapshot();
    for (let i = 0; i <= index; i++) {
      state = steps[i]?.action(controller) ?? state;
    }
    setSnapshot(state);
    setSummary(steps[index]?.description ?? 'Операция върху стека.');
    storeRef.current.getState().setState(state);
  };

  const clearIntervalIfNeeded = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => () => clearIntervalIfNeeded(), []);

  const handleStart = () => {
    if (status === 'running') {
      return;
    }
    if (prefersReducedMotion()) {
      const finalIndex = steps.length - 1;
      executeStep(finalIndex);
      storeRef.current.getState().setStepIndex(finalIndex);
      storeRef.current.getState().setStatus('finished');
      return;
    }
    storeRef.current.getState().setStatus('running');
    let current = storeRef.current.getState().stepIndex;
    clearIntervalIfNeeded();
    intervalRef.current = window.setInterval(() => {
      current += 1;
      if (current >= steps.length) {
        clearIntervalIfNeeded();
        storeRef.current.getState().setStatus('finished');
        storeRef.current.getState().setStepIndex(steps.length - 1);
        return;
      }
      storeRef.current.getState().setStepIndex(current);
      executeStep(current);
    }, Math.max(350, 900 / speed));
  };

  const handlePause = () => {
    clearIntervalIfNeeded();
    storeRef.current.getState().setStatus('paused');
  };

  const handleStep = () => {
    const next = Math.min(stepIndex + 1, steps.length - 1);
    storeRef.current.getState().setStepIndex(next);
    executeStep(next);
    if (next === steps.length - 1) {
      storeRef.current.getState().setStatus('finished');
      clearIntervalIfNeeded();
    }
  };

  const handleReset = () => {
    clearIntervalIfNeeded();
    controllerRef.current.reset(Array.isArray(initialData) ? initialData : [2, 5]);
    const base = controllerRef.current.snapshot();
    setSnapshot(base);
    setSummary('Демонстрация на push и pop операции.');
    storeRef.current.getState().reset();
    storeRef.current.getState().setState(base);
  };

  const activeStepId = steps[stepIndex]?.id;

  const handleManualPush = () => {
    const controller = controllerRef.current;
    const result = controller.push(inputValue);
    setSnapshot(result);
    storeRef.current.getState().setState(result);
    if (result.overflow) {
      sendToast('Stack overflow! Няма място за нов елемент.');
    } else {
      sendToast(`Добавен елемент ${inputValue}.`);
    }
  };

  const handleManualPop = () => {
    const controller = controllerRef.current;
    const result = controller.pop();
    setSnapshot(result);
    storeRef.current.getState().setState(result);
    if (result.underflow) {
      sendToast('Stack underflow! Стекът е празен.');
    } else {
      sendToast('Премахнат е връхният елемент.');
    }
  };

  return (
    <div className="space-y-6">
      <VisualizationFrame
        title="Стек (LIFO)"
        description="Наблюдавайте добавянето и премахването на елементи от върха и какво се случва при пъл/празен стек."
        pseudocode={PSEUDOCODE}
        activeStepId={activeStepId}
        footer={
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm">
            <p>{summary}</p>
            <div className="flex flex-wrap items-center gap-2">
              <Input
                type="number"
                value={inputValue}
                onChange={(event) => setInputValue(Number.parseInt(event.target.value, 10))}
                className="w-24"
              />
              <Button onClick={handleManualPush} variant="default">
                Push
              </Button>
              <Button onClick={handleManualPop} variant="outline">
                Pop
              </Button>
            </div>
          </div>
        }
      >
        <div className="flex flex-col items-center gap-2">
          {snapshot.items
            .slice()
            .reverse()
            .map((value, index) => {
              const isTop = index === 0;
              return (
                <div
                  key={`${value}-${index}`}
                  className={cn(
                    'flex h-12 w-40 items-center justify-between rounded-2xl border px-4 text-sm font-semibold transition',
                    isTop
                      ? 'border-brand-500 bg-brand-100 text-brand-700'
                      : 'border-slate-200 bg-white text-slate-700'
                  )}
                >
                  <span>{value}</span>
                  {isTop ? <span className="text-xs uppercase text-brand-500">top</span> : null}
                </div>
              );
            })}
          <div className="mt-2 rounded-full bg-slate-200 px-3 py-1 text-xs text-slate-600">
            Размер: {snapshot.items.length} / {snapshot.capacity}
          </div>
          {snapshot.overflow ? (
            <div className="rounded-xl bg-red-100 px-3 py-2 text-xs font-semibold text-red-600">
              Overflow!
            </div>
          ) : null}
          {snapshot.underflow ? (
            <div className="rounded-xl bg-amber-100 px-3 py-2 text-xs font-semibold text-amber-600">
              Underflow!
            </div>
          ) : null}
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
