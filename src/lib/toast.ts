export type ToastKind = 'success' | 'error' | 'info' | 'warning';

export interface ToastOptions {
  autoClose?: number;
  position?: string;
  [key: string]: unknown;
}

export interface ToastMessage {
  id: number;
  kind: ToastKind;
  message: string;
  duration: number;
}

type ToastListener = (toastMessage: ToastMessage) => void;

const listeners = new Set<ToastListener>();
let nextToastId = 0;

function publish(kind: ToastKind, message: string, options: ToastOptions = {}) {
  const toastMessage = {
    id: ++nextToastId,
    kind,
    message,
    duration: options.autoClose ?? 3000,
  };
  listeners.forEach((listener) => listener(toastMessage));
  return toastMessage.id;
}

export const toast = {
  success: (message: string, options?: ToastOptions) => publish('success', message, options),
  error: (message: string, options?: ToastOptions) => publish('error', message, options),
  info: (message: string, options?: ToastOptions) => publish('info', message, options),
  warning: (message: string, options?: ToastOptions) => publish('warning', message, options),
};

export function subscribeToToasts(listener: ToastListener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
