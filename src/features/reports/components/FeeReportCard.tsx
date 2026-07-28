import { WalletCards } from "lucide-react";

import type { FeeReport } from "../types/report";

type FeeReportCardProps = {
  report: FeeReport;
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

function FeeReportCard({
  report,
}: FeeReportCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-teal-50 p-3 text-teal-700">
          <WalletCards size={22} />
        </div>

        <div>
          <h2 className="font-bold text-slate-900">
            Fee Collection
          </h2>

          <p className="text-sm text-slate-500">
            Financial collection overview
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <MoneyRow
          label="Expected"
          value={formatCurrency(report.expected)}
        />

        <MoneyRow
          label="Collected"
          value={formatCurrency(report.collected)}
        />

        <MoneyRow
          label="Outstanding"
          value={formatCurrency(report.outstanding)}
        />
      </div>

      <div className="mt-6 border-t border-slate-100 pt-5">
        <p className="text-sm text-slate-500">
          Collection Rate
        </p>

        <p className="mt-1 text-3xl font-bold text-slate-900">
          {report.collectionRate}%
        </p>
      </div>
    </section>
  );
}

type MoneyRowProps = {
  label: string;
  value: string;
};

function MoneyRow({
  label,
  value,
}: MoneyRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="font-bold text-slate-800">
        {value}
      </span>
    </div>
  );
}

export default FeeReportCard;