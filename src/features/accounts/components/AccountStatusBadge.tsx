import { useAccountsContext } from "../hooks/useAccountsContext";

import type { UserRole } from "../../auth/types/auth";

type AccountStatusBadgeProps = {
  role: Extract<
    UserRole,
    "Teacher" | "Student" | "Parent"
  >;
  linkedRecordId: number;
};

function AccountStatusBadge({
  role,
  linkedRecordId,
}: AccountStatusBadgeProps) {
  const { accounts } = useAccountsContext();

  const linkedAccount = accounts.find(
    (account) =>
      account.role === role &&
      account.linkedRecordId === linkedRecordId
  );

  if (!linkedAccount) {
    return (
      <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
        No Account
      </span>
    );
  }

  if (linkedAccount.status === "Disabled") {
    return (
      <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
        Disabled
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
      Active
    </span>
  );
}

export default AccountStatusBadge;