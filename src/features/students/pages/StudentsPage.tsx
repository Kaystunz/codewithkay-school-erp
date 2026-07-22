
import StudentStats from "../components/StudentStats";
import StudentFilters from "../components/StudentFilters";
import StudentTable from "../components/StudentTable";
import { useStudentsContext } from "../hooks/useStudentsContext";
import AddStudentModal from "../components/AddStudentModal";
import { Plus } from "lucide-react";

function StudentsPage() {
const {
  students,
  filteredStudents,
  activeStudents,
  inactiveStudents,
  searchTerm,
  setSearchTerm,
  classFilter,
  setClassFilter,
  statusFilter,
  setStatusFilter,
  isModalOpen,
  setIsModalOpen,
  formData,
  setFormData,
  handleSubmit,
  isEditing,
} = useStudentsContext();


  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Students
          </h1>

          <p className="mt-2 text-slate-500">
            Manage student records, classes and guardians.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800"
        >
          <Plus size={20} />
          Add student
        </button>
      </section>

      <StudentStats
        totalStudents={students.length}
        activeStudents={activeStudents}
        inactiveStudents={inactiveStudents}
      />

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <StudentFilters
          searchTerm={searchTerm}
          classFilter={classFilter}
          statusFilter={statusFilter}
          onSearchChange={setSearchTerm}
          onClassFilterChange={setClassFilter}
          onStatusFilterChange={setStatusFilter}
        />

        <StudentTable students={filteredStudents} />
      </section>

      <AddStudentModal
        isOpen={isModalOpen}
        isEditing={isEditing}
        formData={formData}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        onFormChange={setFormData}
      />

    </div>
  );
}

export default StudentsPage;