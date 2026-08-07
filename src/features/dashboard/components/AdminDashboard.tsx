import { useMemo } from "react";
import { Link } from "react-router-dom";

import {
  CalendarCheck,
  CalendarDays,
  CreditCard,
  GraduationCap,
  MapPin,
  TrendingUp,
  Users,
} from "lucide-react";

import { useAttendanceContext } from "../../attendance/hooks/useAttendanceContext";
import { useFeesContext } from "../../fees/hooks/useFeesContext";
import { useStudentsContext } from "../../students/hooks/useStudentsContext";
import { useTeachersContext } from "../../teachers/hooks/useTeachersContext";
import { useActivityContext } from "../../activity/hooks/useActivityContext";
import { useEventsContext } from "../../events/hooks/useEventsContext";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatEventDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(
    new Date(`${date}T00:00:00`)
  );
}

function formatEventTime(time: string) {
  if (!time) {
    return "";
  }

  return new Intl.DateTimeFormat("en-NG", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(
    new Date(`2000-01-01T${time}:00`)
  );
}

function AdminDashboardPage() {
  const { recentActivities } =
    useActivityContext();

  const { upcomingEvents } =
    useEventsContext();

  const dashboardUpcomingEvents =
    upcomingEvents.slice(0, 5);

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
    const totalRecords =
      attendanceRecords.length;

    const presentRecords =
      attendanceRecords.filter(
        (record) =>
          record.status === "Present" ||
          record.status === "Late"
      ).length;

    const percentage =
      totalRecords > 0
        ? Math.round(
            (presentRecords /
              totalRecords) *
              100
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
          (totalCollected /
            totalExpected) *
            100
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

    return Object.entries(
      recordsGroupedByDate
    )
      .sort(
        ([firstDate], [secondDate]) =>
          new Date(firstDate).getTime() -
          new Date(
            secondDate
          ).getTime()
      )
      .slice(-5)
      .map(([date, records]) => {
        const percentage =
          records.total > 0
            ? Math.round(
                (records.attended /
                  records.total) *
                  100
              )
            : 0;

        const day =
          new Intl.DateTimeFormat(
            "en-US",
            {
              weekday: "short",
            }
          ).format(
            new Date(
              `${date}T00:00:00`
            )
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
      value:
        students.length.toString(),
      change: `${activeStudents} active, ${inactiveStudents} inactive`,
      icon: GraduationCap,
    },
    {
      title: "Teachers",
      value:
        teachers.length.toString(),
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
      value:
        formatCurrency(
          totalCollected
        ),
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
          Monitor students, staff,
          attendance, payments and school
          activities.
        </p>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map(
          (statistic) => {
            const Icon =
              statistic.icon;

            return (
              <article
                key={
                  statistic.title
                }
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {
                        statistic.title
                      }
                    </p>

                    <p className="mt-3 text-3xl font-bold text-slate-900">
                      {
                        statistic.value
                      }
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

                  <span>
                    {
                      statistic.change
                    }
                  </span>
                </div>
              </article>
            );
          }
        )}
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Recent attendance
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Attendance percentages
              from the latest five
              recorded school days
            </p>
          </div>

          {weeklyAttendance.length >
          0 ? (
            <div className="mt-8 flex h-72 items-end gap-4">
              {weeklyAttendance.map(
                (item) => (
                  <div
                    key={item.date}
                    className="flex flex-1 flex-col items-center gap-3"
                  >
                    <span className="text-sm font-semibold text-slate-700">
                      {
                        item.percentage
                      }
                      %
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
                )
              )}
            </div>
          ) : (
            <div className="mt-8 flex h-72 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
              <p className="text-sm text-slate-500">
                No attendance records
                are available yet.
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
              Latest updates across
              the portal
            </p>
          </div>

          {recentActivities.length ===
          0 ? (
            <p className="mt-6 text-sm text-slate-500">
              No recent activity yet.
            </p>
          ) : (
            <div className="mt-6 space-y-6">
              {recentActivities.map(
                (activity) => (
                  <div
                    key={
                      activity.id
                    }
                    className="flex gap-4"
                  >
                    <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-teal-600" />

                    <div>
                      <p className="font-semibold text-slate-800">
                        {
                          activity.title
                        }
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {
                          activity.description
                        }
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {new Date(
                          activity.createdAt
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </article>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Upcoming Events
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              The next scheduled
              school events
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
            <CalendarDays
              size={22}
            />
          </div>
        </div>

        {dashboardUpcomingEvents.length ===
        0 ? (
          <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <CalendarDays
              size={36}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 text-sm text-slate-500">
              No upcoming events are
              scheduled.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {dashboardUpcomingEvents.map(
              (event) => (
                <article
                  key={event.id}
                  className="rounded-xl border border-slate-100 p-4 transition hover:border-teal-200 hover:bg-teal-50/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900">
                        {
                          event.title
                        }
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        {formatEventDate(
                          event.startDate
                        )}

                        {event.startTime
                          ? ` • ${formatEventTime(
                              event.startTime
                            )}`
                          : ""}
                      </p>

                      {event.location && (
                        <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                          <MapPin
                            size={15}
                          />

                          {
                            event.location
                          }
                        </p>
                      )}
                    </div>

                    <span className="shrink-0 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                      {
                        event.eventType
                      }
                    </span>
                  </div>
                </article>
              )
            )}
          </div>
        )}

        {dashboardUpcomingEvents.length >
          0 && (
          <div className="mt-6 border-t border-slate-100 pt-4">
            <Link
              to="/events"
              className="inline-flex rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
            >
              View all events
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminDashboardPage;