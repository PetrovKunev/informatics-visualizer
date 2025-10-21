"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { VisualizerProps } from '@/types/visualizer';
import { VisualizationFrame } from '@/components/common/visualization-frame';
import { VisualizerControls } from '@/components/controls/visualizer-controls';
import { createVisualizerStore, useVisualizerStore } from '@/hooks/use-visualizer-store';
import { ALL_SORTING_ALGORITHMS } from '@/constants/algorithms';
import type { AlgorithmStep } from '@/types/algorithm';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { sendToast } from '@/components/common/toaster';
import { cn } from '@/lib/utils';
import { prefersReducedMotion } from '@/lib/accessibility';

interface SortingState {
  array: number[];
  i?: number;
  j?: number;
  swapped?: boolean;
}

const PSEUDOCODE = [
  { id: 'compare', label: 'сравни съседни елементи' },
  { id: 'swap', label: 'ако са в грешен ред → размени' },
  { id: 'update-min', label: 'обнови индекса на минималния елемент' },
  { id: 'shift', label: 'премести елемент надясно за освобождаване' },
  { id: 'insert', label: 'вмъкни ключовия елемент' },
  { id: 'split', label: 'раздели масива на две части' },
  { id: 'merge', label: 'сливане на подмасиви' },
  { id: 'select-pivot', label: 'избери пивот' },
  { id: 'partition', label: 'раздели елементи около пивота' },
  { id: 'place-pivot', label: 'постави пивота на място' },
  { id: 'end', label: 'резултат: подреден масив' }
];

type SortingAlgorithmKey = keyof typeof ALL_SORTING_ALGORITHMS;

export function SortingVisualizer({
  initialData = [12, 4, 9, 2, 7, 5],
  speed = 1
}: VisualizerProps<SortingState, number[]>) {
  const [data, setData] = useState<number[]>(() =>
    Array.isArray(initialData) ? initialData : [12, 4, 9, 2, 7, 5]
  );
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithmKey>('bubble');
  const generatorRef = useRef<Generator<AlgorithmStep<SortingState>, AlgorithmStep<SortingState>> | null>(
    null
  );
  const storeRef = useRef(createVisualizerStore<SortingState>());
  const intervalRef = useRef<number | null>(null);
  const [stepsHistory, setStepsHistory] = useState<AlgorithmStep<SortingState>[]>([]);
  const [barSize, setBarSize] = useState(40);

  const status = useVisualizerStore(storeRef.current, (state) => state.status);
  const stepIndex = useVisualizerStore(storeRef.current, (state) => state.stepIndex);
  const currentSpeed = useVisualizerStore(storeRef.current, (state) => state.speed);

  const algorithm = useMemo(() => ALL_SORTING_ALGORITHMS[selectedAlgorithm], [selectedAlgorithm]);

  const activeStep = stepsHistory[stepIndex];

  const clearIntervalIfNeeded = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => () => clearIntervalIfNeeded(), []);

  const resetGenerator = () => {
    const generator = algorithm.run([...data]);
    generatorRef.current = generator;
    setStepsHistory([]);
    storeRef.current.getState().setStepIndex(0);
    storeRef.current.getState().setState({ array: [...data] });
  };

  const handleStepInternal = () => {
    if (!generatorRef.current) {
      resetGenerator();
    }
    const generator = generatorRef.current;
    if (!generator) {
      return false;
    }
    const result = generator.next();
    if (result.done) {
      if (result.value) {
        setStepsHistory((prev) => {
          const updated = [...prev, result.value];
          storeRef.current.getState().setStepIndex(updated.length - 1);
          storeRef.current.getState().setState(result.value.state);
          storeRef.current.getState().setStatus('finished');
          return updated;
        });
      } else {
        storeRef.current.getState().setStatus('finished');
      }
      clearIntervalIfNeeded();
      return false;
    }
    setStepsHistory((prev) => {
      const updated = [...prev, result.value];
      storeRef.current.getState().setStepIndex(updated.length - 1);
      storeRef.current.getState().setState(result.value.state);
      return updated;
    });
    return true;
  };

  const handleStart = () => {
    if (status === 'running') {
      return;
    }
    if (prefersReducedMotion()) {
      if (!generatorRef.current) {
        resetGenerator();
      }
      const generator = generatorRef.current;
      if (generator) {
        let next = generator.next();
        const steps: AlgorithmStep<SortingState>[] = [];
        while (!next.done) {
          if (next.value) {
            steps.push(next.value);
          }
          next = generator.next();
        }
        if (next.value) {
          steps.push(next.value);
        }
        setStepsHistory(steps);
        storeRef.current.getState().setStepIndex(Math.max(0, steps.length - 1));
        storeRef.current.getState().setStatus('finished');
      }
      return;
    }
    storeRef.current.getState().setStatus('running');
    clearIntervalIfNeeded();
    if (!generatorRef.current) {
      resetGenerator();
    }
    handleStepInternal();
    intervalRef.current = window.setInterval(() => {
      const hasNext = handleStepInternal();
      if (!hasNext) {
        clearIntervalIfNeeded();
      }
    }, Math.max(200, 600 / speed));
  };

  const handlePause = () => {
    clearIntervalIfNeeded();
    storeRef.current.getState().setStatus('paused');
  };

  const handleReset = () => {
    clearIntervalIfNeeded();
    storeRef.current.getState().reset();
    setStepsHistory([]);
    generatorRef.current = null;
  };

  const handleStep = () => {
    storeRef.current.getState().setStatus('paused');
    clearIntervalIfNeeded();
    handleStepInternal();
  };

  const handleRandomize = () => {
    const randomArray = Array.from({ length: Math.max(5, Math.floor(barSize / 10)) }, () =>
      Math.floor(Math.random() * 90) + 10
    );
    setData(randomArray);
    handleReset();
    sendToast('Генериран е нов масив.');
  };

  const handleDataChange = (value: string) => {
    const parsed = value
      .split(',')
      .map((chunk) => Number.parseInt(chunk.trim(), 10))
      .filter((num) => !Number.isNaN(num));
    if (parsed.length) {
      setData(parsed);
      handleReset();
    }
  };

  const highlighted = new Set(activeStep?.highlightedLines ?? []);
  const activeStepId = activeStep?.highlightedLines?.[0];

  return (
    <div className="space-y-6">
      <VisualizationFrame
        title={`Сортиране: ${algorithm.name}`}
        description={algorithm.description}
        pseudocode={PSEUDOCODE}
        {...(activeStepId !== undefined ? { activeStepId } : {})}
        footer={
          <div className="flex flex-col gap-2 text-sm text-slate-600">
            <p>
              Стъпка: <span className="font-semibold">{activeStep?.description ?? 'Очаква старт'}</span>
            </p>
            <p className="text-xs text-slate-500">
              Сложност (средна): {algorithm.complexity.average} | Най-лош случай: {algorithm.complexity.worst}
            </p>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {(Object.keys(ALL_SORTING_ALGORITHMS) as SortingAlgorithmKey[]).map((key) => (
              <Button
                key={key}
                variant={selectedAlgorithm === key ? 'default' : 'outline'}
                onClick={() => {
                  setSelectedAlgorithm(key);
                  handleReset();
                }}
              >
                {ALL_SORTING_ALGORITHMS[key].name}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Input
              defaultValue={data.join(', ')}
              onBlur={(event) => handleDataChange(event.target.value)}
              aria-label="Масив за сортиране"
              className="max-w-lg"
            />
            <Button variant="outline" onClick={handleRandomize}>
              Нов масив
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase text-slate-500">Брой елементи</span>
              <Slider
                min={30}
                max={80}
                value={[barSize]}
                onValueChange={([value]) => {
                  if (value !== undefined) {
                    setBarSize(value);
                  }
                }}
                className="w-40"
              />
            </div>
          </div>
          <div className="flex h-64 items-end justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-6">
            <AnimatePresence>
              {(activeStep?.state.array ?? data).map((value, index) => {
                const isCompared =
                  highlighted.has('compare') &&
                  (index === activeStep?.state.i || index === activeStep?.state.j);
                const isSwapped = highlighted.has('swap') && isCompared;
                return (
                  <motion.div
                    key={`${value}-${index}`}
                    layout
                    initial={{ height: 0 }}
                    animate={{ height: `${value}%` }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20, duration: 0.3 / speed }}
                    className={cn(
                      'flex w-8 items-end justify-center rounded-t-xl bg-brand-300 text-[10px] font-semibold text-brand-900',
                      isCompared ? 'bg-brand-500 text-white' : '',
                      isSwapped ? 'bg-emerald-500' : ''
                    )}
                    aria-label={`Елемент ${value}`}
                  >
                    <span className="mb-1">{value}</span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
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
