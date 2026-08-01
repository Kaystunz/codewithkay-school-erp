import { useMemo, useState } from "react";

import { initialAnnouncements } from "../data/announcements";

import type {
  Announcement,
  AnnouncementFormData,
} from "../types/announcement";
import { useActivityContext } from "../../activity/hooks/useActivityContext";
import { activityEvents } from "../../activity/utils/activityEvents";

const emptyAnnouncementForm: AnnouncementFormData = {
  title: "",
  message: "",
  audience: "Everyone",
  classId: null,
  priority: "Normal",
  status: "Draft",
  publishedDate: "",
  createdBy: "Administrator",
};

type SubmitResult =
  | {
      success: true;
      action: "added" | "updated";
    }
  | {
      success: false;
      message: string;
    };

export function useAnnouncements() {
    const { addActivity } = useActivityContext();

  const [announcements, setAnnouncements] =
    useState<Announcement[]>(initialAnnouncements);

  const [searchTerm, setSearchTerm] = useState("");

  const [audienceFilter, setAudienceFilter] =
    useState("All audiences");

  const [priorityFilter, setPriorityFilter] =
    useState("All priorities");

  const [statusFilter, setStatusFilter] =
    useState("All statuses");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingAnnouncementId, setEditingAnnouncementId] =
    useState<number | null>(null);

  const [formData, setFormData] =
    useState<AnnouncementFormData>(
      emptyAnnouncementForm
    );

  const isEditing =
    editingAnnouncementId !== null;

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((announcement) => {
      const normalizedSearch =
        searchTerm.toLowerCase();

      const matchesSearch =
        announcement.title
          .toLowerCase()
          .includes(normalizedSearch) ||
        announcement.message
          .toLowerCase()
          .includes(normalizedSearch) ||
        announcement.createdBy
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesAudience =
        audienceFilter === "All audiences" ||
        announcement.audience === audienceFilter;

      const matchesPriority =
        priorityFilter === "All priorities" ||
        announcement.priority === priorityFilter;

      const matchesStatus =
        statusFilter === "All statuses" ||
        announcement.status === statusFilter;

      return (
        matchesSearch &&
        matchesAudience &&
        matchesPriority &&
        matchesStatus
      );
    });
  }, [
    announcements,
    searchTerm,
    audienceFilter,
    priorityFilter,
    statusFilter,
  ]);

  const publishedAnnouncements =
    announcements.filter(
      (announcement) =>
        announcement.status === "Published"
    ).length;

  const draftAnnouncements =
    announcements.filter(
      (announcement) =>
        announcement.status === "Draft"
    ).length;

  const archivedAnnouncements =
    announcements.filter(
      (announcement) =>
        announcement.status === "Archived"
    ).length;

  const urgentAnnouncements =
    announcements.filter(
      (announcement) =>
        announcement.priority === "Urgent"
    ).length;

  function openAddModal() {
    setEditingAnnouncementId(null);

    setFormData({
      ...emptyAnnouncementForm,
    });

    setIsModalOpen(true);
  }

  function closeModal() {
    setEditingAnnouncementId(null);

    setFormData({
      ...emptyAnnouncementForm,
    });

    setIsModalOpen(false);
  }

  function startEditing(
    announcement: Announcement
  ) {
    setEditingAnnouncementId(
      announcement.id
    );

    setFormData({
      title: announcement.title,
      message: announcement.message,
      audience: announcement.audience,
      classId: announcement.classId,
      priority: announcement.priority,
      status: announcement.status,
      publishedDate:
        announcement.publishedDate,
      createdBy: announcement.createdBy,
    });

    setIsModalOpen(true);
  }

  function deleteAnnouncement(
  announcementId: number
) {
  const announcementToDelete =
    announcements.find(
      (announcement) =>
        announcement.id === announcementId
    );

  if (!announcementToDelete) {
    return;
  }

  setAnnouncements(
    (currentAnnouncements) =>
      currentAnnouncements.filter(
        (announcement) =>
          announcement.id !== announcementId
      )
  );

  addActivity(
    activityEvents.announcementDeleted({
      title: announcementToDelete.title,
      audience: announcementToDelete.audience,
      priority: announcementToDelete.priority,
      status: announcementToDelete.status,
    })
  );
}

  function publishAnnouncement(
  announcementId: number
) {
  const announcementToPublish =
    announcements.find(
      (announcement) =>
        announcement.id === announcementId
    );

  if (!announcementToPublish) {
    return;
  }

  setAnnouncements(
    (currentAnnouncements) =>
      currentAnnouncements.map(
        (announcement) =>
          announcement.id === announcementId
            ? {
                ...announcement,
                status: "Published",
                publishedDate:
                  announcement.publishedDate ||
                  new Date()
                    .toISOString()
                    .split("T")[0],
              }
            : announcement
      )
  );

  addActivity(
    activityEvents.announcementPublished({
      title: announcementToPublish.title,
      audience: announcementToPublish.audience,
      priority: announcementToPublish.priority,
      status: "Published",
    })
  );
}

  function archiveAnnouncement(
  announcementId: number
) {
  const announcementToArchive =
    announcements.find(
      (announcement) =>
        announcement.id === announcementId
    );

  if (!announcementToArchive) {
    return;
  }

  setAnnouncements(
    (currentAnnouncements) =>
      currentAnnouncements.map(
        (announcement) =>
          announcement.id === announcementId
            ? {
                ...announcement,
                status: "Archived",
              }
            : announcement
      )
  );

  addActivity(
    activityEvents.announcementArchived({
      title: announcementToArchive.title,
      audience: announcementToArchive.audience,
      priority: announcementToArchive.priority,
      status: "Archived",
    })
  );
}

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): SubmitResult {
    event.preventDefault();

    const title =
      formData.title.trim();

    const message =
      formData.message.trim();

    const createdBy =
      formData.createdBy.trim();

    if (!title) {
      return {
        success: false,
        message:
          "Announcement title is required.",
      };
    }

    if (!message) {
      return {
        success: false,
        message:
          "Announcement message is required.",
      };
    }

    if (!createdBy) {
      return {
        success: false,
        message:
          "Announcement author is required.",
      };
    }

    if (
      formData.audience === "Class" &&
      !formData.classId
    ) {
      return {
        success: false,
        message:
          "Please select a class for this announcement.",
      };
    }

    const cleanedFormData: AnnouncementFormData =
      {
        ...formData,
        title,
        message,
        createdBy,
        classId:
          formData.audience === "Class"
            ? formData.classId
            : null,
        publishedDate:
          formData.status === "Published"
            ? formData.publishedDate ||
              new Date()
                .toISOString()
                .split("T")[0]
            : formData.publishedDate,
      };

   if (
  isEditing &&
  editingAnnouncementId !== null
) {
  setAnnouncements(
    (currentAnnouncements) =>
      currentAnnouncements.map(
        (announcement) =>
          announcement.id ===
          editingAnnouncementId
            ? {
                ...announcement,
                ...cleanedFormData,
              }
            : announcement
      )
  );

  addActivity(
    activityEvents.announcementUpdated({
      title: cleanedFormData.title,
      audience: cleanedFormData.audience,
      priority: cleanedFormData.priority,
      status: cleanedFormData.status,
    })
  );
} else {
  const newAnnouncement: Announcement = {
    id: Date.now(),
    ...cleanedFormData,
    createdAt: new Date()
      .toISOString()
      .split("T")[0],
  };

  setAnnouncements(
    (currentAnnouncements) => [
      newAnnouncement,
      ...currentAnnouncements,
    ]
  );

  addActivity(
    activityEvents.announcementAdded({
      title: newAnnouncement.title,
      audience: newAnnouncement.audience,
      priority: newAnnouncement.priority,
      status: newAnnouncement.status,
    })
  );
}

    const action = isEditing
      ? "updated"
      : "added";

    closeModal();

    return {
      success: true,
      action,
    };
  }

  return {
    announcements,
    filteredAnnouncements,

    publishedAnnouncements,
    draftAnnouncements,
    archivedAnnouncements,
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
    startEditing,

    deleteAnnouncement,
    publishAnnouncement,
    archiveAnnouncement,

    handleSubmit,
  };
}