import {
  BookOpen,
  CalendarCheck,
  CalendarDays,
  ClipboardList,
} from "lucide-react";

const cards = [
  {
    title: "My Classes",
    value: "4",
    description: "Classes currently assigned to you",
    icon: BookOpen,
  },
  {
    title: "Today's Classes",
    value: "3",
    description: "Lessons scheduled for today",
    icon: CalendarDays,
  },
  {
    title: "Attendance",
    value: "Pending",
    description: "Record attendance for today's classes",
    icon: CalendarCheck,
  },
  {
    title: "Assignments",
    value: "6",
    description: "Active assignments",
    icon: ClipboardList,
  },
];

function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Teacher Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your classes, attendance and assignments.
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

export default TeacherDashboard;