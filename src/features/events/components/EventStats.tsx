import {
  CalendarDays,
  CalendarCheck,
  CalendarX2,
  Clock3,
} from "lucide-react";

type EventStatsProps = {
  totalEvents: number;
  upcomingEvents: number;
  completedEvents: number;
  cancelledEvents: number;
};

function EventStats({
  totalEvents,
  upcomingEvents,
  completedEvents,
  cancelledEvents,
}: EventStatsProps) {
  const cards = [
    {
      title: "Total Events",
      value: totalEvents,
      icon: CalendarDays,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Upcoming",
      value: upcomingEvents,
      icon: Clock3,
      color: "bg-amber-100 text-amber-700",
    },
    {
      title: "Completed",
      value: completedEvents,
      icon: CalendarCheck,
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Cancelled",
      value: cancelledEvents,
      icon: CalendarX2,
      color: "bg-red-100 text-red-700",
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <h3 className="mt-2 text-3xl font-bold text-slate-900">
                  {card.value}
                </h3>
              </div>

              <div
                className={`rounded-xl p-3 ${card.color}`}
              >
                <Icon size={24} />
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default EventStats;