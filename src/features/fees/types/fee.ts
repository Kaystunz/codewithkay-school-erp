export type FeeStatus =
  | "Paid"
  | "Partially Paid"
  | "Unpaid"
  | "Overdue";

export type PaymentMethod =
  | "Cash"
  | "Bank Transfer"
  | "Card"
  | "Online";

export type FeeRecord = {
  id: number;

  studentId: number;
  classId: number;

  academicSession: string;
  term: string;

  feeType: string;

  amountDue: number;
  amountPaid: number;
  balance: number;

  dueDate: string;

  status: FeeStatus;
};

export type PaymentRecord = {
  id: number;

  feeId: number;
  studentId: number;

  amount: number;

  paymentMethod: PaymentMethod;

  paymentDate: string;

  reference: string;

  note: string;
};

export type FeeFormData = Omit<
  FeeRecord,
  "id" | "balance" | "status"
>;

export type PaymentFormData = Omit<
  PaymentRecord,
  "id"
>;
