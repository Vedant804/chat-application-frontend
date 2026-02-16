import { Conversation, Message, User } from "@/types/chat";

export const currentUser: User = {
  id: "me",
  name: "You",
  avatar: "",
  online: true,
};

const users: User[] = [
  { id: "u1", name: "Priya Sharma", avatar: "", online: true },
  { id: "u2", name: "Arjun Patel", avatar: "", online: false },
  { id: "u3", name: "Sneha Gupta", avatar: "", online: true },
  { id: "u4", name: "Rahul Verma", avatar: "", online: false },
  { id: "u5", name: "Ananya Das", avatar: "", online: true },
  { id: "u6", name: "Vikram Singh", avatar: "", online: false },
];

export const conversations: Conversation[] = [
  {
    id: "c1",
    participants: [currentUser, users[0]],
    lastMessage: "Hey, did you finish the project?",
    lastMessageTime: new Date(2026, 1, 16, 10, 30),
    unreadCount: 2,
  },
  {
    id: "c2",
    participants: [currentUser, users[1]],
    lastMessage: "Let's catch up tomorrow 👋",
    lastMessageTime: new Date(2026, 1, 16, 9, 15),
    unreadCount: 0,
  },
  {
    id: "c3",
    participants: [currentUser, users[2]],
    lastMessage: "The design looks great!",
    lastMessageTime: new Date(2026, 1, 15, 22, 45),
    unreadCount: 1,
  },
  {
    id: "c4",
    participants: [currentUser, users[3]],
    lastMessage: "Can you send me the files?",
    lastMessageTime: new Date(2026, 1, 15, 18, 10),
    unreadCount: 0,
  },
  {
    id: "c5",
    participants: [currentUser, users[4]],
    lastMessage: "Meeting at 3pm confirmed ✅",
    lastMessageTime: new Date(2026, 1, 15, 14, 0),
    unreadCount: 3,
  },
  {
    id: "c6",
    participants: [currentUser, users[5]],
    lastMessage: "Thanks for the help!",
    lastMessageTime: new Date(2026, 1, 14, 20, 30),
    unreadCount: 0,
  },
];

export const mockMessages: Record<string, Message[]> = {
  c1: [
    { id: "m1", conversationId: "c1", senderId: "u1", text: "Hi! How's the project going?", timestamp: new Date(2026, 1, 16, 10, 0), status: "read", type: "text" },
    { id: "m2", conversationId: "c1", senderId: "me", text: "Going well! Almost done with the frontend 🚀", timestamp: new Date(2026, 1, 16, 10, 5), status: "read", type: "text" },
    { id: "m3", conversationId: "c1", senderId: "u1", text: "That's awesome! Can you share a preview?", timestamp: new Date(2026, 1, 16, 10, 10), status: "read", type: "text" },
    { id: "m4", conversationId: "c1", senderId: "me", text: "Sure, let me push the latest changes first", timestamp: new Date(2026, 1, 16, 10, 15), status: "delivered", type: "text" },
    { id: "m5", conversationId: "c1", senderId: "u1", text: "Hey, did you finish the project?", timestamp: new Date(2026, 1, 16, 10, 30), status: "delivered", type: "text" },
  ],
  c2: [
    { id: "m6", conversationId: "c2", senderId: "me", text: "Hey Arjun!", timestamp: new Date(2026, 1, 16, 9, 0), status: "read", type: "text" },
    { id: "m7", conversationId: "c2", senderId: "u2", text: "Hey! What's up?", timestamp: new Date(2026, 1, 16, 9, 5), status: "read", type: "text" },
    { id: "m8", conversationId: "c2", senderId: "me", text: "Wanted to discuss the API integration", timestamp: new Date(2026, 1, 16, 9, 10), status: "read", type: "text" },
    { id: "m9", conversationId: "c2", senderId: "u2", text: "Let's catch up tomorrow 👋", timestamp: new Date(2026, 1, 16, 9, 15), status: "read", type: "text" },
  ],
  c3: [
    { id: "m10", conversationId: "c3", senderId: "u3", text: "Check out this new design I made!", timestamp: new Date(2026, 1, 15, 22, 30), status: "read", type: "text" },
    { id: "m11", conversationId: "c3", senderId: "me", text: "Wow, that looks incredible! 😍", timestamp: new Date(2026, 1, 15, 22, 35), status: "read", type: "text" },
    { id: "m12", conversationId: "c3", senderId: "u3", text: "The design looks great!", timestamp: new Date(2026, 1, 15, 22, 45), status: "delivered", type: "text" },
  ],
  c4: [
    { id: "m13", conversationId: "c4", senderId: "u4", text: "Can you send me the files?", timestamp: new Date(2026, 1, 15, 18, 10), status: "read", type: "text" },
  ],
  c5: [
    { id: "m14", conversationId: "c5", senderId: "u5", text: "Are we still on for the meeting?", timestamp: new Date(2026, 1, 15, 13, 50), status: "read", type: "text" },
    { id: "m15", conversationId: "c5", senderId: "me", text: "Yes! 3pm works for me", timestamp: new Date(2026, 1, 15, 13, 55), status: "read", type: "text" },
    { id: "m16", conversationId: "c5", senderId: "u5", text: "Meeting at 3pm confirmed ✅", timestamp: new Date(2026, 1, 15, 14, 0), status: "delivered", type: "text" },
  ],
  c6: [
    { id: "m17", conversationId: "c6", senderId: "me", text: "Here's that code snippet you asked for", timestamp: new Date(2026, 1, 14, 20, 20), status: "read", type: "text" },
    { id: "m18", conversationId: "c6", senderId: "u6", text: "Thanks for the help!", timestamp: new Date(2026, 1, 14, 20, 30), status: "read", type: "text" },
  ],
};
