export type MessageStatus =
  | "Sent"
  | "Read";

export type Message = {
  id: number;

  conversationId: string;

  senderId: number;
  receiverId: number;

  subject: string;
  content: string;

  status: MessageStatus;

  createdAt: string;
};

export type MessageFormData = {
  receiverId: number;
  subject: string;
  content: string;
};