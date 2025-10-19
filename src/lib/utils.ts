import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSpeedLabel(speed: number) {
  if (speed >= 1) {
    return `${speed.toFixed(1)}x`;
  }
  return `${(speed * 100).toFixed(0)}%`;
}
