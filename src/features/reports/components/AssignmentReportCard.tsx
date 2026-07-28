import { ClipboardCheck } from "lucide-react";

import type { AssignmentReport } from "../types/report";

type AssignmentReportCardProps = {
  report: AssignmentReport;
};

function AssignmentReportCard({
  report,
}: AssignmentReportCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-teal-50 p-3 text-teal-700">
          <ClipboardCheck size={22} />
        </div>

        <div>
          <h2 className="font-bold text-slate-900">
            Assignments
          </h2>

          <p className="text-sm text-slate-500">
            Submission and grading overview
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <Stat
          label="Assignments"
          value={report.totalAssignments}
        />

        <Stat
          label="Submissions"
          value={report.totalSubmissions}
        />

        <Stat
          label="Graded"
          value={report.gradedSubmissions}
        />

        <Stat
          label="Completion"
          value={`${report.completionRate}%`}
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

export default AssignmentReportCard;