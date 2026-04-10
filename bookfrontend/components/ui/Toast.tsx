'use client';

import { useEffect, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning';

interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

// Simple global store via module-level listeners
type Listener = (toast: ToastMessage) => void;
const listeners: Set<Listener> = new Set();

export function showToast(type: ToastType, message: string) {
  const toast: ToastMessage = {
    id: Math.random().toString(36).slice(2),
    type,
    message,
  };
  listeners.forEach((fn) => fn(toast));
}

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />,
  error: <XCircle className="w-5 h-5 text-rose-400 shrink-0" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
};

const toastStyles: Record<ToastType, string> = {
  success: 'border-emerald-500/40 bg-emerald-500/10',
  error: 'border-rose-500/40 bg-rose-500/10',
  warning: 'border-amber-500/40 bg-amber-500/10',
};

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const add = useCallback((t: ToastMessage) => {
    setToasts((prev) => [...prev, t]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== t.id));
    }, 4000);
  }, []);

  useEffect(() => {
    listeners.add(add);
    return () => { listeners.delete(add); };
  }, [add]);

  const remove = (id: string) =>
    setToasts((prev) => prev.filter((x) => x.id !== id));

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-80">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={[
            'flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md',
            'shadow-xl animate-in slide-in-from-right-5 fade-in duration-300',
            toastStyles[t.type],
          ].join(' ')}
        >
          {icons[t.type]}
          <p className="text-sm text-slate-200 flex-1">{t.message}</p>
          <button
            onClick={() => remove(t.id)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
