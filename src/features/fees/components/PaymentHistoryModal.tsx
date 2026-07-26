import { ReceiptText, X } from "lucide-react";

import type {
  FeeRecord,
  PaymentRecord,
} from "../types/fee";

import { useStudentsContext } from "../../students/hooks/useStudentsContext";

type PaymentHistoryModalProps = {
  isOpen: boolean;
  fee: FeeRecord | null;
  payments: PaymentRecord[];
  onClose: () => void;
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

function PaymentHistoryModal({
  isOpen,
  fee,
  payments,
  onClose,
}: PaymentHistoryModalProps) {
  const { students } = useStudentsContext();

  if (!isOpen || !fee) {
    return null;
  }

  const student = students.find(
    (item) => item.id === fee.studentId
  );

  const feePayments = payments
    .filter(
      (payment) => payment.feeId === fee.id
    )
    .sort(
      (a, b) =>
        new Date(b.paymentDate).getTime() -
        new Date(a.paymentDate).getTime()
    );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Payment History
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {student?.name ?? "Unknown student"} ·{" "}
              {fee.feeType}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Close payment history"
          >
            <X size={22} />
          </button>
        </div>

        <div className="p-6">
          <section className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Amount Due
              </p>

              <p className="mt-2 text-xl font-bold text-slate-900">
                {formatCurrency(fee.amountDue)}
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                Amount Paid
              </p>

              <p className="mt-2 text-xl font-bold text-emerald-700">
                {formatCurrency(fee.amountPaid)}
              </p>
            </div>

            <div className="rounded-2xl bg-amber-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
                Balance
              </p>

              <p className="mt-2 text-xl font-bold text-amber-700">
                {formatCurrency(fee.balance)}
              </p>
            </div>
          </section>

          <div className="mt-6">
            <h3 className="font-bold text-slate-900">
              Transactions
            </h3>

            {feePayments.length === 0 ? (
              <div className="py-12 text-center">
                <ReceiptText
                  size={42}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-4 font-semibold text-slate-700">
                  No payments recorded
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Payments made toward this fee will appear here.
                </p>
              </div>
            ) : (
              <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="min-w-full">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <th className="px-4 py-3">
                        Date
                      </th>
                      <th className="px-4 py-3">
                        Amount
                      </th>
                      <th className="px-4 py-3">
                        Method
                      </th>
                      <th className="px-4 py-3">
                        Reference
                      </th>
                      <th className="px-4 py-3">
                        Note
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {feePayments.map(
                      (payment) => (
                        <tr key={payment.id}>
                          <td className="px-4 py-4 text-sm text-slate-600">
                            {payment.paymentDate}
                          </td>

                          <td className="px-4 py-4 font-semibold text-slate-900">
                            {formatCurrency(
                              payment.amount
                            )}
                          </td>

                          <td className="px-4 py-4 text-sm text-slate-600">
                            {
                              payment.paymentMethod
                            }
                          </td>

                          <td className="px-4 py-4 text-sm text-slate-600">
                            {payment.reference ||
                              "—"}
                          </td>

                          <td className="px-4 py-4 text-sm text-slate-500">
                            {payment.note || "—"}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentHistoryModal;