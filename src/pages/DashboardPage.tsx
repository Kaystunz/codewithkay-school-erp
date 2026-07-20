import {
  CalendarCheck,
  CreditCard,
  GraduationCap,
  TrendingUp,
  Users,
} from "lucide-react";

const statistics = [
  {
    title: "Total Students",
    value: "548",
    change: "+24 this term",
    icon: GraduationCap,
  },
  {
    title: "Teachers",
    value: "42",
    change: "38 active today",
    icon: Users,
  },
  {
    title: "Attendance",
    value: "94.2%",
    change: "+2.4% from yesterday",
    icon: CalendarCheck,
  },
  {
    title: "Fees Collected",
    value: "₦4.8M",
    change: "72% of expected fees",
    icon: CreditCard,
  },
];

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
    detail: "₦85,000 received from Ibrahim Musa",
    time: "1 hour ago",
  },
];

function DashboardPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          School overview
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor students, staff, attendance, payments and school activities.
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
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {statistic.title}
                  </p>

                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    {statistic.value}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  <Icon size={24} />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-sm text-emerald-600">
                <TrendingUp size={16} />
                <span>{statistic.change}</span>
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Weekly attendance
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Student attendance for the current week
              </p>
            </div>

            <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none">
              <option>This week</option>
              <option>Last week</option>
              <option>This month</option>
            </select>
          </div>

          <div className="mt-8 flex h-72 items-end gap-4">
            {[82, 90, 88, 94, 91].map((height, index) => (
              <div
                key={index}
                className="flex flex-1 flex-col items-center gap-3"
              >
                <div className="flex h-56 w-full items-end rounded-xl bg-slate-100 p-1">
                  <div
                    className="w-full rounded-lg bg-teal-700"
                    style={{ height: `${height}%` }}
                  />
                </div>

                <span className="text-sm font-medium text-slate-500">
                  {["Mon", "Tue", "Wed", "Thu", "Fri"][index]}
                </span>
              </div>
            ))}
          </div>
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
              <div key={activity.title} className="flex gap-4">
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

export default DashboardPage;