import { Plus } from "lucide-react";

import AnnouncementStats from "../components/AnnouncementStats";
import AnnouncementFilters from "../components/AnnouncementFilters";
import AnnouncementTable from "../components/AnnouncementTable";
import AddAnnouncementModal from "../components/AddAnnouncementModal";
import { useState } from "react";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import type { Announcement } from "../types/announcement";
import { useAnnouncementsContext } from "../hooks/useAnnouncementsContext";
import { useToast } from "../../../components/ui/toast/useToast";



function AnnouncementsPage() {
  const { showToast } = useToast();

  const [
  announcementToDelete,
  setAnnouncementToDelete,
] = useState<Announcement | null>(null);

  const {
    announcements,
    filteredAnnouncements,

    publishedAnnouncements,
    draftAnnouncements,
    urgentAnnouncements,

    searchTerm,
    setSearchTerm,

    audienceFilter,
    setAudienceFilter,

    priorityFilter,
    setPriorityFilter,

    statusFilter,
    setStatusFilter,

    isModalOpen,
    formData,
    setFormData,

    isEditing,

    openAddModal,
    closeModal,
    handleSubmit,

    deleteAnnouncement,
   publishAnnouncement,
    archiveAnnouncement,
  } = useAnnouncementsContext();

  function handleFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    const result = handleSubmit(event);

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
          ? "Announcement updated successfully."
          : "Announcement created successfully.",
    });
  }

  function handlePublish(
  announcement: Announcement
) {
  publishAnnouncement(announcement.id);

  showToast({
    type: "success",
    message: `"${announcement.title}" was published successfully.`,
  });
}

function handleArchive(
  announcement: Announcement
) {
  console.log(
    "Archive clicked:",
    announcement.id,
    announcement.title
  );

  archiveAnnouncement(announcement.id);

  showToast({
    type: "success",
    message: `"${announcement.title}" was archived successfully.`,
  });
}

function handleDelete() {
  if (!announcementToDelete) {
    console.log(
      "No announcement selected for deletion"
    );
    return;
  }

  console.log(
    "Deleting:",
    announcementToDelete.id,
    announcementToDelete.title
  );

  deleteAnnouncement(
    announcementToDelete.id
  );

  showToast({
    type: "success",
    message: `"${announcementToDelete.title}" was deleted successfully.`,
  });

  setAnnouncementToDelete(null);
}

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Announcements
          </h1>

          <p className="mt-2 text-slate-500">
            Create and manage school-wide communication.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800"
        >
          <Plus size={20} />
          New announcement
        </button>
      </section>

      <AnnouncementStats
        totalAnnouncements={announcements.length}
        publishedAnnouncements={publishedAnnouncements}
        draftAnnouncements={draftAnnouncements}
        urgentAnnouncements={urgentAnnouncements}
      />

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <AnnouncementFilters
          searchTerm={searchTerm}
          audienceFilter={audienceFilter}
          priorityFilter={priorityFilter}
          statusFilter={statusFilter}
          onSearchChange={setSearchTerm}
          onAudienceFilterChange={setAudienceFilter}
          onPriorityFilterChange={setPriorityFilter}
          onStatusFilterChange={setStatusFilter}
        />

       <AnnouncementTable
        announcements={filteredAnnouncements}
        onPublish={handlePublish}
         onArchive={handleArchive}
         onDelete={setAnnouncementToDelete}
        />
      </section>

      <AddAnnouncementModal
        isOpen={isModalOpen}
        isEditing={isEditing}
        formData={formData}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        onFormChange={setFormData}
      />

            <ConfirmDialog
                isOpen={announcementToDelete !== null}
                title="Delete announcement?"
                message={
                    announcementToDelete
                    ? `Are you sure you want to delete "${announcementToDelete.title}"? This action cannot be undone.`
                    : ""
                }
                confirmText="Delete Announcement"
                cancelText="Cancel"
                onConfirm={handleDelete}
                onCancel={() =>
                    setAnnouncementToDelete(null)
                }
           />
    </div>
  );
}

export default AnnouncementsPage;