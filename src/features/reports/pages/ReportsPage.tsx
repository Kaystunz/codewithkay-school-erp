import ReportSummaryCards from "../components/ReportSummaryCards";
import AttendanceReportCard from "../components/AttendanceReportCard";
import AcademicReportCard from "../components/AcademicReportCard";
import FeeReportCard from "../components/FeeReportCard";
import AssignmentReportCard from "../components/AssignmentReportCard";
import ClassPerformanceTable from "../components/ClassPerformanceTable";
import ReportFilters from "../components/ReportFilters";

import { useReports } from "../hooks/useReports";

function ReportsPage() {
  const {
    summary,
    attendanceReport,
    academicReport,
    feeReport,
    assignmentReport,
    classPerformance,

     classFilter,
    setClassFilter,

      termFilter,
     setTermFilter,

      sessionFilter,
     setSessionFilter,
  } = useReports();

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-slate-900">
          Reports & Analytics
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor school performance across academics,
          attendance, fees and assignments.
        </p>
      </section>
      <ReportFilters
        classFilter={classFilter}
        termFilter={termFilter}
        sessionFilter={sessionFilter}
        onClassFilterChange={setClassFilter}
        onTermFilterChange={setTermFilter}
        onSessionFilterChange={setSessionFilter}
        />

      <ReportSummaryCards summary={summary} />

      <section className="grid gap-6 xl:grid-cols-2">
        <AttendanceReportCard
          report={attendanceReport}
        />

        <AcademicReportCard
          report={academicReport}
        />

        <FeeReportCard report={feeReport} />

        <AssignmentReportCard
          report={assignmentReport}
        />
      </section>

      <ClassPerformanceTable
        performance={classPerformance}
      />
    </div>
  );
}

export default ReportsPage;