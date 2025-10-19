"use client";

import { useMemo, useRef, useState } from 'react';
import type { VisualizerProps } from '@/types/visualizer';
import { VisualizationFrame } from '@/components/common/visualization-frame';
import { VisualizerControls } from '@/components/controls/visualizer-controls';
import { createVisualizerStore, useVisualizerStore } from '@/hooks/use-visualizer-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { linearSearch } from '@/algorithms/search/linear-search';
import { binarySearch } from '@/algorithms/search/binary-search';
import type { AlgorithmStep } from '@/types/algorithm';
import { cn } from '@/lib/utils';
import { sendToast } from '@/components/common/toaster';
import { prefersReducedMotion } from '@/lib/accessibility';

type AlgorithmKey = 'linear' | 'binary';

const PSEUDOCODE_MAP = {
  linear: [
    { id: 'compare', label: 'обход за i от 0 до n' },
    { id: 'found', label: 'връщане на индекса при съвпадение' },
    { id: 'not-found', label: 'върни -1 при липса' }
  ],
  binary: [
    { id: 'check', label: 'mid = (left + right) / 2' },
    { id: 'found', label: 'ако arr[mid] == target → връщане' },
    { id: 'branch', label: 'актуализирай left или right' },
    { id: 'not-found', label: 'върни -1 при липса' }
  ]
};

interface StepState {
  array: number[];
  target: number;
  index?: number;
  foundIndex: number;
  left?: number;
  right?: number;
  mid?: number;
}

export function ArrayVisualizer({
  initialData = [2, 4, 7, 11, 15, 20],
  speed = 1
}: VisualizerProps<StepState, number[]>) {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmKey>('linear');
  const [array, setArray] = useState<number[]>(() =>
    Array.isArray(initialData) ? initialData : [3, 8, 1, 5]
  );
  const [target, setTarget] = useState(11);
  const generatorRef = useRef<Generator<AlgorithmStep<StepState>, AlgorithmStep<StepState>> | null>(
    null
  );
  const storeRef = useRef(createVisualizerStore<StepState>());
  const historyRef = useRef<AlgorithmStep<StepState>[]>([]);

  const status = useVisualizerStore(storeRef.current, (state) => state.status);
  const stepIndex = useVisualizerStore(storeRef.current, (state) => state.stepIndex);
  const currentSpeed = useVisualizerStore(storeRef.current, (state) => state.speed);

  const [, forceRender] = useState(0);

  const history = historyRef.current;

  const algorithm = useMemo(() => {
    return selectedAlgorithm === 'linear' ? linearSearch : binarySearch;
  }, [selectedAlgorithm]);

  const pseudocode = PSEUDOCODE_MAP[selectedAlgorithm];
  const activeStep = history[stepIndex];

  const prepareGenerator = () => {
    const payload =
      selectedAlgorithm === 'binary'
        ? { array: [...array].sort((a, b) => a - b), target }
        : { array, target };
    const generator = algorithm.run(payload);
    generatorRef.current = generator;
    historyRef.current = [];
    storeRef.current.getState().setStepIndex(0);
    const first = generator.next();
    if (!first.done && first.value) {
      historyRef.current.push(first.value);
    } else if (first.value) {
      historyRef.current.push(first.value);
      storeRef.current.getState().setStatus('finished');
    }
    forceRender((prev) => prev + 1);
  };

  const handleStart = () => {
    if (status === 'running') {
      return;
    }
    if (!generatorRef.current) {
      prepareGenerator();
    }
    if (prefersReducedMotion()) {
      const generator = generatorRef.current;
      if (generator) {
        let result = generator.next();
        while (!result.done) {
          if (result.value) {
            historyRef.current.push(result.value);
          }
          result = generator.next();
        }
        if (result.value) {
          historyRef.current.push(result.value);
        }
        storeRef.current.getState().setStepIndex(Math.max(0, historyRef.current.length - 1));
        storeRef.current.getState().setStatus('finished');
        forceRender((prev) => prev + 1);
        return;
      }
    }
    storeRef.current.getState().setStatus('running');
    handleStep();
  };

  const handlePause = () => {
    storeRef.current.getState().setStatus('paused');
  };

  const handleReset = () => {
    storeRef.current.getState().reset();
    historyRef.current = [];
    generatorRef.current = null;
    forceRender((prev) => prev + 1);
  };

  const handleStep = () => {
    if (!generatorRef.current) {
      prepareGenerator();
      sendToast('Генериране на стъпки. Продължете.');
      return;
    }
    const next = generatorRef.current.next();
    if (!next.done && next.value) {
      historyRef.current.push(next.value);
      storeRef.current.getState().setStepIndex(historyRef.current.length - 1);
      forceRender((prev) => prev + 1);
    } else if (next.value) {
      historyRef.current.push(next.value);
      storeRef.current.getState().setStepIndex(historyRef.current.length - 1);
      storeRef.current.getState().setStatus('finished');
      forceRender((prev) => prev + 1);
    } else {
      storeRef.current.getState().setStatus('finished');
    }
  };

  const handleArrayChange = (value: string) => {
    const parsed = value
      .split(',')
      .map((chunk) => Number.parseInt(chunk.trim(), 10))
      .filter((num) => !Number.isNaN(num));
    if (parsed.length) {
      setArray(parsed);
      handleReset();
    }
  };

  const handleSpeedChange = (value: number) => {
    storeRef.current.getState().setSpeed(value);
  };

  return (
    <div className="space-y-6">
      <VisualizationFrame
        title="Манипулация на масив и търсене"
        description="Сравнете линейното и двоичното търсене. Въведете стойности, изберете алгоритъм и проследете стъпките."
        pseudocode={pseudocode}
        activeStepId={activeStep?.highlightedLines?.[0]}
        footer={
          <p className="text-sm text-slate-600">
            Последна стъпка: <span className="font-semibold">{activeStep?.description ?? '—'}</span>
          </p>
        }
      >
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant={selectedAlgorithm === 'linear' ? 'default' : 'outline'}
              onClick={() => {
                setSelectedAlgorithm('linear');
                handleReset();
              }}
            >
              Линейно търсене
            </Button>
            <Button
              variant={selectedAlgorithm === 'binary' ? 'default' : 'outline'}
              onClick={() => {
                setSelectedAlgorithm('binary');
                handleReset();
              }}
            >
              Двоично търсене
            </Button>
            <Input
              aria-label="Масив"
              defaultValue={array.join(', ')}
              onBlur={(event) => handleArrayChange(event.target.value)}
              className="max-w-xs"
            />
            <Input
              aria-label="Търсена стойност"
              type="number"
              value={target}
              onChange={(event) => setTarget(Number.parseInt(event.target.value, 10))}
              className="w-28"
            />
          </div>
          <div className="grid grid-cols-6 gap-2">
            {(selectedAlgorithm === 'binary' ? [...array].sort((a, b) => a - b) : array).map(
              (value, index) => {
                const isFocused =
                  activeStep?.state.index === index ||
                  activeStep?.state.mid === index ||
                  activeStep?.state.foundIndex === index;
                return (
                  <div
                    key={index}
                    className={cn(
                      'rounded-2xl border px-3 py-4 text-center text-sm font-semibold transition',
                      isFocused
                        ? 'border-brand-500 bg-brand-100 text-brand-700'
                        : 'border-slate-200 bg-white text-slate-700'
                    )}
                  >
                    <span className="block text-xs uppercase text-slate-400">#{index}</span>
                    <span className="text-lg">{value}</span>
                  </div>
                );
              }
            )}
          </div>
          {selectedAlgorithm === 'binary' ? (
            <div className="flex justify-between rounded-2xl bg-slate-900/80 p-4 text-xs text-slate-200">
              <span>left: {activeStep?.state.left ?? 0}</span>
              <span>mid: {activeStep?.state.mid ?? 0}</span>
              <span>right: {activeStep?.state.right ?? array.length - 1}</span>
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
        onSpeedChange={handleSpeedChange}
      />
    </div>
  );
}
