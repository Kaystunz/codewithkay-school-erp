import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { initialMessages } from "../data/messages";

import type {
  Message,
  MessageFormData,
} from "../types/message";

import { useActivityContext } from "../../activity/hooks/useActivityContext";
import { createActivityLog } from "../../activity/utils/activityLogger";
import { useNotificationsContext } from "../../notifications/hooks/useNotificationsContext";

const STORAGE_KEY =
  "fareedah-messages";

const emptyMessageForm: MessageFormData = {
  receiverId: 0,
  subject: "",
  content: "",
};

type SubmitResult =
  | {
      success: true;
    }
  | {
      success: false;
      message: string;
    };

function loadMessages(): Message[] {
  const stored =
    localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return initialMessages;
  }

  try {
    const parsedMessages =
      JSON.parse(stored) as Message[];

    return parsedMessages.map(
      (message) => ({
        ...message,

        conversationId:
          message.conversationId ??
          `legacy-${message.id}`,
      })
    );
  } catch {
    localStorage.removeItem(
      STORAGE_KEY
    );

    return initialMessages;
  }
}

export function useMessages() {
  const [messages, setMessages] =
    useState<Message[]>(loadMessages);

    const { addNotification } =
         useNotificationsContext();

    const { addActivity } =
    useActivityContext();

  const [formData, setFormData] =
    useState<MessageFormData>(
      emptyMessageForm
    );

  const [isComposeOpen, setIsComposeOpen] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(messages)
    );
  }, [messages]);

  const filteredMessages = useMemo(() => {
    const search =
      searchTerm.trim().toLowerCase();

    return messages.filter(
      (message) =>
        message.subject
          .toLowerCase()
          .includes(search) ||
        message.content
          .toLowerCase()
          .includes(search)
    );
  }, [messages, searchTerm]);

  const unreadMessages =
    messages.filter(
      (message) =>
        message.status === "Sent"
    ).length;

  function openCompose() {
    setFormData(emptyMessageForm);
    setIsComposeOpen(true);
  }

  function closeCompose() {
    setFormData(emptyMessageForm);
    setIsComposeOpen(false);
  }

  function sendMessage(
  senderId: number,
  conversationId?: string
): SubmitResult {
    const subject =
      formData.subject.trim();
    const content =
      formData.content.trim();

    if (!formData.receiverId) {
      return {
        success: false,
        message:
          "Please select a recipient.",
      };
    }

    if (!subject) {
      return {
        success: false,
        message:
          "Message subject is required.",
      };
    }

    if (!content) {
      return {
        success: false,
        message:
          "Message content is required.",
      };
    }

    const newMessage: Message = {
        id: Date.now(),

        conversationId:
            conversationId ??
            `conversation-${Date.now()}`,

        senderId,

        receiverId:
            formData.receiverId,

        subject,
        content,

        status: "Sent",

        createdAt:
            new Date().toISOString(),
        };

    setMessages(
      (currentMessages) => [
        newMessage,
        ...currentMessages,
      ]
    );

    addNotification({
        recipientId: newMessage.receiverId,

        title: "New Message",

        message: `You received a new message: "${newMessage.subject}".`,

        category: "Message",

        link: "/messages",
        });

    addActivity(
    createActivityLog({
        title: "New Message",
        description: `A new message titled "${newMessage.subject}" was sent.`,
        category: "Message",
        actor: "System",
    })
    );

    closeCompose();

    return {
      success: true,
    };
  }

  function sendConversationReply({
  senderId,
  receiverId,
  conversationId,
  subject,
  content,
}: {
  senderId: number;
  receiverId: number;
  conversationId: string;
  subject: string;
  content: string;
}): SubmitResult {
  const cleanedContent =
    content.trim();

  if (!cleanedContent) {
    return {
      success: false,
      message:
        "Message cannot be empty.",
    };
  }

  const newMessage: Message = {
    id: Date.now(),

    conversationId,

    senderId,
    receiverId,

    subject,
    content: cleanedContent,

    status: "Sent",

    createdAt:
      new Date().toISOString(),
  };

  setMessages(
    (currentMessages) => [
      newMessage,
      ...currentMessages,
    ]
  );

  addNotification({
    recipientId:
      receiverId,

    title: "New Message",

    message: `You received a new message: "${subject}".`,

    category: "Message",

    link: "/messages",
  });

  return {
    success: true,
  };
}

  function markAsRead(
    messageId: number
  ) {
    setMessages(
      (currentMessages) =>
        currentMessages.map(
          (message) =>
            message.id === messageId
              ? {
                  ...message,
                  status: "Read",
                }
              : message
        )
    );
  }

  function deleteMessage(
    messageId: number
  ) {
    setMessages(
      (currentMessages) =>
        currentMessages.filter(
          (message) =>
            message.id !== messageId
        )
    );
  }

  function deleteConversation(
  conversationId: string
) {
  setMessages((currentMessages) =>
    currentMessages.filter(
      (message) =>
        message.conversationId !==
        conversationId
    )
  );
}

 return {
  messages,
  filteredMessages,
  unreadMessages,

  sendMessage,
  sendConversationReply,
  markAsRead,
  deleteMessage,
  deleteConversation,

  searchTerm,
  setSearchTerm,

  formData,
  setFormData,

  isComposeOpen,
  openCompose,
  closeCompose,

  sendMessage,
  sendConversationReply,

  markAsRead,
  deleteMessage,
};
}