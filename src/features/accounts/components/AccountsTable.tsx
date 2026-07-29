import type {
  Account,
  AccountStatus,
} from "../types/account";

type AccountsTableProps = {
  accounts: Account[];
  currentUserId?: number;
  onEdit: (account: Account) => void;
  onResetPassword: (account: Account) => void;
  onStatusChange: (
    accountId: number,
    status: AccountStatus
  ) => void;
};

function formatDate(date: string | null) {
  if (!date) {
    return "Never";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

function AccountsTable({
  accounts,
  currentUserId,
  onEdit,
  onResetPassword,
  onStatusChange,
}: AccountsTableProps) {
  if (accounts.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800">
          No accounts found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Try changing your search or filter options.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Account
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Role
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Last login
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {accounts.map((account) => {
              const isCurrentAccount =
                account.id === currentUserId;

              return (
                <tr
                  key={account.id}
                  className="transition hover:bg-slate-50"
                >
                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex items-center gap-3">
                      {account.profileImage ? (
                        <img
                          src={account.profileImage}
                          alt={account.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
                          {getInitials(account.name)}
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-slate-800">
                            {account.name}
                          </p>

                          {isCurrentAccount && (
                            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                              You
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-slate-500">
                          {account.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                    {account.role}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        account.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {account.status}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                    {formatDate(account.lastLoginAt)}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(account)}
                        className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onResetPassword(account)
                        }
                        className="rounded-lg border border-blue-200 px-3 py-1.5 text-sm font-medium text-blue-700 transition hover:bg-blue-50"
                      >
                        Reset password
                      </button>

                      <button
                        type="button"
                        disabled={isCurrentAccount}
                        onClick={() =>
                          onStatusChange(
                            account.id,
                            account.status === "Active"
                              ? "Disabled"
                              : "Active"
                          )
                        }
                        className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                          isCurrentAccount
                            ? "cursor-not-allowed bg-slate-100 text-slate-400"
                            : account.status === "Active"
                              ? "bg-red-50 text-red-700 hover:bg-red-100"
                              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        }`}
                      >
                        {account.status === "Active"
                          ? "Disable"
                          : "Enable"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AccountsTable;