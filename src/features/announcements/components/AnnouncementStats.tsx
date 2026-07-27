import {
  Archive,
  FileClock,
  Megaphone,
  TriangleAlert,
} from "lucide-react";

type AnnouncementStatsProps = {
  totalAnnouncements: number;
  publishedAnnouncements: number;
  draftAnnouncements: number;
  urgentAnnouncements: number;
};

function AnnouncementStats({
  totalAnnouncements,
  publishedAnnouncements,
  draftAnnouncements,
  urgentAnnouncements,
}: AnnouncementStatsProps) {
  const stats = [
    {
      label: "Total Announcements",
      value: totalAnnouncements,
      icon: Megaphone,
    },
    {
      label: "Published",
      value: publishedAnnouncements,
      icon: Archive,
    },
    {
      label: "Drafts",
      value: draftAnnouncements,
      icon: FileClock,
    },
    {
      label: "Urgent",
      value: urgentAnnouncements,
      icon: TriangleAlert,
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.label}
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>
              </div>

              <div className="rounded-2xl bg-teal-50 p-3 text-teal-700">
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default AnnouncementStats;