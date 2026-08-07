import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useMemo, useState } from "react";

import type { SchoolEvent } from "../types/event";

type EventCalendarProps = {
  events: SchoolEvent[];
  onEventClick: (event: SchoolEvent) => void;
};

function EventCalendar({
  events,
  onEventClick,
}: EventCalendarProps) {
  const [currentDate, setCurrentDate] =
    useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthLabel =
    new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(currentDate);

  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(
      year,
      month,
      1
    );

    const lastDayOfMonth = new Date(
      year,
      month + 1,
      0
    );

    const firstWeekday =
      firstDayOfMonth.getDay();

    const daysInMonth =
      lastDayOfMonth.getDate();

    const days: Array<{
      date: Date;
      isCurrentMonth: boolean;
    }> = [];

    for (
      let index = firstWeekday - 1;
      index >= 0;
      index--
    ) {
      days.push({
        date: new Date(
          year,
          month,
          -index
        ),
        isCurrentMonth: false,
      });
    }

    for (
      let day = 1;
      day <= daysInMonth;
      day++
    ) {
      days.push({
        date: new Date(
          year,
          month,
          day
        ),
        isCurrentMonth: true,
      });
    }

    while (days.length % 7 !== 0) {
      const lastDate =
        days[days.length - 1].date;

      const nextDate = new Date(
        lastDate
      );

      nextDate.setDate(
        nextDate.getDate() + 1
      );

      days.push({
        date: nextDate,
        isCurrentMonth: false,
      });
    }

    return days;
  }, [year, month]);

  function getEventsForDate(date: Date) {
    const dateKey = [
      date.getFullYear(),
      String(
        date.getMonth() + 1
      ).padStart(2, "0"),
      String(
        date.getDate()
      ).padStart(2, "0"),
    ].join("-");

    return events.filter(
      (event) =>
        event.startDate === dateKey
    );
  }

  function goToPreviousMonth() {
    setCurrentDate(
      new Date(
        year,
        month - 1,
        1
      )
    );
  }

  function goToNextMonth() {
    setCurrentDate(
      new Date(
        year,
        month + 1,
        1
      )
    );
  }

  function goToToday() {
    setCurrentDate(new Date());
  }

  const weekdays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {monthLabel}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            School event calendar
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goToPreviousMonth}
            className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
            aria-label="Previous month"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={goToToday}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Today
          </button>

          <button
            type="button"
            onClick={goToNextMonth}
            className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
            aria-label="Next month"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
        {weekdays.map((day) => (
          <div
            key={day}
            className="px-2 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {calendarDays.map(
          ({
            date,
            isCurrentMonth,
          }) => {
            const dayEvents =
              getEventsForDate(date);

            const isToday =
              date.toDateString() ===
              new Date().toDateString();

            return (
              <div
                key={date.toISOString()}
                className={`min-h-32 border-b border-r border-slate-100 p-2 ${
                  isCurrentMonth
                    ? "bg-white"
                    : "bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                      isToday
                        ? "bg-teal-700 text-white"
                        : isCurrentMonth
                          ? "text-slate-700"
                          : "text-slate-400"
                    }`}
                  >
                    {date.getDate()}
                  </span>
                </div>

                <div className="mt-2 space-y-1">
                  {dayEvents
                    .slice(0, 3)
                    .map((event) => (
                      <button
                        key={event.id}
                        type="button"
                        onClick={() =>
                          onEventClick(event)
                        }
                        className={`block w-full truncate rounded-lg px-2 py-1 text-left text-xs font-semibold ${
                          event.status ===
                          "Completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : event.status ===
                                "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-teal-100 text-teal-700"
                        }`}
                        title={event.title}
                      >
                        {event.startTime
                          ? `${event.startTime} `
                          : ""}
                        {event.title}
                      </button>
                    ))}

                  {dayEvents.length > 3 && (
                    <p className="px-1 text-xs font-medium text-slate-400">
                      +
                      {dayEvents.length -
                        3}{" "}
                      more
                    </p>
                  )}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default EventCalendar;