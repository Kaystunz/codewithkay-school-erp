
import { useEventsContext } from "../hooks/useEventsContext";

import AddEventModal from "../components/AddEventModal";
import { useToast } from "../../../components/ui/toast/useToast";
import { useState } from "react";
import {
  CalendarDays,
  List,
  Plus,
} from "lucide-react";

import EventCalendar from "../components/EventCalendar";

import EventTable from "../components/EventTable";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";

import type { SchoolEvent } from "../types/event";
import EventStats from "../components/EventStats";

import EventFilters from "../components/EventFilters";

function EventsPage() {
    const { showToast } = useToast();
    const [
  eventToDelete,
  setEventToDelete,
] = useState<SchoolEvent | null>(null);

const [viewMode, setViewMode] =
  useState<"table" | "calendar">(
    "table"
  );

 const {
  events,
  filteredEvents,
  upcomingEvents,


  completedEvents,
  cancelledEvents,

  searchTerm,
  setSearchTerm,

  typeFilter,
  setTypeFilter,

  statusFilter,
  setStatusFilter,

  isModalOpen,
  isEditing,

  formData,
  setFormData,

  openAddModal,
  closeModal,
  startEditing,
  deleteEvent,
  completeEvent,
  cancelEvent,
  handleSubmit,
} = useEventsContext();

  function handleFormSubmit(
  event: React.FormEvent<HTMLFormElement>
) {
  event.preventDefault();

  const result = handleSubmit();

  if (!result.success) {
    showToast({
      type: "error",
      message: result.message,
    });

    return;
  }

  showToast({
    type: "success",
    message:
      result.action === "updated"
        ? "Event updated successfully."
        : "Event created successfully.",
  });
}

function handleComplete(
  event: SchoolEvent
) {
  completeEvent(event.id);

  showToast({
    type: "success",
    message: `"${event.title}" marked as completed.`,
  });
}

function handleCancel(
  event: SchoolEvent
) {
  cancelEvent(event.id);

  showToast({
    type: "success",
    message: `"${event.title}" has been cancelled.`,
  });
}

function handleDelete() {
  if (!eventToDelete) {
    return;
  }

  deleteEvent(eventToDelete.id);

  showToast({
    type: "success",
    message: `"${eventToDelete.title}" was deleted successfully.`,
  });

  setEventToDelete(null);
}

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Events
          </h1>

          <p className="mt-2 text-slate-500">
            Manage school activities, meetings,
            examinations, holidays and celebrations.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800"
        >
          <Plus size={20} />
          New event
        </button>
      </section>

     <EventStats
        totalEvents={events.length}
        upcomingEvents={upcomingEvents.length}
        completedEvents={completedEvents}
        cancelledEvents={cancelledEvents}
        />
      <div className="flex justify-end">
  <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1">
    <button
      type="button"
      onClick={() =>
        setViewMode("table")
      }
      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
        viewMode === "table"
          ? "bg-teal-700 text-white"
          : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      <List size={17} />
      Table
    </button>

    <button
      type="button"
      onClick={() =>
        setViewMode("calendar")
      }
      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
        viewMode === "calendar"
          ? "bg-teal-700 text-white"
          : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      <CalendarDays size={17} />
      Calendar
    </button>
  </div>
</div>
        
     {viewMode === "table" ? (
  <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <EventFilters
      searchTerm={searchTerm}
      typeFilter={typeFilter}
      statusFilter={statusFilter}
      onSearchChange={setSearchTerm}
      onTypeFilterChange={setTypeFilter}
      onStatusFilterChange={
        setStatusFilter
      }
    />

    <EventTable
      events={filteredEvents}
      onEdit={startEditing}
      onDelete={setEventToDelete}
      onComplete={
        handleComplete
      }
      onCancel={handleCancel}
    />
  </section>
) : (
  <EventCalendar
    events={filteredEvents}
    onEventClick={startEditing}
  />
)}

      <AddEventModal
        isOpen={isModalOpen}
        isEditing={isEditing}
        formData={formData}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        onFormChange={setFormData}
        />

        <ConfirmDialog
        isOpen={eventToDelete !== null}
        title="Delete event?"
        message={
            eventToDelete
            ? `Are you sure you want to delete "${eventToDelete.title}"? This action cannot be undone.`
            : ""
        }
        confirmText="Delete Event"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() =>
            setEventToDelete(null)
        }
        />
    </div>

  );
}


export default EventsPage;