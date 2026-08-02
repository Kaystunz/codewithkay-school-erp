import {
  CalendarRange,
  MapPin,
  Pencil,
  Trash2,
} from "lucide-react";

import type { SchoolEvent } from "../types/event";
import { useClassesContext } from "../../classes/hooks/useClassesContext";

type EventTableProps = {
  events: SchoolEvent[];
  onEdit: (event: SchoolEvent) => void;
  onDelete: (event: SchoolEvent) => void;
};

function EventTable({
  events,
  onEdit,
  onDelete,
}: EventTableProps) {
  const { classes } = useClassesContext();

  function formatDate(date: string) {
    if (!date) {
      return "—";
    }

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(`${date}T00:00:00`));
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-slate-50">
          <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <th className="px-5 py-4">Event</th>
            <th className="px-5 py-4">Audience</th>
            <th className="px-5 py-4">Date and time</th>
            <th className="px-5 py-4">Location</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4 text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {events.map((event) => {
            const schoolClass =
              event.classId !== null
                ? classes.find(
                    (item) =>
                      item.id === event.classId
                  )
                : undefined;

            const audience =
              event.audience === "Class"
                ? schoolClass
                  ? `${schoolClass.name} ${schoolClass.section}`
                  : "Unknown class"
                : event.audience;

            return (
              <tr
                key={event.id}
                className="transition hover:bg-slate-50"
              >
                <td className="px-5 py-4">
                  <p className="font-semibold text-slate-900">
                    {event.title}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                      {event.eventType}
                    </span>
                  </div>

                  {event.description && (
                    <p className="mt-2 max-w-sm truncate text-sm text-slate-500">
                      {event.description}
                    </p>
                  )}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {audience}
                </td>

                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-slate-700">
                    {formatDate(event.startDate)}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {event.startTime || "Time not specified"}
                  </p>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin
                      size={16}
                      className="shrink-0 text-slate-400"
                    />

                    <span>
                      {event.location ||
                        "Not specified"}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      event.status === "Scheduled"
                        ? "bg-blue-100 text-blue-700"
                        : event.status === "Completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {event.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(event)}
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-teal-50 hover:text-teal-700"
                      title="Edit event"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(event)}
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                      title="Delete event"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {events.length === 0 && (
        <div className="p-12 text-center">
          <CalendarRange
            size={44}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-4 font-semibold text-slate-700">
            No events found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Create a new event or adjust your filters.
          </p>
        </div>
      )}
    </div>
  );
}

export default EventTable;