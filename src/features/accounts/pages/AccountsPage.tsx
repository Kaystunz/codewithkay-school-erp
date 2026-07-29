import AccountFilters from "../components/AccountFilters";
import AccountFormModal from "../components/AccountFormModal";
import AccountsTable from "../components/AccountsTable";
import ResetPasswordModal from "../components/ResetPasswordModal";

import { useAccountsContext } from "../hooks/useAccountsContext";
import { useAuthContext } from "../../auth/hooks/useAuthContext";

function AccountsPage() {
  const { user } = useAuthContext();

  const {
    accounts,
    filteredAccounts,
    activeAccounts,
    disabledAccounts,
    adminAccounts,

    searchTerm,
    setSearchTerm,

    roleFilter,
    setRoleFilter,

    statusFilter,
    setStatusFilter,

    isModalOpen,
    isPasswordModalOpen,

    selectedAccount,
    isEditing,
    formData,
    setFormData,

    openAddModal,
    openEditModal,
    closeAccountModal,
    handleSubmit,

    changeAccountStatus,

    openPasswordModal,
    closePasswordModal,
    resetPassword,
  } = useAccountsContext();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Accounts
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create and manage login accounts for
            administrators, teachers, parents and
            students.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          + Create account
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Total accounts
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {accounts.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Active accounts
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-600">
            {activeAccounts}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Disabled accounts
          </p>

          <p className="mt-2 text-3xl font-bold text-red-600">
            {disabledAccounts}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Administrators
          </p>

          <p className="mt-2 text-3xl font-bold text-blue-600">
            {adminAccounts}
          </p>
        </div>
      </div>

      <AccountFilters
        searchTerm={searchTerm}
        roleFilter={roleFilter}
        statusFilter={statusFilter}
        onSearchChange={setSearchTerm}
        onRoleChange={setRoleFilter}
        onStatusChange={setStatusFilter}
      />

      <AccountsTable
        accounts={filteredAccounts}
        currentUserId={user?.id}
        onEdit={openEditModal}
        onResetPassword={openPasswordModal}
        onStatusChange={changeAccountStatus}
      />

      <AccountFormModal
        isOpen={isModalOpen}
        isEditing={isEditing}
        formData={formData}
        setFormData={setFormData}
        onClose={closeAccountModal}
        onSubmit={handleSubmit}
      />

      <ResetPasswordModal
        isOpen={isPasswordModalOpen}
        account={selectedAccount}
        onClose={closePasswordModal}
        onResetPassword={resetPassword}
      />
    </div>
  );
}

export default AccountsPage;