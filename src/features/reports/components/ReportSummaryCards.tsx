import {
  GraduationCap,
  Percent,
  Wallet,
  TrendingUp,
} from "lucide-react";

import type { ReportSummary } from "../types/report";

type ReportSummaryCardsProps = {
  summary: ReportSummary;
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

function ReportSummaryCards({
  summary,
}: ReportSummaryCardsProps) {
  const cards = [
    {
      label: "Total Students",
      value: summary.totalStudents,
      icon: GraduationCap,
    },
    {
      label: "Attendance Rate",
      value: `${summary.attendanceRate}%`,
      icon: Percent,
    },
    {
      label: "Average Score",
      value: `${summary.averageScore}%`,
      icon: TrendingUp,
    },
    {
      label: "Fees Collected",
      value: formatCurrency(
        summary.totalFeesCollected
      ),
      icon: Wallet,
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.label}
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {card.value}
                </p>
              </div>

              <div className="rounded-2xl bg-teal-50 p-3 text-teal-700">
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default ReportSummaryCards;