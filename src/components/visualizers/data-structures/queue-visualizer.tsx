"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import type { VisualizerProps } from '@/types/visualizer';
import { VisualizationFrame } from '@/components/common/visualization-frame';
import { VisualizerControls } from '@/components/controls/visualizer-controls';
import { createVisualizerStore, useVisualizerStore } from '@/hooks/use-visualizer-store';
import { createQueue, type QueueController, type QueueState } from '@/algorithms/data-structures/queue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sendToast } from '@/components/common/toaster';
import { cn } from '@/lib/utils';
import { prefersReducedMotion } from '@/lib/accessibility';

interface QueueScenario {
  id: string;
  description: string;
  action: (queue: QueueController<number>) => QueueState<number>;
}

const PSEUDOCODE = [
  { id: 'enqueue', label: 'enqueue(x): добави елемент в края' },
  { id: 'dequeue', label: 'dequeue(): премахни елемент от началото' },
  { id: 'overflow', label: 'ако queue е пълна → overflow' },
  { id: 'underflow', label: 'ако queue е празна → underflow' }
];

export function QueueVisualizer({
  initialData = [1, 2, 3],
  speed = 1
}: VisualizerProps<QueueState<number>, number[]>) {
  const controllerRef = useRef(
    createQueue<number>(6, Array.isArray(initialData) ? initialData : [1, 2, 3])
  );
  const storeRef = useRef(createVisualizerStore<QueueState<number>>());
  const intervalRef = useRef<number | null>(null);
  const [snapshot, setSnapshot] = useState(controllerRef.current.snapshot());
  const [inputValue, setInputValue] = useState(10);
  const [summary, setSummary] = useState('FIFO обработка на елементи.');

  const status = useVisualizerStore(storeRef.current, (state) => state.status);
  const stepIndex = useVisualizerStore(storeRef.current, (state) => state.stepIndex);
  const currentSpeed = useVisualizerStore(storeRef.current, (state) => state.speed);

  const steps = useMemo<QueueScenario[]>(() => {
    return [
      {
        id: 'enqueue',
        description: 'Добавяме нов елемент 12 в края.',
        action: (queue) => queue.enqueue(12)
      },
      {
        id: 'enqueue2',
        description: 'Добавяме елемент 15 в края.',
        action: (queue) => queue.enqueue(15)
      },
      {
        id: 'dequeue',
        description: 'Обслужваме първия елемент (dequeue).',
        action: (queue) => queue.dequeue()
      },
      {
        id: 'overflow',
        description: 'Пълним опашката до overflow.',
        action: (queue) => {
          let state = queue.snapshot();
          while (!state.overflow) {
            state = queue.enqueue(Math.floor(Math.random() * 20) + 1);
          }
          return state;
        }
      },
      {
        id: 'underflow',
        description: 'Изпразваме опашката за да демонстрираме underflow.',
        action: (queue) => {
          let state = queue.snapshot();
          while (!state.underflow) {
            state = queue.dequeue();
          }
          return state;
        }
      }
    ];
  }, []);

  const executeStep = (index: number) => {
    const controller = controllerRef.current;
    controller.reset(Array.isArray(initialData) ? initialData : [1, 2, 3]);
    let state = controller.snapshot();
    for (let i = 0; i <= index; i++) {
      state = steps[i]?.action(controller) ?? state;
    }
    setSnapshot(state);
    setSummary(steps[index]?.description ?? 'Операция върху опашката.');
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
    controllerRef.current.reset(Array.isArray(initialData) ? initialData : [1, 2, 3]);
    const base = controllerRef.current.snapshot();
    setSnapshot(base);
    setSummary('FIFO обработка на елементи.');
    storeRef.current.getState().reset();
    storeRef.current.getState().setState(base);
  };

  const activeStepId = steps[stepIndex]?.id;

  const handleManualEnqueue = () => {
    const controller = controllerRef.current;
    const result = controller.enqueue(inputValue);
    setSnapshot(result);
    storeRef.current.getState().setState(result);
    if (result.overflow) {
      sendToast('Queue overflow – няма място за нов елемент.');
    } else {
      sendToast(`Нов елемент ${inputValue} е добавен.`);
    }
  };

  const handleManualDequeue = () => {
    const controller = controllerRef.current;
    const result = controller.dequeue();
    setSnapshot(result);
    storeRef.current.getState().setState(result);
    if (result.underflow) {
      sendToast('Queue underflow – опашката е празна.');
    } else {
      sendToast('Премахнат е първият елемент.');
    }
  };

  return (
    <div className="space-y-6">
      <VisualizationFrame
        title="Опашка (FIFO)"
        description="Вижте как опашката обслужва елементите в реда на постъпване."
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
              <Button onClick={handleManualEnqueue}>Enqueue</Button>
              <Button variant="outline" onClick={handleManualDequeue}>
                Dequeue
              </Button>
            </div>
          </div>
        }
      >
        <div className="flex flex-wrap items-center gap-3">
          {snapshot.items.map((value, index) => {
            const isFront = index === 0;
            const isRear = index === snapshot.items.length - 1;
            return (
              <div
                key={`${value}-${index}`}
                className={cn(
                  'flex h-16 w-28 flex-col items-center justify-center rounded-2xl border px-3 text-sm font-semibold transition',
                  isFront
                    ? 'border-emerald-500 bg-emerald-100 text-emerald-700'
                    : isRear
                    ? 'border-brand-500 bg-brand-100 text-brand-700'
                    : 'border-slate-200 bg-white text-slate-700'
                )}
              >
                <span>{value}</span>
                <span className="text-[10px] uppercase text-slate-500">
                  {isFront ? 'front' : isRear ? 'rear' : ''}
                </span>
              </div>
            );
          })}
          {snapshot.items.length === 0 ? (
            <p className="text-sm text-slate-500">Опашката е празна.</p>
          ) : null}
        </div>
        <div className="mt-2 flex items-center justify-between rounded-full bg-slate-100 px-4 py-2 text-xs text-slate-600">
          <span>
            front: {snapshot.front} | rear: {snapshot.rear}
          </span>
          <span>
            размер: {snapshot.items.length} / {snapshot.capacity}
          </span>
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
