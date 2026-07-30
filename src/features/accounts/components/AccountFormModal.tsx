import type {
  Dispatch,
  FormEvent,
  SetStateAction,
} from "react";

import type {
    Account,
  AccountFormData,
  AccountSubmitResult,
} from "../types/account";

import { useSchoolDirectory } from "../../directory/hooks/useSchoolDirectory";

import type { DirectoryRole } from "../../directory/types/directory";
type AccountFormModalProps = {
  isOpen: boolean;
  isEditing: boolean;
  editingAccountId: number | null;
  accounts: Account[];
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
  editingAccountId,
  accounts,
  formData,
  setFormData,
  onClose,
  onSubmit,
}: AccountFormModalProps) {
    const { getPeopleByRole } = useSchoolDirectory();

const isDirectoryRole =
  formData.role === "Teacher" ||
  formData.role === "Student" ||
  formData.role === "Parent";

const allDirectoryPeople = isDirectoryRole
  ? getPeopleByRole(formData.role as DirectoryRole)
  : [];

const directoryPeople = allDirectoryPeople.filter(
  (person) => {
    const linkedAccount = accounts.find(
      (account) =>
        account.role === person.role &&
        account.linkedRecordId ===
          person.linkedRecordId
    );

    if (!linkedAccount) {
      return true;
    }

    return linkedAccount.id === editingAccountId;
  }
);

const selectedDirectoryId =
  isDirectoryRole && formData.linkedRecordId
    ? `${formData.role}-${formData.linkedRecordId}`
    : "";

function handleRoleChange(
  role: AccountFormData["role"]
) {
  setFormData((current) => ({
    ...current,
    role,
    linkedRecordId: "",
    name: role === "Admin" ? current.name : "",
    email: role === "Admin" ? current.email : "",
  }));
}

function handleDirectoryPersonChange(
  directoryId: string
) {
  const selectedPerson = directoryPeople.find(
    (person) => person.id === directoryId
  );

  if (!selectedPerson) {
    setFormData((current) => ({
      ...current,
      linkedRecordId: "",
      name: "",
      email: "",
    }));

    return;
  }

  setFormData((current) => ({
    ...current,
    linkedRecordId:
      selectedPerson.linkedRecordId.toString(),
    name: selectedPerson.name,
    email: selectedPerson.email,
  }));
}

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
                handleRoleChange(
                    event.target.value as AccountFormData["role"]
                )
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

        {isDirectoryRole && (
  <div>
    <label
      htmlFor="directory-person"
      className="mb-1 block text-sm font-medium text-slate-700"
    >
      Select {formData.role.toLowerCase()}
    </label>

    <select
      id="directory-person"
      value={selectedDirectoryId}
      onChange={(event) =>
        handleDirectoryPersonChange(
          event.target.value
        )
      }
      className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
    >
      <option value="">
        Select a {formData.role.toLowerCase()}
      </option>

      {directoryPeople.map((person) => (
        <option
          key={person.id}
          value={person.id}
        >
          {person.name}
          {person.secondaryLabel
            ? ` — ${person.secondaryLabel}`
            : ""}
        </option>
      ))}
        </select>

        {directoryPeople.length === 0 && (
        <p className="mt-2 text-sm text-amber-600">
            No available {formData.role.toLowerCase()} records
            were found. They may already have accounts.
        </p>
        )}

        <p className="mt-1 text-xs text-slate-500">
        Selecting a record automatically fills the name
        and email address.
        </p>
    </div>
    )}

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