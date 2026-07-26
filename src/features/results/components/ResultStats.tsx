import {
  BarChart3,
  CheckCircle2,
  FileText,
  Percent,
} from "lucide-react";

type ResultStatsProps = {
  totalResults: number;
  publishedResults: number;
  draftResults: number;
  averageScore: number;
  passRate: number;
};

function ResultStats({
  totalResults,
  publishedResults,
  draftResults,
  averageScore,
  passRate,
}: ResultStatsProps) {
  const stats = [
    {
      label: "Total Results",
      value: totalResults,
      icon: FileText,
    },
    {
      label: "Published",
      value: publishedResults,
      icon: CheckCircle2,
    },
    {
      label: "Drafts",
      value: draftResults,
      icon: BarChart3,
    },
    {
      label: "Average Score",
      value: `${averageScore}%`,
      icon: Percent,
    },
    {
      label: "Pass Rate",
      value: `${passRate}%`,
      icon: Percent,
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
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.label}
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
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

export default ResultStats;