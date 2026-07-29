import type {
  Dispatch,
  FormEvent,
  SetStateAction,
} from "react";

import type {
  AccountFormData,
  AccountSubmitResult,
} from "../types/account";

type AccountFormModalProps = {
  isOpen: boolean;
  isEditing: boolean;
  formData: AccountFormData;
  setFormData: Dispatch<
    SetStateAction<AccountFormData>
  >;
  onClose: () => void;
  onSubmit: () => AccountSubmitResult;
};

function AccountFormModal({
  isOpen,
  isEditing,
  formData,
  setFormData,
  onClose,
  onSubmit,
}: AccountFormModalProps) {
  if (!isOpen) {
    return null;
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const result = onSubmit();

    if (!result.success) {
      window.alert(result.message);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {isEditing
                ? "Edit account"
                : "Create account"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isEditing
                ? "Update the account information."
                : "Create login credentials for a school user."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          <div>
            <label
              htmlFor="account-name"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Full name
            </label>

            <input
              id="account-name"
              type="text"
              value={formData.name}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
              placeholder="Enter full name"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label
              htmlFor="account-email"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Email address
            </label>

            <input
              id="account-email"
              type="email"
              value={formData.email}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              placeholder="name@school.com"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label
              htmlFor="account-password"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <input
              id="account-password"
              type="password"
              value={formData.password}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  password: event.target.value,
                }))
              }
              placeholder={
                isEditing
                  ? "Leave blank to keep current password"
                  : "Minimum of 6 characters"
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />

            {isEditing && (
              <p className="mt-1 text-xs text-slate-500">
                Leave this field empty unless you want
                to change the password.
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="account-role"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Role
              </label>

              <select
                id="account-role"
                value={formData.role}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    role: event.target
                      .value as AccountFormData["role"],
                  }))
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="Admin">Admin</option>
                <option value="Teacher">
                  Teacher
                </option>
                <option value="Parent">Parent</option>
                <option value="Student">
                  Student
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="account-status"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Status
              </label>

              <select
                id="account-status"
                value={formData.status}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    status: event.target
                      .value as AccountFormData["status"],
                  }))
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="Active">Active</option>
                <option value="Disabled">
                  Disabled
                </option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="linked-record"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Linked record ID
              <span className="ml-1 font-normal text-slate-400">
                Optional
              </span>
            </label>

            <input
              id="linked-record"
              type="number"
              min="1"
              value={formData.linkedRecordId}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  linkedRecordId:
                    event.target.value,
                }))
              }
              placeholder="Student, teacher or parent ID"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              {isEditing
                ? "Save changes"
                : "Create account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccountFormModal;