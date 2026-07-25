import { Users } from "lucide-react";
import type { Parent } from "../types/parents";
import ParentRow from "./ParentRow";

type ParentTableProps = {
  parents: Parent[];
};

function ParentTable({
  parents,
}: ParentTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-slate-50">
          <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
            <th className="px-5 py-4">Parent</th>
            <th className="px-5 py-4">Occupation</th>
            <th className="px-5 py-4">Contact</th>
            <th className="px-5 py-4">Children</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4 text-right">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {parents.map((parent) => (
            <ParentRow
              key={parent.id}
              parent={parent}
            />
          ))}
        </tbody>
      </table>

      {parents.length === 0 && (
        <div className="p-12 text-center">
          <Users
            size={42}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-4 font-semibold text-slate-700">
            No parents found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try changing your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}

export default ParentTable;