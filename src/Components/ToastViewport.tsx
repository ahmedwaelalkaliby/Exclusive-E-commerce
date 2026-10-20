import { useEffect, useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineClose, AiOutlineInfoCircle, AiOutlineWarning } from 'react-icons/ai';
import { subscribeToToasts, type ToastMessage } from '../lib/toast';

const styles = {
  success: 'border-emerald-500 bg-emerald-50 text-emerald-900',
  error: 'border-red-500 bg-red-50 text-red-900',
  info: 'border-sky-500 bg-sky-50 text-sky-900',
  warning: 'border-amber-500 bg-amber-50 text-amber-900',
};

export default function ToastViewport() {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  useEffect(() => subscribeToToasts((message) => {
    setMessages((current) => [...current, message]);
    window.setTimeout(() => setMessages((current) => current.filter((item) => item.id !== message.id)), message.duration);
  }), []);

  const dismiss = (id: number) => setMessages((current) => current.filter((message) => message.id !== id));

  return (
    <div className="fixed right-4 top-4 z-[100] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2" aria-live="polite">
      {messages.map((message) => {
        const Icon = message.kind === 'success' ? AiOutlineCheckCircle : message.kind === 'warning' ? AiOutlineWarning : AiOutlineInfoCircle;
        return (
          <div key={message.id} role="status" className={`flex items-center gap-3 rounded-lg border-l-4 p-4 shadow-lg ${styles[message.kind]}`}>
            <Icon className="shrink-0 text-xl" aria-hidden="true" />
            <p className="flex-1 text-sm font-medium">{message.message}</p>
            <button type="button" onClick={() => dismiss(message.id)} aria-label="Dismiss notification" className="rounded p-1 hover:bg-black/5">
              <AiOutlineClose aria-hidden="true" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
