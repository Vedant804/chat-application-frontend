import { useState, useCallback, useRef, useEffect } from "react";
import { Conversation, Message } from "@/types/chat";
import { conversations as initialConversations, mockMessages, currentUser } from "@/data/mockData";

export function useChatState() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState<string>("c1");
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages);
  const [searchQuery, setSearchQuery] = useState("");
  const messageIdCounter = useRef(100);

  const activeConversation = conversations.find((c) => c.id === activeConversationId)!;
  const activeMessages = messages[activeConversationId] || [];
  const otherUser = activeConversation?.participants.find((p) => p.id !== currentUser.id);

  const filteredConversations = conversations.filter((c) => {
    const other = c.participants.find((p) => p.id !== currentUser.id);
    return other?.name.toLowerCase().includes(searchQuery.toLowerCase()) || false;
  });

  const selectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    );
  }, []);

  const sendMessage = useCallback(
    (msg: Partial<Message>) => {
      const newMessage: Message = {
        id: `m${messageIdCounter.current++}`,
        conversationId: activeConversationId,
        senderId: "me",
        timestamp: new Date(),
        status: "sent",
        type: "text",
        ...msg,
      };

      setMessages((prev) => ({
        ...prev,
        [activeConversationId]: [...(prev[activeConversationId] || []), newMessage],
      }));

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConversationId
            ? { ...c, lastMessage: msg.text || (msg.type === "voice" ? "🎤 Voice message" : "📎 File"), lastMessageTime: new Date() }
            : c
        )
      );

      // Simulate status update
      setTimeout(() => {
        setMessages((prev) => ({
          ...prev,
          [activeConversationId]: prev[activeConversationId].map((m) =>
            m.id === newMessage.id ? { ...m, status: "delivered" } : m
          ),
        }));
      }, 1000);

      setTimeout(() => {
        setMessages((prev) => ({
          ...prev,
          [activeConversationId]: prev[activeConversationId].map((m) =>
            m.id === newMessage.id ? { ...m, status: "read" } : m
          ),
        }));
      }, 2500);
    },
    [activeConversationId]
  );

  return {
    conversations: filteredConversations,
    activeConversation,
    activeMessages,
    otherUser,
    activeConversationId,
    searchQuery,
    setSearchQuery,
    selectConversation,
    sendMessage,
  };
}
