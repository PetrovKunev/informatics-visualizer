"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import type { VisualizerProps } from '@/types/visualizer';
import { VisualizationFrame } from '@/components/common/visualization-frame';
import { VisualizerControls } from '@/components/controls/visualizer-controls';
import { createVisualizerStore, useVisualizerStore } from '@/hooks/use-visualizer-store';
import { createLinkedList, type LinkedListController, type LinkedListState } from '@/algorithms/data-structures/linked-list';
import { Button } from '@/components/ui/button';
import { sendToast } from '@/components/common/toaster';
import { prefersReducedMotion } from '@/lib/accessibility';

interface LinkedListStep {
  id: string;
  description: string;
  action: (controller: LinkedListController<number>) => LinkedListState<number>;
}

const PSEUDOCODE = [
  { id: 'node', label: 'нов възел = { стойност, next }' },
  { id: 'link', label: 'нов възел.next = текущ head' },
  { id: 'update', label: 'head = нов възел' },
  { id: 'remove', label: 'прескачане на възел за изтриване' }
];

export function LinkedListVisualizer({
  initialData = [3, 7, 11],
  speed = 1
}: VisualizerProps<LinkedListState<number>, number[]>) {
  const controllerRef = useRef(
    createLinkedList<number>(Array.isArray(initialData) ? initialData : [3, 7, 11])
  );
  const storeRef = useRef(createVisualizerStore<LinkedListState<number>>());
  const intervalRef = useRef<number | null>(null);
  const [snapshot, setSnapshot] = useState<LinkedListState<number>>(controllerRef.current.snapshot());
  const [stepSummary, setStepSummary] = useState<string>('Изходно състояние на списъка.');

  const status = useVisualizerStore(storeRef.current, (state) => state.status);
  const stepIndex = useVisualizerStore(storeRef.current, (state) => state.stepIndex);
  const currentSpeed = useVisualizerStore(storeRef.current, (state) => state.speed);

  const steps = useMemo<LinkedListStep[]>(() => {
    return [
      {
        id: 'node',
        description: 'Добавяме възел със стойност 5 в началото.',
        action: (controller) => controller.insertAtHead(5)
      },
      {
        id: 'link',
        description: 'Добавяме възел със стойност 14 в края.',
        action: (controller) => controller.insertAtTail(14)
      },
      {
        id: 'update',
        description: 'Вмъкваме стойност 9 на позиция 2.',
        action: (controller) => controller.insertAt(2, 9)
      },
      {
        id: 'remove',
        description: 'Премахваме възел на позиция 1.',
        action: (controller) => controller.removeAt(1)
      }
    ];
  }, []);

  const executeStep = (index: number) => {
    const controller = controllerRef.current;
    controller.reset(Array.isArray(initialData) ? initialData : [3, 7, 11]);
    let state = controller.snapshot();
    for (let i = 0; i <= index; i++) {
      state = steps[i]?.action(controller) ?? state;
    }
    setSnapshot(state);
    setStepSummary(steps[index]?.description ?? 'Преглед на структурата.');
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
    }, Math.max(400, 1200 / speed));
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
    controllerRef.current.reset(Array.isArray(initialData) ? initialData : [3, 7, 11]);
    const base = controllerRef.current.snapshot();
    setSnapshot(base);
    setStepSummary('Изходно състояние на списъка.');
    storeRef.current.getState().reset();
    storeRef.current.getState().setState(base);
  };

  const activeStepId = steps[stepIndex]?.id;

  const addRandomNode = () => {
    const value = Math.floor(Math.random() * 30) + 1;
    controllerRef.current.insertAtTail(value);
    const state = controllerRef.current.snapshot();
    setSnapshot(state);
    setStepSummary(`Ръчно добавяне на възел със стойност ${value} в края.`);
    storeRef.current.getState().setState(state);
    sendToast('Ръчна операция добавена към списъка.');
  };

  return (
    <div className="space-y-6">
      <VisualizationFrame
        title="Свързан списък"
        description="Вижте как се вмъкват и премахват възли, като следите връзките между тях."
        pseudocode={PSEUDOCODE}
        {...(activeStepId !== undefined ? { activeStepId } : {})}
        footer={
          <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
            <p>{stepSummary}</p>
            <Button variant="outline" onClick={addRandomNode} className="w-full md:w-auto">
              Добави възел в края
            </Button>
          </div>
        }
      >
        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {snapshot.nodes.map((node, index) => (
              <div key={node.id} className="flex items-center gap-3">
                <div className="rounded-2xl border border-brand-300 bg-brand-50 px-4 py-3 text-center">
                  <p className="text-xs uppercase text-slate-500">Index {index}</p>
                  <p className="text-lg font-semibold text-brand-700">{node.value}</p>
                </div>
                {index < snapshot.nodes.length - 1 ? (
                  <span className="text-brand-500">→</span>
                ) : (
                  <span className="text-slate-400">null</span>
                )}
              </div>
            ))}
            {snapshot.length === 0 ? <p className="text-sm text-slate-500">Списъкът е празен.</p> : null}
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
