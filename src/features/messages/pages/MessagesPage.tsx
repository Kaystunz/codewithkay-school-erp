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
    markAsRead,
    deleteMessage,
  } = useMessagesContext();

  const [activeTab, setActiveTab] =
    useState<"inbox" | "sent">(
      "inbox"
    );

  const [
    replyConversationId,
    setReplyConversationId,
  ] = useState<string | null>(null);

  const [
    selectedConversationId,
    setSelectedConversationId,
  ] = useState<string | null>(null);

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

  /*
   * Messages visible in the currently
   * selected Inbox/Sent tab.
   */
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

  /*
   * Group the Inbox/Sent list into
   * one row per conversation.
   */
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

  /*
   * Important:
   *
   * The conversation modal uses ALL
   * messages, not only the current
   * Inbox/Sent tab.
   *
   * This allows sent replies and
   * received replies to appear in
   * the same conversation.
   */
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

  const latestConversationMessage =
    selectedConversationMessages[
      selectedConversationMessages.length -
        1
    ];

  const inboxUnreadCount =
    messages.filter(
      (message) =>
        message.receiverId ===
          currentUserId &&
        message.status ===
          "Sent"
    ).length;

  function handleSendMessage() {
    if (!user) {
      return;
    }

    const result =
      sendMessage(
        user.id,
        replyConversationId ??
          undefined
      );

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

    setReplyConversationId(
      null
    );
  }

  function handleOpenConversation(
    conversationId: string
  ) {
    /*
     * Mark every unread message
     * addressed to the current user
     * in this conversation as read.
     */
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
  }

  function handleReplyToConversation() {
    if (
      !selectedConversationId ||
      selectedConversationMessages
        .length === 0
    ) {
      return;
    }

    /*
     * Find the other person in
     * the conversation.
     */
    const otherMessage =
      [...selectedConversationMessages]
        .reverse()
        .find(
          (message) =>
            message.senderId !==
            currentUserId
        );

    if (!otherMessage) {
      return;
    }

    const firstMessage =
      selectedConversationMessages[0];

    const originalSubject =
      firstMessage.subject.startsWith(
        "Re:"
      )
        ? firstMessage.subject
        : `Re: ${firstMessage.subject}`;

    setFormData({
      receiverId:
        otherMessage.senderId,
      subject:
        originalSubject,
      content: "",
    });

    setReplyConversationId(
      selectedConversationId
    );

    setSelectedConversationId(
      null
    );

    openCompose();
  }

  function handleCloseCompose() {
    closeCompose();

    setReplyConversationId(
      null
    );
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
          onClick={() => {
            setReplyConversationId(
              null
            );

            openCompose();
          }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800"
        >
          <Plus size={20} />

          Compose
        </button>
      </section>

      {/* MESSAGES */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* TOOLBAR */}

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

        {/* EMPTY STATE */}

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
          /* CONVERSATION LIST */

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
                        deleteMessage(
                          message.id
                        )
                      }
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                      title="Delete latest message"
                    >
                      <Trash2
                        size={18}
                      />
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
                {replyConversationId
                  ? "Reply to Message"
                  : "Compose Message"}
              </h2>
            </div>

            <div className="space-y-5 p-6">
              {/* RECIPIENT */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Recipient
                </label>

                <select
                  value={
                    formData.receiverId ||
                    ""
                  }
                  onChange={(
                    event
                  ) =>
                    setFormData(
                      {
                        ...formData,

                        receiverId:
                          event.target
                            .value
                            ? Number(
                                event
                                  .target
                                  .value
                              )
                            : 0,
                      }
                    )
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

              {/* SUBJECT */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Subject
                </label>

                <input
                  value={
                    formData.subject
                  }
                  onChange={(
                    event
                  ) =>
                    setFormData(
                      {
                        ...formData,

                        subject:
                          event.target
                            .value,
                      }
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                />
              </div>

              {/* MESSAGE */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Message
                </label>

                <textarea
                  rows={6}
                  value={
                    formData.content
                  }
                  onChange={(
                    event
                  ) =>
                    setFormData(
                      {
                        ...formData,

                        content:
                          event.target
                            .value,
                      }
                    )
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

                {replyConversationId
                  ? "Send Reply"
                  : "Send Message"}
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
              {/* HEADER */}

              <div className="flex items-start justify-between border-b border-slate-200 p-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {
                      selectedConversationMessages[
                        0
                      ].subject
                    }
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Conversation history
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
                  onClick={() =>
                    setSelectedConversationId(
                      null
                    )
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

              {/* ACTIONS */}

              <div className="flex justify-end gap-3 border-t border-slate-200 bg-white p-6">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedConversationId(
                      null
                    )
                  }
                  className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Close
                </button>

                {latestConversationMessage && (
                  <button
                    type="button"
                    onClick={
                      handleReplyToConversation
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800"
                  >
                    <Send
                      size={18}
                    />

                    Reply
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default MessagesPage;