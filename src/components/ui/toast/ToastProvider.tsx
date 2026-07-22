import { useState, type ReactNode } from "react";
import {
  ToastContext,
  type ToastOptions,
  type ToastType,
} from "./ToastContext";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
} from "lucide-react";

type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastProviderProps = {
  children: ReactNode;
};

function ToastProvider({
  children,
}: ToastProviderProps) {
  const [toast, setToast] = useState<Toast | null>(null);

  function showToast({
    message,
    type = "success",
  }: ToastOptions) {
    const id = Date.now();

    setToast({
      id,
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[300] rounded-xl px-5 py-3 text-white shadow-2xl transition-all ${
            toast.type === "success"
              ? "bg-green-600"
              : toast.type === "error"
                ? "bg-red-600"
                : toast.type === "warning"
                  ? "bg-yellow-500 text-slate-900"
                  : "bg-blue-600"
          }`}
        >
          <div className="flex items-center gap-3">
            {toast.type === "success" && (
              <CheckCircle size={20} />
            )}

            {toast.type === "error" && (
              <XCircle size={20} />
            )}

            {toast.type === "warning" && (
              <AlertTriangle size={20} />
            )}

            {toast.type === "info" && (
              <Info size={20} />
            )}

            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export default ToastProvider;