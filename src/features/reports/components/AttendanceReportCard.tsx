import { CalendarCheck } from "lucide-react";

import type { AttendanceReport } from "../types/report";

type AttendanceReportCardProps = {
  report: AttendanceReport;
};

function AttendanceReportCard({
  report,
}: AttendanceReportCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-teal-50 p-3 text-teal-700">
          <CalendarCheck size={22} />
        </div>

        <div>
          <h2 className="font-bold text-slate-900">
            Attendance
          </h2>

          <p className="text-sm text-slate-500">
            Overall attendance performance
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <Stat label="Present" value={report.present} />
        <Stat label="Absent" value={report.absent} />
        <Stat label="Late" value={report.late} />
        <Stat label="Excused" value={report.excused} />
      </div>

      <div className="mt-6 border-t border-slate-100 pt-5">
        <p className="text-sm text-slate-500">
          Attendance Rate
        </p>

        <p className="mt-1 text-3xl font-bold text-slate-900">
          {report.attendanceRate}%
        </p>
      </div>
    </section>
  );
}

type StatProps = {
  label: string;
  value: number;
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

export default AttendanceReportCard;