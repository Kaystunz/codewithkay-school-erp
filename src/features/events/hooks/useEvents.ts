import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { initialEvents } from "../data/events";

import type {
  EventFormData,
  SchoolEvent,
} from "../types/event";

import { useActivityContext } from "../../activity/hooks/useActivityContext";

import { createActivityLog } from "../../activity/utils/activityLogger";

const STORAGE_KEY = "fareedah-events";

const emptyEventForm: EventFormData = {
  title: "",
  description: "",
  eventType: "Academic",
  audience: "Everyone",
  classId: null,
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  location: "",
  status: "Scheduled",
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

function loadEvents(): SchoolEvent[] {
  const storedEvents =
    localStorage.getItem(STORAGE_KEY);

  if (!storedEvents) {
    return initialEvents;
  }

  try {
    return JSON.parse(
      storedEvents
    ) as SchoolEvent[];
  } catch {
    localStorage.removeItem(STORAGE_KEY);

    return initialEvents;
  }
}

export function useEvents() {
  
  const { addActivity } =
    useActivityContext();

  const [events, setEvents] =
    useState<SchoolEvent[]>(loadEvents);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [typeFilter, setTypeFilter] =
    useState("All types");

  const [statusFilter, setStatusFilter] =
    useState("All statuses");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingEventId, setEditingEventId] =
    useState<number | null>(null);

  const [formData, setFormData] =
    useState<EventFormData>(emptyEventForm);

  const isEditing =
    editingEventId !== null;

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(events)
    );
  }, [events]);

  const filteredEvents = useMemo(() => {
    const normalizedSearch =
      searchTerm.trim().toLowerCase();

    return events.filter((event) => {
      const matchesSearch =
        !normalizedSearch ||
        event.title
          .toLowerCase()
          .includes(normalizedSearch) ||
        event.description
          .toLowerCase()
          .includes(normalizedSearch) ||
        event.location
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesType =
        typeFilter === "All types" ||
        event.eventType === typeFilter;

      const matchesStatus =
        statusFilter === "All statuses" ||
        event.status === statusFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus
      );
    });
  }, [
    events,
    searchTerm,
    typeFilter,
    statusFilter,
  ]);

  const upcomingEvents = useMemo(() => {
    const now = new Date();

    return events
      .filter((event) => {
        const eventDate = new Date(
          `${event.startDate}T${
            event.startTime || "00:00"
          }`
        );

        return (
          event.status === "Scheduled" &&
          eventDate >= now
        );
      })
      .sort(
        (firstEvent, secondEvent) =>
          new Date(
            `${firstEvent.startDate}T${
              firstEvent.startTime || "00:00"
            }`
          ).getTime() -
          new Date(
            `${secondEvent.startDate}T${
              secondEvent.startTime || "00:00"
            }`
          ).getTime()
      );
  }, [events]);
  const completedEvents =
  events.filter(
    (event) => event.status === "Completed"
  ).length;

const cancelledEvents =
  events.filter(
    (event) => event.status === "Cancelled"
  ).length;

  function openAddModal() {
    setEditingEventId(null);
    setFormData(emptyEventForm);
    setIsModalOpen(true);
  }

  function closeModal() {
    setEditingEventId(null);
    setFormData(emptyEventForm);
    setIsModalOpen(false);
  }

  function startEditing(
    event: SchoolEvent
  ) {
    setEditingEventId(event.id);

    setFormData({
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      audience: event.audience,
      classId: event.classId,
      startDate: event.startDate,
      startTime: event.startTime,
      endDate: event.endDate,
      endTime: event.endTime,
      location: event.location,
      status: event.status,
      createdBy: event.createdBy,
    });

    setIsModalOpen(true);
  }

  function deleteEvent(eventId: number) {
    const eventToDelete = events.find(
      (event) => event.id === eventId
    );

    if (!eventToDelete) {
      return;
    }

    setEvents((currentEvents) =>
      currentEvents.filter(
        (event) => event.id !== eventId
      )
    );

        addActivity(
        createActivityLog({
            title: "Event Deleted",
            description: `"${eventToDelete.title}" was deleted from the school calendar.`,
            category: "Event",
            actor: "System",
        })
        );
  }

  function completeEvent(eventId: number) {
  const eventToComplete = events.find(
    (event) => event.id === eventId
  );

  if (!eventToComplete) {
    return;
  }

  setEvents((currentEvents) =>
    currentEvents.map((event) =>
      event.id === eventId
        ? {
            ...event,
            status: "Completed",
          }
        : event
    )
  );

  addActivity(
    createActivityLog({
      title: "Event Completed",
      description: `"${eventToComplete.title}" was marked as completed.`,
      category: "Event",
      actor: "System",
    })
  );
}

function cancelEvent(eventId: number) {
  const eventToCancel = events.find(
    (event) => event.id === eventId
  );

  if (!eventToCancel) {
    return;
  }

  setEvents((currentEvents) =>
    currentEvents.map((event) =>
      event.id === eventId
        ? {
            ...event,
            status: "Cancelled",
          }
        : event
    )
  );

  addActivity(
    createActivityLog({
      title: "Event Cancelled",
      description: `"${eventToCancel.title}" was cancelled.`,
      category: "Event",
      actor: "System",
    })
  );
}

  function handleSubmit(): SubmitResult {
    const title =
      formData.title.trim();

    const description =
      formData.description.trim();

    const location =
      formData.location.trim();

    const createdBy =
      formData.createdBy.trim();

    if (!title) {
      return {
        success: false,
        message: "Event title is required.",
      };
    }

    if (!formData.startDate) {
      return {
        success: false,
        message: "Start date is required.",
      };
    }

    if (!createdBy) {
      return {
        success: false,
        message:
          "Event creator is required.",
      };
    }

    if (
      formData.audience === "Class" &&
      !formData.classId
    ) {
      return {
        success: false,
        message:
          "Please select a class for this event.",
      };
    }

    if (
      formData.endDate &&
      new Date(formData.endDate) <
        new Date(formData.startDate)
    ) {
      return {
        success: false,
        message:
          "End date cannot be before start date.",
      };
    }

    if (
      formData.startDate &&
      formData.endDate ===
        formData.startDate &&
      formData.startTime &&
      formData.endTime &&
      formData.endTime <
        formData.startTime
    ) {
      return {
        success: false,
        message:
          "End time cannot be before start time.",
      };
    }

    const cleanedFormData: EventFormData = {
      ...formData,
      title,
      description,
      location,
      createdBy,
      classId:
        formData.audience === "Class"
          ? formData.classId
          : null,
    };

    if (
      isEditing &&
      editingEventId !== null
    ) {
      setEvents((currentEvents) =>
        currentEvents.map((event) =>
          event.id === editingEventId
            ? {
                ...event,
                ...cleanedFormData,
              }
            : event
        )
      );

     addActivity(
        createActivityLog({
            title: "Event Updated",
            description: `"${cleanedFormData.title}" was updated.`,
            category: "Event",
            actor: "System",
        })
        );
    } else {
      const newEvent: SchoolEvent = {
        id: Date.now(),
        ...cleanedFormData,
        createdAt:
          new Date().toISOString(),
      };

      setEvents((currentEvents) => [
        newEvent,
        ...currentEvents,
      ]);

     addActivity(
        createActivityLog({
            title: "Event Created",
            description: `"${newEvent.title}" was scheduled for ${newEvent.startDate}.`,
            category: "Event",
            actor: "System",
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
  events,
  filteredEvents,
  upcomingEvents,
  completedEvents,
  cancelledEvents,

  searchTerm,
  setSearchTerm,

  typeFilter,
  setTypeFilter,

  statusFilter,
  setStatusFilter,

  isModalOpen,
  isEditing,

  formData,
  setFormData,

  openAddModal,
  closeModal,
  startEditing,
  deleteEvent,
  completeEvent,
  cancelEvent,
  handleSubmit,
};
}