import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import type {
  Account,
  PasswordResetResult,
} from "../types/account";

type ResetPasswordModalProps = {
  isOpen: boolean;
  account: Account | null;
  onClose: () => void;
  onResetPassword: (
    accountId: number,
    password: string
  ) => PasswordResetResult;
};

function ResetPasswordModal({
  isOpen,
  account,
  onClose,
  onResetPassword,
}: ResetPasswordModalProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setConfirmPassword("");
    }
  }, [isOpen]);

  if (!isOpen || !account) {
    return null;
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (password !== confirmPassword) {
      window.alert("The passwords do not match.");
      return;
    }

        if (!account) {
        return;
        }

        const result = onResetPassword(
        account.id,
        password
        );

    if (!result.success) {
      window.alert(result.message);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Reset password
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Set a new password for {account.name}.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          <div>
            <label
              htmlFor="new-password"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              New password
            </label>

            <input
              id="new-password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Minimum of 6 characters"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Confirm password
            </label>

            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value
                )
              }
              placeholder="Enter the password again"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Reset password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordModal;