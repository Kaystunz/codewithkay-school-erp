import StudentStats from "../components/StudentStats";
import StudentFilters from "../components/StudentFilters";
import { initialStudents } from "../data/students";

import type {
  Student,
  StudentFormData,
  StudentGender,
  StudentStatus,
} from "../types/student";
import { useMemo, useState } from "react";
import {
  Mail,
  GraduationCap,
  MoreHorizontal,
  Phone,
  Plus,
  X,
} from "lucide-react";

const emptyStudentForm: StudentFormData = {
  name: "",
  admissionNumber: "",
  className: "Year 1",
  gender: "Male",
  parentName: "",
  phone: "",
  email: "",
  status: "Active",
};


function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("All classes");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] =
  useState<StudentFormData>(emptyStudentForm);
  
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.admissionNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        student.parentName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesClass =
        classFilter === "All classes" ||
        student.className === classFilter;

      const matchesStatus =
        statusFilter === "All statuses" ||
        student.status === statusFilter;

      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [students, searchTerm, classFilter, statusFilter]);

  const activeStudents = students.filter(
    (student) => student.status === "Active"
  ).length;

  const inactiveStudents = students.filter(
    (student) => student.status === "Inactive"
  ).length;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newStudent: Student = {
      id: Date.now(),
      ...formData,
    };

    setStudents((currentStudents) => [
      newStudent,
      ...currentStudents,
    ]);

    setFormData(emptyStudentForm);

    setIsModalOpen(false);
  }

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
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Student</th>
                <th className="px-5 py-4">Class</th>
                <th className="px-5 py-4">Parent</th>
                <th className="px-5 py-4">Contact</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="transition hover:bg-slate-50"
                >
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 font-bold text-teal-700">
                        {student.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          {student.name}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {student.admissionNumber}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-5 text-sm text-slate-600">
                    {student.className}
                  </td>

                  <td className="px-5 py-5 text-sm text-slate-600">
                    {student.parentName}
                  </td>

                  <td className="px-5 py-5">
                    <div className="space-y-1 text-sm text-slate-500">
                      <p className="flex items-center gap-2">
                        <Phone size={15} />
                        {student.phone}
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail size={15} />
                        {student.email}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-5">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        student.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td className="px-5 py-5 text-right">
                    <button
                      type="button"
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                      aria-label={`Open actions for ${student.name}`}
                    >
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredStudents.length === 0 && (
            <div className="p-12 text-center">
              <GraduationCap
                size={42}
                className="mx-auto text-slate-300"
              />
              <h3 className="mt-4 font-semibold text-slate-700">
                No students found
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Add new student
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter the student and guardian details.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close modal"
              >
                <X size={22} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid gap-5 p-6 sm:grid-cols-2"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Student name
                </label>
                <input
                  required
                  value={formData.name}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      name: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Admission number
                </label>
                <input
                  required
                  value={formData.admissionNumber}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      admissionNumber: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Class
                </label>
                <select
                  value={formData.className}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      className: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
                >
                  <option>Year 1</option>
                  <option>Year 2</option>
                  <option>Year 3</option>
                  <option>Year 4</option>
                  <option>Year 5</option>
                  <option>Year 6</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      gender: event.target.value as StudentGender,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Parent or guardian
                </label>
                <input
                  required
                  value={formData.parentName}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      parentName: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Phone number
                </label>
                <input
                  required
                  value={formData.phone}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      phone: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email address
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      email: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      status: event.target.value as StudentStatus,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5 sm:col-span-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800"
                >
                  Save student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentsPage;