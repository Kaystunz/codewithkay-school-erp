import { BookOpenCheck } from "lucide-react";

import type { AcademicReport } from "../types/report";

type AcademicReportCardProps = {
  report: AcademicReport;
};

function AcademicReportCard({
  report,
}: AcademicReportCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-teal-50 p-3 text-teal-700">
          <BookOpenCheck size={22} />
        </div>

        <div>
          <h2 className="font-bold text-slate-900">
            Academic Performance
          </h2>

          <p className="text-sm text-slate-500">
            Overall student result analysis
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <Stat
          label="Average Score"
          value={`${report.averageScore}%`}
        />

        <Stat
          label="Highest Score"
          value={`${report.highestScore}%`}
        />

        <Stat
          label="Lowest Score"
          value={`${report.lowestScore}%`}
        />

        <Stat
          label="Results Recorded"
          value={report.totalResults}
        />
      </div>
    </section>
  );
}

type StatProps = {
  label: string;
  value: number | string;
};

function Stat({ label, value }: StatProps) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}

export default AcademicReportCard;