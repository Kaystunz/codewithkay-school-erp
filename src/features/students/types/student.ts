export type StudentStatus = "Active" | "Inactive";

export type StudentGender = "Male" | "Female";

export type Student = {
  id: number;
  name: string;
  admissionNumber: string;
  className: string;
  gender: StudentGender;
  parentName: string;
  phone: string;
  email: string;
  status: StudentStatus;
};

export type StudentFormData = Omit<Student, "id">;