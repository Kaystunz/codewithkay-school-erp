import { Plus } from "lucide-react";

import { useEventsContext } from "../hooks/useEventsContext";

import AddEventModal from "../components/AddEventModal";
import { useToast } from "../../../components/ui/toast/useToast";
import { useState } from "react";

import EventTable from "../components/EventTable";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";

import type { SchoolEvent } from "../types/event";

function EventsPage() {
    const { showToast } = useToast();
    const [
  eventToDelete,
  setEventToDelete,
] = useState<SchoolEvent | null>(null);

 const {
  events,
  filteredEvents,
  upcomingEvents,

  isModalOpen,
  isEditing,

  formData,
  setFormData,

  openAddModal,
  closeModal,
  startEditing,
  deleteEvent,
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

      <section className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Total events
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {events.length}
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Upcoming events
          </p>

          <p className="mt-2 text-3xl font-bold text-teal-700">
            {upcomingEvents.length}
          </p>
        </article>
      </section>
      
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <EventTable
            events={filteredEvents}
            onEdit={startEditing}
            onDelete={setEventToDelete}
        />
        </section>

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