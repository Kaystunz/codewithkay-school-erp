import { Plus } from "lucide-react";

import ClassStats from "../components/ClassStats";
import ClassFilters from "../components/ClassFilters";
import ClassTable from "../components/ClassTable";
import AddClassModal from "../components/AddClassModal";

import { useClassesContext } from "../hooks/useClassesContext";
import { useToast } from "../../../components/ui/toast/useToast";

function ClassesPage() {
  const { showToast } = useToast();

  const {
    classes,
    filteredClasses,

    activeClasses,
    totalStudents,
    totalCapacity,

    searchTerm,
    setSearchTerm,

    statusFilter,
    setStatusFilter,

    sessionFilter,
    setSessionFilter,

    isModalOpen,
    setIsModalOpen,

    formData,
    setFormData,

    handleSubmit,

    isEditing,
  } = useClassesContext();

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
          ? "Class updated successfully."
          : "Class added successfully.",
    });
  }

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Classes
          </h1>

          <p className="mt-2 text-slate-500">
            Manage classes, class teachers, students and academic sessions.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800"
        >
          <Plus size={20} />
          Add class
        </button>
      </section>

      <ClassStats
        totalClasses={classes.length}
        activeClasses={activeClasses}
        totalStudents={totalStudents}
        totalCapacity={totalCapacity}
      />

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <ClassFilters
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          sessionFilter={sessionFilter}
          onSearchChange={setSearchTerm}
          onStatusFilterChange={setStatusFilter}
          onSessionFilterChange={setSessionFilter}
        />

        <ClassTable classes={filteredClasses} />
      </section>

      <AddClassModal
        isOpen={isModalOpen}
        isEditing={isEditing}
        formData={formData}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        onFormChange={setFormData}
      />
    </div>
  );
}

export default ClassesPage;