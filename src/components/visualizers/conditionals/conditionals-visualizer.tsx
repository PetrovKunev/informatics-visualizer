"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import type { VisualizerProps } from '@/types/visualizer';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { VisualizationFrame } from '@/components/common/visualization-frame';
import { VisualizerControls } from '@/components/controls/visualizer-controls';
import { createVisualizerStore, useVisualizerStore } from '@/hooks/use-visualizer-store';
import { sendToast } from '@/components/common/toaster';
import { prefersReducedMotion } from '@/lib/accessibility';

interface ConditionalsState {
  condition: boolean;
  a: number;
  b: number;
  branch: 'true' | 'false';
}

const PSEUDOCODE = [
  { id: 'start', label: 'прочети a, b' },
  { id: 'check', label: 'ако (a > b)' },
  { id: 'true', label: 'изпиши "a е по-голямо"' },
  { id: 'false', label: 'иначе изпиши "b е по-голямо или равно"' },
  { id: 'end', label: 'край' }
];

const TRUTH_TABLE = [
  { condition: 'true && true', result: true },
  { condition: 'true && false', result: false },
  { condition: 'true || false', result: true },
  { condition: 'false || false', result: false },
  { condition: '!true', result: false }
];

export function ConditionalsVisualizer({ speed = 1 }: VisualizerProps<ConditionalsState>) {
  const [a, setA] = useState(6);
  const [b, setB] = useState(4);
  const [branch, setBranch] = useState<'true' | 'false'>('true');
  const storeRef = useRef(createVisualizerStore<ConditionalsState>());
  const intervalRef = useRef<number | null>(null);

  const status = useVisualizerStore(storeRef.current, (state) => state.status);
  const stepIndex = useVisualizerStore(storeRef.current, (state) => state.stepIndex);
  const currentSpeed = useVisualizerStore(storeRef.current, (state) => state.speed);

  const steps = useMemo(() => {
    const condition = a > b;
    return [
      { id: 'start', state: { condition, a, b, branch: condition ? 'true' : 'false' } },
      { id: 'check', state: { condition, a, b, branch: condition ? 'true' : 'false' } },
      {
        id: condition ? 'true' : 'false',
        state: { condition, a, b, branch: condition ? 'true' : 'false' }
      },
      { id: 'end', state: { condition, a, b, branch: condition ? 'true' : 'false' } }
    ];
  }, [a, b]);

  useEffect(() => {
    const initial = steps[0].state as ConditionalsState;
    storeRef.current.getState().setState(initial);
    storeRef.current.getState().setStepIndex(0);
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [steps]);

  const runVisualization = () => {
    if (prefersReducedMotion()) {
      const final = steps[steps.length - 1]?.state as ConditionalsState;
      storeRef.current.getState().setStatus('finished');
      storeRef.current.getState().setStepIndex(steps.length - 1);
      storeRef.current.getState().setState(final);
      setBranch(final?.branch ?? 'true');
      return;
    }
    storeRef.current.getState().setStatus('running');
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    let index = storeRef.current.getState().stepIndex;
    intervalRef.current = window.setInterval(() => {
      index += 1;
      if (index >= steps.length) {
        if (intervalRef.current) {
          window.clearInterval(intervalRef.current);
        }
        storeRef.current.getState().setStatus('finished');
        storeRef.current.getState().setStepIndex(steps.length - 1);
        return;
      }
      storeRef.current.getState().setStepIndex(index);
      const current = steps[index].state as ConditionalsState;
      storeRef.current.getState().setState(current);
      setBranch(current.branch);
    }, Math.max(300, 1200 / speed));
  };

  const handleStart = () => {
    if (status === 'running') {
      return;
    }
    runVisualization();
  };

  const handlePause = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    storeRef.current.getState().setStatus('paused');
  };

  const handleStep = () => {
    const nextIndex = Math.min(stepIndex + 1, steps.length - 1);
    storeRef.current.getState().setStepIndex(nextIndex);
    const current = steps[nextIndex].state as ConditionalsState;
    storeRef.current.getState().setState(current);
    setBranch(current.branch);
    if (nextIndex === steps.length - 1) {
      storeRef.current.getState().setStatus('finished');
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    }
  };

  const handleReset = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    storeRef.current.getState().reset();
    const initial = steps[0].state as ConditionalsState;
    storeRef.current.getState().setState(initial);
    setBranch(initial.branch);
  };

  const toggleValues = () => {
    setA((prev) => prev + 1);
    setB((prev) => prev - 1);
    sendToast('Входните стойности са променени. Стартирайте визуализацията отново.');
    handleReset();
  };

  const activeStepId = steps[stepIndex]?.id;

  return (
    <div className="space-y-6">
      <VisualizationFrame
        title="Визуализация на if / else"
        description="Наблюдавайте как условието избира между истински и фалшив клон."
        pseudocode={PSEUDOCODE}
        activeStepId={activeStepId}
        footer={
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            <p>
              Текущо условие: <span className="font-semibold">{a} &gt; {b}</span> →{' '}
              <span className="font-semibold">{branch === 'true' ? 'истина' : 'лъжа'}</span>
            </p>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-inner">
              <div>
                <p className="text-sm text-slate-500">Стойности</p>
                <p className="text-2xl font-semibold text-slate-900">
                  a = {a}, b = {b}
                </p>
              </div>
              <Button onClick={toggleValues} variant="outline">
                Смени стойностите
              </Button>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="mb-3 text-sm font-semibold text-slate-700">Диаграма</p>
              <div className="flex items-center justify-around">
                <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-brand-500 text-center text-xs font-semibold uppercase text-brand-700">
                  Условие
                  <span className="text-base lowercase">
                    {a} &gt; {b}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3 text-xs font-semibold uppercase text-slate-500">
                  <span className={branch === 'true' ? 'text-brand-600' : ''}>Истина</span>
                  <Switch
                    checked={branch === 'true'}
                    onCheckedChange={(checked) => setBranch(checked ? 'true' : 'false')}
                  />
                  <span className={branch === 'false' ? 'text-red-500' : ''}>Лъжа</span>
                </div>
                <div className="flex h-24 w-24 flex-col items-center justify-center rounded-2xl bg-brand-100 text-center text-xs font-semibold uppercase text-brand-700">
                  {branch === 'true' ? 'a е по-голямо' : 'b е по-голямо или равно'}
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="mb-3 text-sm font-semibold text-slate-700">Таблица на истинност</p>
            <table className="w-full table-fixed text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="py-2">Израз</th>
                  <th className="py-2">Резултат</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {TRUTH_TABLE.map((row) => (
                  <tr key={row.condition} className="text-slate-700">
                    <td className="py-2 font-mono text-xs">{row.condition}</td>
                    <td className="py-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          row.result ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {row.result ? 'истина' : 'лъжа'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
