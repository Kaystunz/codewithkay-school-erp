export type ClassStatus = "Active" | "Inactive";

export type SchoolClass = {
  id: number;
  name: string;
  section: string;
  classTeacherId: number | null;
  studentIds: number[];
  subjects: string[];
  capacity: number;
  academicSession: string;
  room: string;
  status: ClassStatus;
};

export type ClassFormData = Omit<SchoolClass, "id">;