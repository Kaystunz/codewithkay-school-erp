import { Plus } from "lucide-react";

import TeacherStats from "../components/TeacherStats";
import TeacherFilters from "../components/TeacherFilters";
import TeacherTable from "../components/TeacherTable";
import AddTeacherModal from "../components/AddTeacherModal";

import { useTeachersContext } from "../hooks/useTeachersContext";
import { useToast } from "../../../components/ui/toast/useToast";

function TeachersPage() {
  const { showToast } = useToast();

  const {
    teachers,
    filteredTeachers,

    activeTeachers,
    inactiveTeachers,
    teachersOnLeave,

    searchTerm,
    setSearchTerm,

    departmentFilter,
    setDepartmentFilter,

    statusFilter,
    setStatusFilter,

    isModalOpen,
    setIsModalOpen,

    formData,
    setFormData,

    handleSubmit,

    isEditing,
  } = useTeachersContext();

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
          ? "Teacher updated successfully."
          : "Teacher added successfully.",
    });
  }

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Teachers
          </h1>

          <p className="mt-2 text-slate-500">
            Manage teacher records, departments and subjects.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800"
        >
          <Plus size={20} />
          Add teacher
        </button>
      </section>

      <TeacherStats
        totalTeachers={teachers.length}
        activeTeachers={activeTeachers}
        inactiveTeachers={inactiveTeachers}
        teachersOnLeave={teachersOnLeave}
      />

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <TeacherFilters
          searchTerm={searchTerm}
          departmentFilter={departmentFilter}
          statusFilter={statusFilter}
          onSearchChange={setSearchTerm}
          onDepartmentFilterChange={setDepartmentFilter}
          onStatusFilterChange={setStatusFilter}
        />

        <TeacherTable teachers={filteredTeachers} />
      </section>

      <AddTeacherModal
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

export default TeachersPage;