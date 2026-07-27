import {
  Archive,
  Megaphone,
  Pencil,
  Send,
  Trash2,
} from "lucide-react";

import type { Announcement } from "../types/announcement";
import { useClassesContext } from "../../classes/hooks/useClassesContext";
import { useAnnouncementsContext } from "../hooks/useAnnouncementsContext";

type AnnouncementTableProps = {
  announcements: Announcement[];
  onPublish: (announcement: Announcement) => void;
  onArchive: (announcement: Announcement) => void;
  onDelete: (announcement: Announcement) => void;
};

function AnnouncementTable({
  announcements,
  onPublish,
  onArchive,
  onDelete,
}: AnnouncementTableProps) {
  const { classes } = useClassesContext();

  const { startEditing } = useAnnouncementsContext();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-slate-50">
          <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <th className="px-5 py-4">Announcement</th>
            <th className="px-5 py-4">Audience</th>
            <th className="px-5 py-4">Priority</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Published</th>
            <th className="px-5 py-4">Created By</th>
            <th className="px-5 py-4 text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {announcements.map((announcement) => {
            const schoolClass =
              announcement.classId !== null
                ? classes.find(
                    (item) =>
                      item.id === announcement.classId
                  )
                : undefined;

            return (
              <tr
                key={announcement.id}
                className="hover:bg-slate-50"
              >
                <td className="px-5 py-4">
                  <p className="font-semibold text-slate-900">
                    {announcement.title}
                  </p>

                  <p className="mt-1 max-w-sm truncate text-sm text-slate-500">
                    {announcement.message}
                  </p>
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {announcement.audience === "Class"
                    ? schoolClass
                      ? `${schoolClass.name} ${schoolClass.section}`
                      : "Unknown class"
                    : announcement.audience}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      announcement.priority === "Urgent"
                        ? "bg-red-100 text-red-700"
                        : announcement.priority ===
                            "Important"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {announcement.priority}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      announcement.status === "Published"
                        ? "bg-emerald-100 text-emerald-700"
                        : announcement.status === "Archived"
                          ? "bg-slate-200 text-slate-600"
                          : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {announcement.status}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {announcement.publishedDate || "—"}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {announcement.createdBy}
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    {announcement.status === "Draft" && (
                      <button
                        type="button"
                        onClick={() =>
                          publishAnnouncement(
                            announcement.id
                          )
                        }
                        className="rounded-lg p-2 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700"
                        title="Publish announcement"
                      >
                        <Send size={18} />
                      </button>
                    )}

                    {announcement.status ===
                      "Published" && (
                      <button
                        type="button"
                        onClick={() =>
                          archiveAnnouncement(
                            announcement.id
                          )
                        }
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                        title="Archive announcement"
                      >
                        <Archive size={18} />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        startEditing(announcement)
                      }
                      className="rounded-lg p-2 text-slate-500 hover:bg-teal-50 hover:text-teal-700"
                      title="Edit announcement"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deleteAnnouncement(
                          announcement.id
                        )
                      }
                      className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                      title="Delete announcement"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {announcements.length === 0 && (
        <div className="p-12 text-center">
          <Megaphone
            size={42}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-4 font-semibold text-slate-700">
            No announcements found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try changing your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}

export default AnnouncementTable;