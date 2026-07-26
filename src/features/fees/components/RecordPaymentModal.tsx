import { X } from "lucide-react";

import type {
  PaymentFormData,
  PaymentMethod,
} from "../types/fee";

type RecordPaymentModalProps = {
  isOpen: boolean;
  formData: PaymentFormData;
  balance: number;
  onClose: () => void;
  onSubmit: () => void;
  onFormChange: (
    formData: PaymentFormData
  ) => void;
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

function RecordPaymentModal({
  isOpen,
  formData,
  balance,
  onClose,
  onSubmit,
  onFormChange,
}: RecordPaymentModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Record Payment
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Outstanding balance:{" "}
              {formatCurrency(balance)}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={22} />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Payment Amount
            </label>

            <input
              type="number"
              min="1"
              max={balance}
              value={formData.amount}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  amount: Number(
                    event.target.value
                  ),
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Payment Method
            </label>

            <select
              value={formData.paymentMethod}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  paymentMethod:
                    event.target
                      .value as PaymentMethod,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            >
              <option>Cash</option>
              <option>Bank Transfer</option>
              <option>Card</option>
              <option>Online</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Payment Date
            </label>

            <input
              type="date"
              value={formData.paymentDate}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  paymentDate:
                    event.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Reference
            </label>

            <input
              value={formData.reference}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  reference:
                    event.target.value,
                })
              }
              placeholder="e.g. TRX-2026-001"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Note
            </label>

            <textarea
              rows={3}
              value={formData.note}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  note: event.target.value,
                })
              }
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onSubmit}
              className="rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800"
            >
              Record Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecordPaymentModal;