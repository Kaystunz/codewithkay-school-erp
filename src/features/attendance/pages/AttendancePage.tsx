import { Save, Users } from "lucide-react";

import AttendanceStats from "../components/AttendanceStats";

import { useAttendanceContext } from "../hooks/useAttendanceContext";
import { useClassesContext } from "../../classes/hooks/useClassesContext";
import { useStudentsContext } from "../../students/hooks/useStudentsContext";
import { useToast } from "../../../components/ui/toast/useToast";
import AttendanceHistory from "../components/AttendanceHistory";
import type { AttendanceStatus } from "../types/attendance";

function AttendancePage() {
  const { showToast } = useToast();

  const {
     attendanceRecords,

    selectedClassId,
    setSelectedClassId,

    selectedDate,
    setSelectedDate,

    draftAttendance,

    presentCount,
    absentCount,
    lateCount,
    excusedCount,

    initializeAttendance,
    updateStudentStatus,
    updateStudentNote,
    markAllPresent,
    saveAttendance,
    attendancePercentage,
   
  } = useAttendanceContext();

  const { classes } = useClassesContext();
  const { students } = useStudentsContext();

  const selectedClass = classes.find(
    (schoolClass) =>
      schoolClass.id === selectedClassId
  );

  const classStudents = selectedClass
    ? students.filter((student) =>
        selectedClass.studentIds.includes(student.id)
      )
    : [];

  function handleClassChange(
    classId: number | null
  ) {
    setSelectedClassId(classId);

    if (!classId) {
      initializeAttendance([]);
      return;
    }

    const schoolClass = classes.find(
      (currentClass) =>
        currentClass.id === classId
    );

    if (!schoolClass) {
      initializeAttendance([]);
      return;
    }

    initializeAttendance(
      schoolClass.studentIds
    );
  }

  function handleSave() {
    const result = saveAttendance();

    if (!result.success) {
      showToast({
        type: "error",
        message: result.message,
      });

      return;
    }

    showToast({
      type: "success",
      message: `Attendance saved for ${result.savedCount} student${
        result.savedCount === 1 ? "" : "s"
      }.`,
    });
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-slate-900">
          Attendance
        </h1>

        <p className="mt-2 text-slate-500">
          Mark and manage daily student attendance.
        </p>
      </section>

      <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Class
          </label>

          <select
            value={selectedClassId ?? ""}
            onChange={(event) =>
              handleClassChange(
                event.target.value
                  ? Number(event.target.value)
                  : null
              )
            }
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600"
          >
            <option value="">
              Select a class
            </option>

            {classes.map((schoolClass) => (
              <option
                key={schoolClass.id}
                value={schoolClass.id}
              >
                {schoolClass.name}{" "}
                {schoolClass.section}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Date
          </label>

          <input
            type="date"
            value={selectedDate}
            onChange={(event) =>
              setSelectedDate(event.target.value)
            }
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600"
          />
        </div>
      </section>

      <AttendanceStats
        presentCount={presentCount}
        absentCount={absentCount}
        lateCount={lateCount}
        excusedCount={excusedCount}
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500">
        Attendance Rate
      </p>

      <p className="mt-1 text-3xl font-bold text-slate-900">
        {attendancePercentage}%
      </p>
    </div>

    <p className="text-sm text-slate-500">
      Present and late students are counted as attended.
    </p>
  </div>
</section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Student Attendance
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {selectedClass
                ? `${selectedClass.name} ${selectedClass.section}`
                : "Select a class to begin."}
            </p>
          </div>

          {selectedClass && (
            <button
              type="button"
              onClick={markAllPresent}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Mark All Present
            </button>
          )}
        </div>

        {!selectedClass ? (
          <div className="p-12 text-center">
            <Users
              size={42}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-semibold text-slate-700">
              Select a class
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Choose a class to load its students.
            </p>
          </div>
        ) : classStudents.length === 0 ? (
          <div className="p-12 text-center">
            <Users
              size={42}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-semibold text-slate-700">
              No students assigned
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              This class does not currently have any students.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {classStudents.map((student) => {
              const attendance =
                draftAttendance.find(
                  (item) =>
                    item.studentId === student.id
                );

              if (!attendance) {
                return null;
              }

              return (
                <div
                  key={student.id}
                  className="grid gap-4 p-5 lg:grid-cols-[1.3fr_1fr_1.5fr]"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {student.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {student.admissionNumber}
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Status
                    </label>

                    <select
                      value={attendance.status}
                      onChange={(event) =>
                        updateStudentStatus(
                          student.id,
                          event.target
                            .value as AttendanceStatus
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600"
                    >
                      <option>Present</option>
                      <option>Absent</option>
                      <option>Late</option>
                      <option>Excused</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Note
                    </label>

                    <input
                      value={attendance.note}
                      onChange={(event) =>
                        updateStudentNote(
                          student.id,
                          event.target.value
                        )
                      }
                      placeholder="Optional note..."
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {selectedClass &&
          classStudents.length > 0 && (
            <div className="flex justify-end border-t border-slate-200 p-5">
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800"
              >
                <Save size={19} />
                Save Attendance
              </button>
            </div>
          )}
      </section>
      <AttendanceHistory records={attendanceRecords} />
    </div>
  );
}

export default AttendancePage;