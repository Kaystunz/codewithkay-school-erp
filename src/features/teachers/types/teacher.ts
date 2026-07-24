export type TeacherGender = "Male" | "Female";

export type TeacherStatus =
  | "Active"
  | "Inactive"
  | "On Leave";

export type Teacher = {
  id: number;
  name: string;
  staffId: string;
  department: string;
  subject: string;
  gender: TeacherGender;
  phone: string;
  email: string;
  qualification: string;
  employmentDate: string;
  status: TeacherStatus;
};

export type TeacherFormData = Omit<Teacher, "id">;