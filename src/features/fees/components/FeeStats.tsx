import {
  Banknote,
  CircleDollarSign,
  CircleCheckBig,
  TriangleAlert,
} from "lucide-react";

type FeeStatsProps = {
  totalExpected: number;
  totalCollected: number;
  totalOutstanding: number;
  paidFees: number;
  overdueFees: number;
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

function FeeStats({
  totalExpected,
  totalCollected,
  totalOutstanding,
  paidFees,
  overdueFees,
}: FeeStatsProps) {
  const stats = [
    {
      label: "Expected Revenue",
      value: formatCurrency(totalExpected),
      icon: CircleDollarSign,
    },
    {
      label: "Collected",
      value: formatCurrency(totalCollected),
      icon: Banknote,
    },
    {
      label: "Outstanding",
      value: formatCurrency(totalOutstanding),
      icon: TriangleAlert,
    },
    {
      label: "Paid Fees",
      value: paidFees,
      icon: CircleCheckBig,
    },
    {
      label: "Overdue",
      value: overdueFees,
      icon: TriangleAlert,
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.label}
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {stat.value}
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

export default FeeStats;