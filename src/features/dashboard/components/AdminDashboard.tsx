import { useMemo } from "react";
import {
  CalendarCheck,
  CreditCard,
  GraduationCap,
  TrendingUp,
  Users,
} from "lucide-react";

import { useAttendanceContext } from "../../attendance/hooks/useAttendanceContext";
import { useFeesContext } from "../../fees/hooks/useFeesContext";
import { useStudentsContext } from "../../students/hooks/useStudentsContext";
import { useTeachersContext } from "../../teachers/hooks/useTeachersContext";

const recentActivities = [
  {
    title: "New student registered",
    detail: "Aminat Yusuf was added to Year 4",
    time: "10 minutes ago",
  },
  {
    title: "Attendance submitted",
    detail: "Mrs. Lawal submitted Year 2 attendance",
    time: "32 minutes ago",
  },
  {
    title: "Payment received",
    detail: "A payment was recorded successfully",
    time: "1 hour ago",
  },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

function AdminDashboardPage() {
  const {
    students,
    activeStudents,
    inactiveStudents,
  } = useStudentsContext();

  const {
    teachers,
    activeTeachers,
    teachersOnLeave,
  } = useTeachersContext();

  const { attendanceRecords } =
    useAttendanceContext();

  const {
    totalExpected,
    totalCollected,
    totalOutstanding,
  } = useFeesContext();

  const attendanceStatistics = useMemo(() => {
    const totalRecords = attendanceRecords.length;

    const presentRecords = attendanceRecords.filter(
      (record) =>
        record.status === "Present" ||
        record.status === "Late"
    ).length;

    const percentage =
      totalRecords > 0
        ? Math.round(
            (presentRecords / totalRecords) * 100
          )
        : 0;

    return {
      totalRecords,
      presentRecords,
      percentage,
    };
  }, [attendanceRecords]);

  const feeCollectionPercentage =
    totalExpected > 0
      ? Math.round(
          (totalCollected / totalExpected) * 100
        )
      : 0;

  const weeklyAttendance = useMemo(() => {
    const recordsGroupedByDate =
      attendanceRecords.reduce<
        Record<
          string,
          {
            total: number;
            attended: number;
          }
        >
      >((groups, record) => {
        if (!groups[record.date]) {
          groups[record.date] = {
            total: 0,
            attended: 0,
          };
        }

        groups[record.date].total += 1;

        if (
          record.status === "Present" ||
          record.status === "Late"
        ) {
          groups[record.date].attended += 1;
        }

        return groups;
      }, {});

    return Object.entries(recordsGroupedByDate)
      .sort(
        ([firstDate], [secondDate]) =>
          new Date(firstDate).getTime() -
          new Date(secondDate).getTime()
      )
      .slice(-5)
      .map(([date, records]) => {
        const percentage =
          records.total > 0
            ? Math.round(
                (records.attended / records.total) *
                  100
              )
            : 0;

        const day = new Intl.DateTimeFormat(
          "en-US",
          {
            weekday: "short",
          }
        ).format(
          new Date(`${date}T00:00:00`)
        );

        return {
          date,
          day,
          percentage,
        };
      });
  }, [attendanceRecords]);

  const statistics = [
    {
      title: "Total Students",
      value: students.length.toString(),
      change: `${activeStudents} active, ${inactiveStudents} inactive`,
      icon: GraduationCap,
    },
    {
      title: "Teachers",
      value: teachers.length.toString(),
      change: `${activeTeachers} active, ${teachersOnLeave} on leave`,
      icon: Users,
    },
    {
      title: "Attendance",
      value: `${attendanceStatistics.percentage}%`,
      change: `${attendanceStatistics.presentRecords} of ${attendanceStatistics.totalRecords} records present`,
      icon: CalendarCheck,
    },
    {
      title: "Fees Collected",
      value: formatCurrency(totalCollected),
      change: `${feeCollectionPercentage}% collected, ${formatCurrency(
        totalOutstanding
      )} outstanding`,
      icon: CreditCard,
    },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          School overview
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor students, staff, attendance,
          payments and school activities.
        </p>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((statistic) => {
          const Icon = statistic.icon;

          return (
            <article
              key={statistic.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {statistic.title}
                  </p>

                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    {statistic.value}
                  </p>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  <Icon size={24} />
                </div>
              </div>

              <div className="mt-5 flex items-start gap-2 text-sm text-emerald-600">
                <TrendingUp
                  className="mt-0.5 shrink-0"
                  size={16}
                />

                <span>{statistic.change}</span>
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Recent attendance
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Attendance percentages from the latest
              five recorded school days
            </p>
          </div>

          {weeklyAttendance.length > 0 ? (
            <div className="mt-8 flex h-72 items-end gap-4">
              {weeklyAttendance.map((item) => (
                <div
                  key={item.date}
                  className="flex flex-1 flex-col items-center gap-3"
                >
                  <span className="text-sm font-semibold text-slate-700">
                    {item.percentage}%
                  </span>

                  <div className="flex h-52 w-full items-end rounded-xl bg-slate-100 p-1">
                    <div
                      className="w-full rounded-lg bg-teal-700 transition-all duration-300"
                      style={{
                        height: `${item.percentage}%`,
                      }}
                    />
                  </div>

                  <span className="text-sm font-medium text-slate-500">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8 flex h-72 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
              <p className="text-sm text-slate-500">
                No attendance records are available
                yet.
              </p>
            </div>
          )}
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Recent activity
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest updates across the portal
            </p>
          </div>

          <div className="mt-6 space-y-6">
            {recentActivities.map((activity) => (
              <div
                key={activity.title}
                className="flex gap-4"
              >
                <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-teal-600" />

                <div>
                  <p className="font-semibold text-slate-800">
                    {activity.title}
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {activity.detail}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

export default AdminDashboardPage;