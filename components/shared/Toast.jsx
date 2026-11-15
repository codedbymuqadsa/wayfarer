'use client';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

const ICONS = { success: CheckCircle2, info: Info, error: AlertCircle };

export default function Toast({ toasts, onDismiss }) {
  return (
    <div className="toast-stack" role="status" aria-live="polite">
      {toasts.map((t) => {
        const Icon = ICONS[t.type] || Info;
        return (
          <div key={t.id} className={`toast toast--${t.type}`}>
            <Icon size={18} />
            <span>{t.message}</span>
            <button type="button" aria-label="Dismiss notification" onClick={() => onDismiss(t.id)}>
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
