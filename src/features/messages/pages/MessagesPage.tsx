import { useMemo, useState } from "react";

import {
  Inbox,
  Mail,
  Plus,
  Search,
  Send,
  Trash2,
} from "lucide-react";

import { useMessagesContext } from "../hooks/useMessagesContext";
import { useAuthContext } from "../../auth/hooks/useAuthContext";
import { useToast } from "../../../components/ui/toast/useToast";
import { useAccountsContext } from "../../accounts/hooks/useAccountsContext";

import type { Message } from "../types/message";

function MessagesPage() {
  const { user } = useAuthContext();

  const { showToast } = useToast();

  const { accounts } =
    useAccountsContext();

  const {
    messages,

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
    deleteConversation,
  } = useMessagesContext();

  const [activeTab, setActiveTab] =
    useState<"inbox" | "sent">(
      "inbox"
    );

  const [
  selectedConversationId,
  setSelectedConversationId,
] = useState<string | null>(null);

const [
  conversationToDelete,
  setConversationToDelete,
] = useState<string | null>(null);

  function handleDeleteConversation() {
  if (!conversationToDelete) {
    return;
  }

  deleteConversation(
    conversationToDelete
  );

  if (
    selectedConversationId ===
    conversationToDelete
  ) {
    setSelectedConversationId(null);
    setConversationReply("");
  }

  setConversationToDelete(null);

  showToast({
    type: "success",
    message:
      "Conversation deleted successfully.",
  });
}

  const [
    conversationReply,
    setConversationReply,
  ] = useState("");

  const currentUserId =
    user?.id ?? 0;

  function getAccountLabel(
    accountId: number
  ) {
    const account = accounts.find(
      (item) =>
        item.id === accountId
    );

    if (!account) {
      return "Unknown account";
    }

    return `${account.name} — ${account.role}`;
  }

  const availableRecipients =
    accounts.filter(
      (account) =>
        account.status ===
          "Active" &&
        account.id !==
          currentUserId
    );

  const visibleMessages =
    useMemo(() => {
      const normalizedSearch =
        searchTerm
          .trim()
          .toLowerCase();

      return messages.filter(
        (message) => {
          const matchesTab =
            activeTab === "inbox"
              ? message.receiverId ===
                currentUserId
              : message.senderId ===
                currentUserId;

          const matchesSearch =
            !normalizedSearch ||
            message.subject
              .toLowerCase()
              .includes(
                normalizedSearch
              ) ||
            message.content
              .toLowerCase()
              .includes(
                normalizedSearch
              );

          return (
            matchesTab &&
            matchesSearch
          );
        }
      );
    }, [
      messages,
      activeTab,
      currentUserId,
      searchTerm,
    ]);

  const conversations =
    useMemo(() => {
      const grouped =
        new Map<
          string,
          Message[]
        >();

      visibleMessages.forEach(
        (message) => {
          const existing =
            grouped.get(
              message.conversationId
            ) ?? [];

          grouped.set(
            message.conversationId,
            [
              ...existing,
              message,
            ]
          );
        }
      );

      return Array.from(
        grouped.entries()
      )
        .map(
          ([
            conversationId,
            conversationMessages,
          ]) => {
            const sortedMessages =
              [
                ...conversationMessages,
              ].sort(
                (
                  firstMessage,
                  secondMessage
                ) =>
                  new Date(
                    firstMessage.createdAt
                  ).getTime() -
                  new Date(
                    secondMessage.createdAt
                  ).getTime()
              );

            const latestMessage =
              sortedMessages[
                sortedMessages.length -
                  1
              ];

            const hasUnread =
              sortedMessages.some(
                (message) =>
                  message.receiverId ===
                    currentUserId &&
                  message.status ===
                    "Sent"
              );

            return {
              conversationId,
              messages:
                sortedMessages,
              latestMessage,
              hasUnread,
            };
          }
        )
        .sort(
          (
            firstConversation,
            secondConversation
          ) =>
            new Date(
              secondConversation
                .latestMessage
                .createdAt
            ).getTime() -
            new Date(
              firstConversation
                .latestMessage
                .createdAt
            ).getTime()
        );
    }, [
      visibleMessages,
      currentUserId,
    ]);

  const selectedConversationMessages =
    useMemo(() => {
      if (
        !selectedConversationId
      ) {
        return [];
      }

      return messages
        .filter(
          (message) =>
            message.conversationId ===
            selectedConversationId
        )
        .sort(
          (
            firstMessage,
            secondMessage
          ) =>
            new Date(
              firstMessage.createdAt
            ).getTime() -
            new Date(
              secondMessage.createdAt
            ).getTime()
        );
    }, [
      messages,
      selectedConversationId,
    ]);

  const inboxUnreadCount =
    messages.filter(
      (message) =>
        message.receiverId ===
          currentUserId &&
        message.status ===
          "Sent"
    ).length;

  function getConversationPartnerId() {
    if (
      selectedConversationMessages.length ===
      0
    ) {
      return null;
    }

    const participantMessage =
      selectedConversationMessages.find(
        (message) =>
          message.senderId !==
            currentUserId ||
          message.receiverId !==
            currentUserId
      );

    if (!participantMessage) {
      return null;
    }

    if (
      participantMessage.senderId ===
      currentUserId
    ) {
      return participantMessage.receiverId;
    }

    return participantMessage.senderId;
  }

  function handleSendMessage() {
    if (!user) {
      return;
    }

    const result =
      sendMessage(user.id);

    if (!result.success) {
      showToast({
        type: "error",
        message:
          result.message,
      });

      return;
    }

    showToast({
      type: "success",
      message:
        "Message sent successfully.",
    });
  }

  function handleConversationReply() {
    if (
      !user ||
      !selectedConversationId ||
      selectedConversationMessages.length ===
        0
    ) {
      return;
    }

    const receiverId =
      getConversationPartnerId();

    if (!receiverId) {
      showToast({
        type: "error",
        message:
          "Unable to determine the message recipient.",
      });

      return;
    }

    const firstMessage =
      selectedConversationMessages[0];

    const result =
      sendConversationReply({
        senderId: user.id,

        receiverId,

        conversationId:
          selectedConversationId,

        subject:
          firstMessage.subject,

        content:
          conversationReply,
      });

    if (!result.success) {
      showToast({
        type: "error",
        message:
          result.message,
      });

      return;
    }

    setConversationReply("");
  }

  function handleOpenConversation(
    conversationId: string
  ) {
    messages
      .filter(
        (message) =>
          message.conversationId ===
            conversationId &&
          message.receiverId ===
            currentUserId &&
          message.status ===
            "Sent"
      )
      .forEach((message) => {
        markAsRead(message.id);
      });

    setSelectedConversationId(
      conversationId
    );

    setConversationReply("");
  }

  function handleCloseConversation() {
    setSelectedConversationId(
      null
    );

    setConversationReply("");
  }

  function handleCloseCompose() {
    closeCompose();
  }

  return (
    <div className="space-y-8">
      {/* PAGE HEADER */}

      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Messages
          </h1>

          <p className="mt-2 text-slate-500">
            Send and manage messages
            across the school portal.
          </p>
        </div>

        <button
          type="button"
          onClick={openCompose}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800"
        >
          <Plus size={20} />

          Compose
        </button>
      </section>

      {/* MESSAGE LIST */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                setActiveTab(
                  "inbox"
                )
              }
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold ${
                activeTab ===
                "inbox"
                  ? "bg-teal-700 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              <Inbox size={17} />

              Inbox

              {inboxUnreadCount >
                0 && (
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                  {
                    inboxUnreadCount
                  }
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveTab(
                  "sent"
                )
              }
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold ${
                activeTab ===
                "sent"
                  ? "bg-teal-700 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              <Send size={17} />

              Sent
            </button>
          </div>

          <div className="relative w-full md:w-80">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target
                    .value
                )
              }
              placeholder="Search messages..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </div>
        </div>

        {conversations.length ===
        0 ? (
          <div className="p-12 text-center">
            <Mail
              size={44}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-semibold text-slate-700">
              No messages found
            </h3>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {conversations.map(
              (
                conversation
              ) => {
                const message =
                  conversation.latestMessage;

                return (
                  <div
                    key={
                      conversation.conversationId
                    }
                    className={`flex items-start justify-between gap-4 p-5 transition hover:bg-slate-50 ${
                      conversation.hasUnread &&
                      activeTab ===
                        "inbox"
                        ? "bg-teal-50/40"
                        : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        handleOpenConversation(
                          conversation.conversationId
                        )
                      }
                      className="min-w-0 flex-1 text-left"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                        {activeTab ===
                        "inbox"
                          ? `From: ${getAccountLabel(
                              message.senderId
                            )}`
                          : `To: ${getAccountLabel(
                              message.receiverId
                            )}`}
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <p
                          className={`truncate text-slate-900 ${
                            conversation.hasUnread &&
                            activeTab ===
                              "inbox"
                              ? "font-bold"
                              : "font-semibold"
                          }`}
                        >
                          {
                            message.subject
                          }
                        </p>

                        {conversation.messages
                          .length >
                          1 && (
                          <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
                            {
                              conversation
                                .messages
                                .length
                            }
                          </span>
                        )}
                      </div>

                      <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                        {
                          message.content
                        }
                      </p>

                      <p className="mt-2 text-xs text-slate-400">
                        {new Date(
                          message.createdAt
                        ).toLocaleString()}
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setConversationToDelete(
                          conversation.conversationId
                        )
                      }
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                      title="Delete conversation"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                );
              }
            )}
          </div>
        )}
      </section>

      {/* COMPOSE MODAL */}

      {isComposeOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
            <div className="border-b border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900">
                Compose Message
              </h2>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Recipient
                </label>

                <select
                  value={
                    formData.receiverId ||
                    ""
                  }
                  onChange={(event) =>
                    setFormData({
                      ...formData,

                      receiverId:
                        event.target.value
                          ? Number(
                              event.target
                                .value
                            )
                          : 0,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                >
                  <option value="">
                    Select recipient
                  </option>

                  {availableRecipients.map(
                    (
                      account
                    ) => (
                      <option
                        key={
                          account.id
                        }
                        value={
                          account.id
                        }
                      >
                        {
                          account.name
                        }{" "}
                        —{" "}
                        {
                          account.role
                        }
                      </option>
                    )
                  )}
                </select>

                {availableRecipients.length ===
                  0 && (
                  <p className="mt-2 text-xs text-slate-500">
                    No active recipients
                    are available.
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Subject
                </label>

                <input
                  value={
                    formData.subject
                  }
                  onChange={(event) =>
                    setFormData({
                      ...formData,

                      subject:
                        event.target
                          .value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Message
                </label>

                <textarea
                  rows={6}
                  value={
                    formData.content
                  }
                  onChange={(event) =>
                    setFormData({
                      ...formData,

                      content:
                        event.target
                          .value,
                    })
                  }
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 p-6">
              <button
                type="button"
                onClick={
                  handleCloseCompose
                }
                className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  handleSendMessage
                }
                className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800"
              >
                <Send size={18} />

                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONVERSATION MODAL */}

      {selectedConversationId &&
        selectedConversationMessages.length >
          0 && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/50 p-4">
            <div className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
              <div className="flex items-start justify-between border-b border-slate-200 bg-white p-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {
                      selectedConversationMessages[
                        0
                      ].subject
                    }
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Conversation
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {
                      selectedConversationMessages.length
                    }{" "}
                    {selectedConversationMessages.length ===
                    1
                      ? "message"
                      : "messages"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={
                    handleCloseConversation
                  }
                  className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100"
                  aria-label="Close conversation"
                >
                  ✕
                </button>
              </div>

              {/* CHAT HISTORY */}

              <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50/50 p-6">
                {selectedConversationMessages.map(
                  (
                    message
                  ) => {
                    const isMine =
                      message.senderId ===
                      currentUserId;

                    return (
                      <div
                        key={
                          message.id
                        }
                        className={`flex ${
                          isMine
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[82%] rounded-2xl px-4 py-3 shadow-sm ${
                            isMine
                              ? "bg-teal-700 text-white"
                              : "border border-slate-200 bg-white text-slate-800"
                          }`}
                        >
                          <p className="text-xs font-semibold opacity-70">
                            {isMine
                              ? "You"
                              : getAccountLabel(
                                  message.senderId
                                )}
                          </p>

                          <p className="mt-1 whitespace-pre-wrap text-sm leading-6">
                            {
                              message.content
                            }
                          </p>

                          <p className="mt-2 text-[11px] opacity-60">
                            {new Date(
                              message.createdAt
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>

              {/* INLINE CHAT INPUT */}

              <div className="border-t border-slate-200 bg-white p-4">
                <div className="flex items-end gap-3">
                  <textarea
                    rows={2}
                    value={
                      conversationReply
                    }
                    onChange={(event) =>
                      setConversationReply(
                        event.target
                          .value
                      )
                    }
                    onKeyDown={(event) => {
                      if (
                        event.key ===
                          "Enter" &&
                        !event.shiftKey
                      ) {
                        event.preventDefault();

                        handleConversationReply();
                      }
                    }}
                    placeholder="Type a message..."
                    className="max-h-32 min-h-[52px] flex-1 resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                  />

                  <button
                    type="button"
                    onClick={
                      handleConversationReply
                    }
                    disabled={
                      !conversationReply.trim()
                    }
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-700 text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Send message"
                  >
                    <Send size={19} />
                  </button>
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Press Enter to send •
                  Shift + Enter for a new
                  line
                </p>
              </div>
            </div>
          </div>
        )}

        {conversationToDelete && (
  <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/50 p-4">
    <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
        <Trash2 size={22} />
      </div>

      <h2 className="mt-5 text-xl font-bold text-slate-900">
        Delete conversation?
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        This will remove the entire conversation
        and all messages inside it.
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={() =>
            setConversationToDelete(null)
          }
          className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleDeleteConversation}
          className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default MessagesPage;