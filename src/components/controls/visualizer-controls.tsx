"use client";

import { Pause, Play, RotateCcw, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { formatSpeedLabel } from '@/lib/utils';

export interface VisualizerControlsProps {
  status: 'idle' | 'running' | 'paused' | 'finished';
  speed: number;
  onStart(): void;
  onPause(): void;
  onStep(): void;
  onReset(): void;
  onSpeedChange(value: number): void;
}

export function VisualizerControls({
  status,
  speed,
  onStart,
  onPause,
  onStep,
  onReset,
  onSpeedChange
}: VisualizerControlsProps) {
  const isRunning = status === 'running';

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center">
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={isRunning ? onPause : onStart} variant="default">
          {isRunning ? (
            <>
              <Pause className="mr-2 h-4 w-4" />
              Пауза
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Старт
            </>
          )}
        </Button>
        <Button onClick={onStep} variant="outline">
          <SkipForward className="mr-2 h-4 w-4" />
          Стъпка
        </Button>
        <Button onClick={onReset} variant="ghost">
          <RotateCcw className="mr-2 h-4 w-4" />
          Нулиране
        </Button>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <label htmlFor="speed-slider" className="flex items-center justify-between text-sm font-medium text-slate-600">
          Скорост
          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
            {formatSpeedLabel(speed)}
          </span>
        </label>
        <Slider
          id="speed-slider"
          min={0.2}
          max={2}
          step={0.1}
          value={[speed]}
          onValueChange={([value]) => {
            if (value !== undefined) {
              onSpeedChange(value);
            }
          }}
          aria-label="Скорост на визуализацията"
        />
      </div>
    </div>
  );
}
