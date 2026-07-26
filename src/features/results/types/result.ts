export type ResultStatus =
  | "Draft"
  | "Published";

export type ResultRecord = {
  id: number;

  studentId: number;
  classId: number;

  subject: string;

  academicSession: string;
  term: string;

  caScore: number;
  examScore: number;

  totalScore: number;
  grade: string;
  remark: string;

  status: ResultStatus;
};

export type ResultFormData = Omit<
  ResultRecord,
  "id" | "totalScore" | "grade" | "remark"
>;