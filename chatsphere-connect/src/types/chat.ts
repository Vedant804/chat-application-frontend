export interface User {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text?: string;
  emoji?: boolean;
  timestamp: Date;
  status: "sent" | "delivered" | "read";
  type: "text" | "voice" | "file" | "image";
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  audioDuration?: number;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}
