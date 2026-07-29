import {
  BookOpen,
  CalendarCheck,
  CalendarDays,
  ClipboardList,
} from "lucide-react";

const cards = [
  {
    title: "Attendance",
    value: "94%",
    description: "Your attendance for the current term",
    icon: CalendarCheck,
  },
  {
    title: "Average Score",
    value: "78%",
    description: "Your current academic average",
    icon: BookOpen,
  },
  {
    title: "Today's Classes",
    value: "5",
    description: "Classes scheduled for today",
    icon: CalendarDays,
  },
  {
    title: "Pending Assignments",
    value: "3",
    description: "Assignments you still need to complete",
    icon: ClipboardList,
  },
];

function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Student Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View your classes, results, attendance and assignments.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {card.title}
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {card.value}
                  </p>
                </div>

                <div className="rounded-xl bg-teal-50 p-3 text-teal-700">
                  <Icon size={22} />
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-500">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StudentDashboard;