import {
  Banknote,
  Pencil,
  ReceiptText,
} from "lucide-react";

import type { FeeRecord } from "../types/fee";
import { useStudentsContext } from "../../students/hooks/useStudentsContext";
import { useClassesContext } from "../../classes/hooks/useClassesContext";
import { useFeesContext } from "../hooks/useFeesContext";

type FeeTableProps = {
  fees: FeeRecord[];
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

function FeeTable({ fees }: FeeTableProps) {
  const { students } = useStudentsContext();
  const { classes } = useClassesContext();

  const {
    startEditingFee,
    startPayment,
    openPaymentHistory,
  } = useFeesContext();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-slate-50">
          <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <th className="px-5 py-4">Student</th>
            <th className="px-5 py-4">Class</th>
            <th className="px-5 py-4">Fee</th>
            <th className="px-5 py-4">Due</th>
            <th className="px-5 py-4">Paid</th>
            <th className="px-5 py-4">Balance</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4 text-right">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {fees.map((fee) => {
            const student = students.find(
              (item) => item.id === fee.studentId
            );

            const schoolClass = classes.find(
              (item) => item.id === fee.classId
            );

            return (
              <tr
                key={fee.id}
                className="hover:bg-slate-50"
              >
                <td className="px-5 py-4 font-semibold text-slate-900">
                  {student?.name ?? "Unknown student"}
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {schoolClass
                    ? `${schoolClass.name} ${schoolClass.section}`
                    : "Unknown class"}
                </td>

                <td className="px-5 py-4">
                  <p className="font-semibold text-slate-800">
                    {fee.feeType}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {fee.term} · {fee.academicSession}
                  </p>
                </td>

                <td className="px-5 py-4 text-slate-700">
                  {formatCurrency(fee.amountDue)}
                </td>

                <td className="px-5 py-4 text-slate-700">
                  {formatCurrency(fee.amountPaid)}
                </td>

                <td className="px-5 py-4 font-semibold text-slate-900">
                  {formatCurrency(fee.balance)}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      fee.status === "Paid"
                        ? "bg-emerald-100 text-emerald-700"
                        : fee.status === "Partially Paid"
                          ? "bg-blue-100 text-blue-700"
                          : fee.status === "Overdue"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {fee.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        startPayment(fee)
                      }
                      disabled={fee.balance === 0}
                      className="rounded-lg p-2 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                      title="Record payment"
                    >
                      <Banknote size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        startEditingFee(fee)
                      }
                      className="rounded-lg p-2 text-slate-500 hover:bg-teal-50 hover:text-teal-700"
                      title="Edit fee"
                    >
                      <Pencil size={18} />
                    </button>

                   <button
                     type="button"
                         onClick={() => openPaymentHistory(fee.id)}
                     className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                     title="View payment history"
                            >
                     <ReceiptText size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {fees.length === 0 && (
        <div className="p-12 text-center">
          <ReceiptText
            size={42}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-4 font-semibold text-slate-700">
            No fee records found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try changing your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}

export default FeeTable;