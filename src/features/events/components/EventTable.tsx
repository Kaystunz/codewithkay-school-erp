import {
  CalendarCheck,
  CalendarRange,
  CalendarX2,
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
  onComplete: (event: SchoolEvent) => void;
  onCancel: (event: SchoolEvent) => void;
};

function EventTable({
  events,
  onEdit,
  onDelete,
  onComplete,
  onCancel,
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

  function formatTime(time: string) {
    if (!time) {
      return "Time not specified";
    }

    return new Intl.DateTimeFormat("en-NG", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(
      new Date(`2000-01-01T${time}:00`)
    );
  }

  function getEventTypeStyle(
    eventType: SchoolEvent["eventType"]
  ) {
    switch (eventType) {
      case "Academic":
        return "bg-blue-100 text-blue-700";

      case "Meeting":
        return "bg-purple-100 text-purple-700";

      case "Holiday":
        return "bg-orange-100 text-orange-700";

      case "Examination":
        return "bg-red-100 text-red-700";

      case "Sports":
        return "bg-emerald-100 text-emerald-700";

      case "Celebration":
        return "bg-pink-100 text-pink-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-slate-50">
          <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <th className="px-5 py-4">
              Event
            </th>

            <th className="px-5 py-4">
              Audience
            </th>

            <th className="px-5 py-4">
              Date and time
            </th>

            <th className="px-5 py-4">
              Location
            </th>

            <th className="px-5 py-4">
              Status
            </th>

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

                  <span
                    className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getEventTypeStyle(
                      event.eventType
                    )}`}
                  >
                    {event.eventType}
                  </span>

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
                    {formatTime(event.startTime)}
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
                    {event.status === "Scheduled" && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            onComplete(event)
                          }
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700"
                          title="Mark event as completed"
                        >
                          <CalendarCheck size={18} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            onCancel(event)
                          }
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-amber-50 hover:text-amber-700"
                          title="Cancel event"
                        >
                          <CalendarX2 size={18} />
                        </button>
                      </>
                    )}

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
                      onClick={() =>
                        onDelete(event)
                      }
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