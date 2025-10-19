"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface Toast {
  id: number;
  message: string;
}

let toastId = 0;
const listeners = new Set<(toast: Toast) => void>();

export function sendToast(message: string) {
  const toast: Toast = { id: ++toastId, message };
  listeners.forEach((listener) => listener(toast));
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handleToast = (toast: Toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((item) => item.id !== toast.id));
      }, 4000);
    };

    listeners.add(handleToast);
    return () => {
      listeners.delete(handleToast);
    };
  }, []);

  if (!toasts.length) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[999] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'w-64 rounded-2xl bg-slate-900/90 px-4 py-3 text-sm font-medium text-white shadow-lg transition-all'
          )}
          role="status"
          aria-live="polite"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
