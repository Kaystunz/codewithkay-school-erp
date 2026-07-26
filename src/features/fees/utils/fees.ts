import type { FeeStatus } from "../types/fee";

export function calculateFeeBalance(
  amountDue: number,
  amountPaid: number
) {
  return Math.max(amountDue - amountPaid, 0);
}

export function calculateFeeStatus(
  amountDue: number,
  amountPaid: number,
  dueDate: string
): FeeStatus {
  if (amountPaid >= amountDue) {
    return "Paid";
  }

  if (amountPaid > 0) {
    return "Partially Paid";
  }

  const today = new Date();
  const due = new Date(dueDate);

  if (due < today) {
    return "Overdue";
  }

  return "Unpaid";
}