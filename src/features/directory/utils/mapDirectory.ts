import type { Parent } from "../../parents/types/parents";
import type { Student } from "../../students/types/student";
import type { Teacher } from "../../teachers/types/teacher";
import type {
  DirectoryPerson,
  DirectoryRole,
} from "../types/directory";

function createDirectoryId(
  role: DirectoryRole,
  linkedRecordId: number
) {
  return `${role}-${linkedRecordId}`;
}

export function mapTeachersToDirectory(
  teachers: Teacher[]
): DirectoryPerson[] {
  return teachers
    .filter((teacher) => teacher.status === "Active")
    .map((teacher) => ({
      id: createDirectoryId("Teacher", teacher.id),
      name: teacher.name,
      email: teacher.email,
      role: "Teacher",
      linkedRecordId: teacher.id,
      secondaryLabel: `${teacher.staffId} • ${teacher.department}`,
    }));
}

export function mapStudentsToDirectory(
  students: Student[]
): DirectoryPerson[] {
  return students
    .filter((student) => student.status === "Active")
    .map((student) => ({
      id: createDirectoryId("Student", student.id),
      name: student.name,
      email: student.email,
      role: "Student",
      linkedRecordId: student.id,
      secondaryLabel: `${student.admissionNumber} • ${student.className}`,
    }));
}

export function mapParentsToDirectory(
  parents: Parent[]
): DirectoryPerson[] {
  return parents
    .filter((parent) => parent.status === "Active")
    .map((parent) => ({
      id: createDirectoryId("Parent", parent.id),
      name: parent.name,
      email: parent.email,
      role: "Parent",
      linkedRecordId: parent.id,
      secondaryLabel: parent.relationship,
    }));
}