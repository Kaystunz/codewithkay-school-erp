import { Plus } from "lucide-react";

import AssignmentStats from "../components/AssignmentStats";
import AssignmentFilters from "../components/AssignmentFilters";
import AssignmentTable from "../components/AssignmentTable";
import AddAssignmentModal from "../components/AddAssignmentModal";

import { useAssignmentsContext } from "../hooks/useAssignmentsContext";
import { useToast } from "../../../components/ui/toast/useToast";

function AssignmentsPage() {
  const { showToast } = useToast();

  const {
    assignments,
    filteredAssignments,

    publishedAssignments,
    draftAssignments,
    closedAssignments,

    searchTerm,
    setSearchTerm,

    classFilter,
    setClassFilter,

    statusFilter,
    setStatusFilter,

    isAssignmentModalOpen,

    assignmentFormData,
    setAssignmentFormData,

    isEditingAssignment,

    openAddAssignmentModal,
    closeAssignmentModal,
    handleAssignmentSubmit,
  } = useAssignmentsContext();

  function handleFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    const result =
      handleAssignmentSubmit(event);

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
          ? "Assignment updated successfully."
          : "Assignment added successfully.",
    });
  }

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Assignments
          </h1>

          <p className="mt-2 text-slate-500">
            Manage homework, assignments and submissions.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddAssignmentModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800"
        >
          <Plus size={20} />
          Add assignment
        </button>
      </section>

      <AssignmentStats
        totalAssignments={assignments.length}
        publishedAssignments={
          publishedAssignments
        }
        draftAssignments={draftAssignments}
        closedAssignments={closedAssignments}
      />

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <AssignmentFilters
          searchTerm={searchTerm}
          classFilter={classFilter}
          statusFilter={statusFilter}
          onSearchChange={setSearchTerm}
          onClassFilterChange={setClassFilter}
          onStatusFilterChange={setStatusFilter}
        />

        <AssignmentTable
          assignments={filteredAssignments}
        />
      </section>

      <AddAssignmentModal
        isOpen={isAssignmentModalOpen}
        isEditing={isEditingAssignment}
        formData={assignmentFormData}
        onClose={closeAssignmentModal}
        onSubmit={handleFormSubmit}
        onFormChange={
          setAssignmentFormData
        }
      />
    </div>
  );
}

export default AssignmentsPage;