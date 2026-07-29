type AccountFiltersProps = {
  searchTerm: string;
  roleFilter: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: string) => void;
};

function AccountFilters({
  searchTerm,
  roleFilter,
  statusFilter,
  onSearchChange,
  onRoleChange,
  onStatusChange,
}: AccountFiltersProps) {
  return (
    <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-3">
      <div>
        <label
          htmlFor="account-search"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Search accounts
        </label>

        <input
          id="account-search"
          type="search"
          value={searchTerm}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search by name or email"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      <div>
        <label
          htmlFor="role-filter"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Role
        </label>

        <select
          id="role-filter"
          value={roleFilter}
          onChange={(event) =>
            onRoleChange(event.target.value)
          }
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        >
          <option value="All">All roles</option>
          <option value="Admin">Admin</option>
          <option value="Teacher">Teacher</option>
          <option value="Parent">Parent</option>
          <option value="Student">Student</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="status-filter"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Status
        </label>

        <select
          id="status-filter"
          value={statusFilter}
          onChange={(event) =>
            onStatusChange(event.target.value)
          }
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        >
          <option value="All">All statuses</option>
          <option value="Active">Active</option>
          <option value="Disabled">Disabled</option>
        </select>
      </div>
    </div>
  );
}

export default AccountFilters;