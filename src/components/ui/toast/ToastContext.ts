import { createContext } from "react";

export type ToastType =
  | "success"
  | "error"
  | "warning"
  | "info";

export type ToastOptions = {
  message: string;
  type?: ToastType;
};

export type ToastContextValue = {
  showToast: (options: ToastOptions) => void;
};

export const ToastContext =
  createContext<ToastContextValue | null>(null);