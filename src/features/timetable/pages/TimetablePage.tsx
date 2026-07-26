import { Plus } from "lucide-react";

import TimetableFilters from "../components/TimetableFilters";
import TimetableTable from "../components/TimetableTable";
import AddTimetableModal from "../components/AddTimetableModal";

import { useTimetableContext } from "../hooks/useTimetableContext";
import { useToast } from "../../../components/ui/toast/useToast";

function TimetablePage() {
  const { showToast } = useToast();

  const {
    filteredEntries,

    classFilter,
    setClassFilter,

    dayFilter,
    setDayFilter,

    isModalOpen,

    formData,
    setFormData,

    isEditing,

    openAddModal,
    closeModal,
    handleSubmit,
  } = useTimetableContext();

  function handleFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    const result = handleSubmit(event);

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
          ? "Timetable entry updated successfully."
          : "Timetable entry added successfully.",
    });
  }

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Timetable
          </h1>

          <p className="mt-2 text-slate-500">
            Manage class lessons, teachers, rooms and time slots.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800"
        >
          <Plus size={20} />
          Add lesson
        </button>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <TimetableFilters
          classFilter={classFilter}
          dayFilter={dayFilter}
          onClassFilterChange={setClassFilter}
          onDayFilterChange={setDayFilter}
        />

        <TimetableTable entries={filteredEntries} />
      </section>

      <AddTimetableModal
        isOpen={isModalOpen}
        isEditing={isEditing}
        formData={formData}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        onFormChange={setFormData}
      />
    </div>
  );
}

export default TimetablePage;