import type {
  FeeRecord,
  PaymentRecord,
} from "../types/fee";

export const initialFees: FeeRecord[] = [
  {
    id: 1,
    studentId: 1,
    classId: 1,
    academicSession: "2026/2027",
    term: "First Term",
    feeType: "Tuition",
    amountDue: 150000,
    amountPaid: 100000,
    balance: 50000,
    dueDate: "2026-09-30",
    status: "Partially Paid",
  },
  {
    id: 2,
    studentId: 2,
    classId: 2,
    academicSession: "2026/2027",
    term: "First Term",
    feeType: "Tuition",
    amountDue: 150000,
    amountPaid: 150000,
    balance: 0,
    dueDate: "2026-09-30",
    status: "Paid",
  },
  {
    id: 3,
    studentId: 3,
    classId: 3,
    academicSession: "2026/2027",
    term: "First Term",
    feeType: "Tuition",
    amountDue: 160000,
    amountPaid: 0,
    balance: 160000,
    dueDate: "2026-06-30",
    status: "Overdue",
  },
];

export const initialPayments: PaymentRecord[] = [
  {
    id: 1,
    feeId: 1,
    studentId: 1,
    amount: 100000,
    paymentMethod: "Bank Transfer",
    paymentDate: "2026-07-20",
    reference: "PAY-001",
    note: "First installment",
  },
  {
    id: 2,
    feeId: 2,
    studentId: 2,
    amount: 150000,
    paymentMethod: "Card",
    paymentDate: "2026-07-18",
    reference: "PAY-002",
    note: "Full payment",
  },
];