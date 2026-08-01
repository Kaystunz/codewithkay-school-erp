import { useMemo, useState } from "react";

import {
  initialFees,
  initialPayments,
} from "../data/fees";

import type {
  FeeFormData,
  FeeRecord,
  PaymentFormData,
  PaymentRecord,
} from "../types/fee";

import {
  calculateFeeBalance,
  calculateFeeStatus,
} from "../utils/fees";

import { useActivityContext } from "../../activity/hooks/useActivityContext";
import { activityEvents } from "../../activity/utils/activityEvents";

const emptyFeeForm: FeeFormData = {
  studentId: 0,
  classId: 0,
  academicSession: "2026/2027",
  term: "First Term",
  feeType: "Tuition",
  amountDue: 0,
  amountPaid: 0,
  dueDate: "",
};

const emptyPaymentForm: PaymentFormData = {
  feeId: 0,
  studentId: 0,
  amount: 0,
  paymentMethod: "Cash",
  paymentDate: "",
  reference: "",
  note: "",
};

type SubmitResult =
  | {
      success: true;
      action: "added" | "updated";
    }
  | {
      success: false;
      message: string;
    };

type PaymentResult =
  | {
      success: true;
      amount: number;
    }
  | {
      success: false;
      message: string;
    };

export function useFees() {
    const { addActivity } = useActivityContext();

  const [fees, setFees] =
    useState<FeeRecord[]>(initialFees);

  const [payments, setPayments] =
    useState<PaymentRecord[]>(initialPayments);

  const [searchTerm, setSearchTerm] = useState("");

  const [classFilter, setClassFilter] =
    useState("All classes");

  const [statusFilter, setStatusFilter] =
    useState("All statuses");

  const [termFilter, setTermFilter] =
    useState("All terms");

  const [sessionFilter, setSessionFilter] =
    useState("All sessions");

  const [isFeeModalOpen, setIsFeeModalOpen] =
    useState(false);

  const [isPaymentModalOpen, setIsPaymentModalOpen] =
    useState(false);

  const [editingFeeId, setEditingFeeId] =
    useState<number | null>(null);

  const [selectedFeeId, setSelectedFeeId] =
    useState<number | null>(null);

    const [historyFeeId, setHistoryFeeId] =
  useState<number | null>(null);

  const [feeFormData, setFeeFormData] =
    useState<FeeFormData>(emptyFeeForm);

  const [paymentFormData, setPaymentFormData] =
    useState<PaymentFormData>(emptyPaymentForm);

  const isEditingFee = editingFeeId !== null;

  const filteredFees = useMemo(() => {
    return fees.filter((fee) => {
      const normalizedSearch =
        searchTerm.toLowerCase();

      const matchesSearch =
        fee.feeType
          .toLowerCase()
          .includes(normalizedSearch) ||
        fee.term
          .toLowerCase()
          .includes(normalizedSearch) ||
        fee.academicSession
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesClass =
        classFilter === "All classes" ||
        fee.classId === Number(classFilter);

      const matchesStatus =
        statusFilter === "All statuses" ||
        fee.status === statusFilter;

      const matchesTerm =
        termFilter === "All terms" ||
        fee.term === termFilter;

      const matchesSession =
        sessionFilter === "All sessions" ||
        fee.academicSession === sessionFilter;


      return (
        matchesSearch &&
        matchesClass &&
        matchesStatus &&
        matchesTerm &&
        matchesSession

        
      );
    });
  }, [
    fees,
    searchTerm,
    classFilter,
    statusFilter,
    termFilter,
    sessionFilter,
  ]);
  
        function openPaymentHistory(feeId: number) {
  setHistoryFeeId(feeId);
}

function closePaymentHistory() {
  setHistoryFeeId(null);
}

  const totalExpected = fees.reduce(
    (total, fee) => total + fee.amountDue,
    0
  );

  const totalCollected = fees.reduce(
    (total, fee) => total + fee.amountPaid,
    0
  );

  const totalOutstanding = fees.reduce(
    (total, fee) => total + fee.balance,
    0
  );

  const paidFees = fees.filter(
    (fee) => fee.status === "Paid"
  ).length;

  const overdueFees = fees.filter(
    (fee) => fee.status === "Overdue"
  ).length;

  function startEditingFee(fee: FeeRecord) {
    setEditingFeeId(fee.id);

    setFeeFormData({
      studentId: fee.studentId,
      classId: fee.classId,
      academicSession: fee.academicSession,
      term: fee.term,
      feeType: fee.feeType,
      amountDue: fee.amountDue,
      amountPaid: fee.amountPaid,
      dueDate: fee.dueDate,
    });

    setIsFeeModalOpen(true);
  }

  function deleteFee(feeId: number) {
  const feeToDelete = fees.find(
    (fee) => fee.id === feeId
  );

  if (!feeToDelete) {
    return;
  }

  setFees((currentFees) =>
    currentFees.filter(
      (fee) => fee.id !== feeId
    )
  );

  setPayments((currentPayments) =>
    currentPayments.filter(
      (payment) => payment.feeId !== feeId
    )
  );

  addActivity(
    activityEvents.feeDeleted({
      studentId: feeToDelete.studentId,
      feeType: feeToDelete.feeType,
      amount: feeToDelete.amountDue,
    })
  );
}

  function handleFeeSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): SubmitResult {
    event.preventDefault();

    const trimmedFeeType =
      feeFormData.feeType.trim();

    const trimmedSession =
      feeFormData.academicSession.trim();

    const trimmedTerm =
      feeFormData.term.trim();

    if (!feeFormData.studentId) {
      return {
        success: false,
        message: "Please select a student.",
      };
    }

    if (!feeFormData.classId) {
      return {
        success: false,
        message: "Please select a class.",
      };
    }

    if (!trimmedFeeType) {
      return {
        success: false,
        message: "Fee type is required.",
      };
    }

    if (!trimmedSession) {
      return {
        success: false,
        message:
          "Academic session is required.",
      };
    }

    if (!trimmedTerm) {
      return {
        success: false,
        message: "Term is required.",
      };
    }

    if (feeFormData.amountDue <= 0) {
      return {
        success: false,
        message:
          "Amount due must be greater than zero.",
      };
    }

    if (feeFormData.amountPaid < 0) {
      return {
        success: false,
        message:
          "Amount paid cannot be negative.",
      };
    }

    if (
      feeFormData.amountPaid >
      feeFormData.amountDue
    ) {
      return {
        success: false,
        message:
          "Amount paid cannot exceed amount due.",
      };
    }

    if (!feeFormData.dueDate) {
      return {
        success: false,
        message: "Due date is required.",
      };
    }

    const duplicateFee = fees.some(
      (fee) =>
        fee.studentId ===
          feeFormData.studentId &&
        fee.feeType.toLowerCase() ===
          trimmedFeeType.toLowerCase() &&
        fee.academicSession.toLowerCase() ===
          trimmedSession.toLowerCase() &&
        fee.term.toLowerCase() ===
          trimmedTerm.toLowerCase() &&
        fee.id !== editingFeeId
    );

    if (duplicateFee) {
      return {
        success: false,
        message:
          "This fee already exists for the selected student, term and session.",
      };
    }

    const balance = calculateFeeBalance(
      feeFormData.amountDue,
      feeFormData.amountPaid
    );

    const status = calculateFeeStatus(
      feeFormData.amountDue,
      feeFormData.amountPaid,
      feeFormData.dueDate
    );

    const cleanedFormData: FeeFormData = {
      ...feeFormData,
      feeType: trimmedFeeType,
      academicSession: trimmedSession,
      term: trimmedTerm,
    };

    if (isEditingFee) {
      setFees((currentFees) =>
        currentFees.map((fee) =>
          fee.id === editingFeeId
            ? {
                ...fee,
                ...cleanedFormData,
                balance,
                status,
              }
            : fee
        )
      );
            addActivity(
         activityEvents.feeUpdated({
            studentId: cleanedFormData.studentId,
            feeType: cleanedFormData.feeType,
            amount: cleanedFormData.amountDue,
        })
        );
    } else {
      const newFee: FeeRecord = {
        id: Date.now(),
        ...cleanedFormData,
        balance,
        status,
      };

      setFees((currentFees) => [
        newFee,
        ...currentFees,
      ]);

      addActivity(
         activityEvents.feeAdded({
            studentId: newFee.studentId,
            feeType: newFee.feeType,
            amount: newFee.amountDue,
        })
        );
    }

    const action = isEditingFee
      ? "updated"
      : "added";

    setFeeFormData(emptyFeeForm);
    setEditingFeeId(null);
    setIsFeeModalOpen(false);

    return {
      success: true,
      action,
    };
  }

  function startPayment(fee: FeeRecord) {
    setSelectedFeeId(fee.id);

    setPaymentFormData({
      feeId: fee.id,
      studentId: fee.studentId,
      amount: 0,
      paymentMethod: "Cash",
      paymentDate: new Date()
        .toISOString()
        .split("T")[0],
      reference: "",
      note: "",
    });

    setIsPaymentModalOpen(true);
  }

  function recordPayment(): PaymentResult {
    if (!selectedFeeId) {
      return {
        success: false,
        message: "No fee selected.",
      };
    }

    const fee = fees.find(
      (item) => item.id === selectedFeeId
    );

    if (!fee) {
      return {
        success: false,
        message: "Fee record not found.",
      };
    }

    if (paymentFormData.amount <= 0) {
      return {
        success: false,
        message:
          "Payment amount must be greater than zero.",
      };
    }

    if (
      paymentFormData.amount >
      fee.balance
    ) {
      return {
        success: false,
        message:
          "Payment amount cannot exceed the outstanding balance.",
      };
    }

    if (!paymentFormData.paymentDate) {
      return {
        success: false,
        message:
          "Payment date is required.",
      };
    }

    const newPayment: PaymentRecord = {
      id: Date.now(),
      ...paymentFormData,
      reference:
        paymentFormData.reference.trim(),
      note: paymentFormData.note.trim(),
    };

    setPayments((currentPayments) => [
      newPayment,
      ...currentPayments,
    ]);

    const newAmountPaid =
      fee.amountPaid +
      paymentFormData.amount;

    const newBalance = calculateFeeBalance(
      fee.amountDue,
      newAmountPaid
    );

    const newStatus = calculateFeeStatus(
      fee.amountDue,
      newAmountPaid,
      fee.dueDate
    );

    setFees((currentFees) =>
      currentFees.map((currentFee) =>
        currentFee.id === fee.id
          ? {
              ...currentFee,
              amountPaid: newAmountPaid,
              balance: newBalance,
              status: newStatus,
            }
          : currentFee
      )
    );

    const amount = paymentFormData.amount;

    addActivity(
    activityEvents.paymentRecorded({
        studentId: paymentFormData.studentId,
        feeType: fee.feeType,
        amount: paymentFormData.amount,
    })
    );

    setPaymentFormData(emptyPaymentForm);
    setSelectedFeeId(null);
    setIsPaymentModalOpen(false);

    return {
      success: true,
      amount,
    };
  }

  return {
    fees,
    payments,
    filteredFees,

    totalExpected,
    totalCollected,
    totalOutstanding,
    paidFees,
    overdueFees,

    searchTerm,
    setSearchTerm,

    classFilter,
    setClassFilter,

    statusFilter,
    setStatusFilter,

    termFilter,
    setTermFilter,

    sessionFilter,
    setSessionFilter,

    isFeeModalOpen,
    setIsFeeModalOpen,

    isPaymentModalOpen,
    setIsPaymentModalOpen,

    feeFormData,
    setFeeFormData,

    paymentFormData,
    setPaymentFormData,

    handleFeeSubmit,
    startEditingFee,
    deleteFee,

    startPayment,
    recordPayment,

    selectedFeeId,

    editingFeeId,
    isEditingFee,

    historyFeeId,
    openPaymentHistory,
    closePaymentHistory,
  };
}