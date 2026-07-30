import { useMemo } from "react";

import { useParentsContext } from "../../parents/hooks/useParentsContext";
import { useStudentsContext } from "../../students/hooks/useStudentsContext";
import { useTeachersContext } from "../../teachers/hooks/useTeachersContext";

import type {
  DirectoryPerson,
  DirectoryRole,
} from "../types/directory";

import {
  mapParentsToDirectory,
  mapStudentsToDirectory,
  mapTeachersToDirectory,
} from "../utils/mapDirectory";

export function useSchoolDirectory() {
  const { students } = useStudentsContext();
  const { teachers } = useTeachersContext();
  const { parents } = useParentsContext();

  const directory = useMemo<DirectoryPerson[]>(() => {
    return [
      ...mapTeachersToDirectory(teachers),
      ...mapStudentsToDirectory(students),
      ...mapParentsToDirectory(parents),
    ].sort((a, b) => a.name.localeCompare(b.name));
  }, [teachers, students, parents]);

  const getPeopleByRole = (
    role: DirectoryRole
  ): DirectoryPerson[] => {
    return directory.filter((person) => person.role === role);
  };

  const findDirectoryPerson = (
    role: DirectoryRole,
    linkedRecordId: number
  ): DirectoryPerson | undefined => {
    return directory.find(
      (person) =>
        person.role === role &&
        person.linkedRecordId === linkedRecordId
    );
  };

  return {
    directory,
    getPeopleByRole,
    findDirectoryPerson,
  };
}