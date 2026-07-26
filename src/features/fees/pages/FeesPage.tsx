import { Plus } from "lucide-react";

import FeeStats from "../components/FeeStats";
import FeeFilters from "../components/FeeFilters";
import FeeTable from "../components/FeeTable";
import AddFeeModal from "../components/AddFeeModal";
import RecordPaymentModal from "../components/RecordPaymentModal";
import PaymentHistoryModal from "../components/PaymentHistoryModal";
import { useFeesContext } from "../hooks/useFeesContext";
import { useToast } from "../../../components/ui/toast/useToast";

function FeesPage() {
  const { showToast } = useToast();

  const {
    fees,
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
    recordPayment,

    selectedFeeId,

    isEditingFee,

        payments,
    historyFeeId,
    closePaymentHistory,
  } = useFeesContext();

  const selectedFee = fees.find(
    (fee) => fee.id === selectedFeeId
  );

  const historyFee =
  fees.find((fee) => fee.id === historyFeeId) ?? null;

  function handleFeeFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    const result = handleFeeSubmit(event);

    if (!result.success) {
      showToast({
        type: "error",
        message: result.message,
      });

      return;
    }

    showToast({
      type: "success",
      message:
        result.action === "updated"
          ? "Fee updated successfully."
          : "Fee added successfully.",
    });
  }

  function handlePaymentSubmit() {
    const result = recordPayment();

    if (!result.success) {
      showToast({
        type: "error",
        message: result.message,
      });

      return;
    }

    showToast({
      type: "success",
      message: "Payment recorded successfully.",
    });
  }

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Fees
          </h1>

          <p className="mt-2 text-slate-500">
            Manage student fees, payments and outstanding balances.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsFeeModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800"
        >
          <Plus size={20} />
          Add fee
        </button>
      </section>

      <FeeStats
        totalExpected={totalExpected}
        totalCollected={totalCollected}
        totalOutstanding={totalOutstanding}
        paidFees={paidFees}
        overdueFees={overdueFees}
      />

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <FeeFilters
          searchTerm={searchTerm}
          classFilter={classFilter}
          statusFilter={statusFilter}
          termFilter={termFilter}
          sessionFilter={sessionFilter}
          onSearchChange={setSearchTerm}
          onClassFilterChange={setClassFilter}
          onStatusFilterChange={setStatusFilter}
          onTermFilterChange={setTermFilter}
          onSessionFilterChange={setSessionFilter}
        />

        <FeeTable fees={filteredFees} />
      </section>

      <AddFeeModal
        isOpen={isFeeModalOpen}
        isEditing={isEditingFee}
        formData={feeFormData}
        onClose={() => setIsFeeModalOpen(false)}
        onSubmit={handleFeeFormSubmit}
        onFormChange={setFeeFormData}
      />

      <RecordPaymentModal
        isOpen={isPaymentModalOpen}
        formData={paymentFormData}
        balance={selectedFee?.balance ?? 0}
        onClose={() => setIsPaymentModalOpen(false)}
        onSubmit={handlePaymentSubmit}
        onFormChange={setPaymentFormData}
      />
      <PaymentHistoryModal
        isOpen={historyFeeId !== null}
        fee={historyFee}
        payments={payments}
        onClose={closePaymentHistory}
        />
    </div>
  );
}

export default FeesPage;