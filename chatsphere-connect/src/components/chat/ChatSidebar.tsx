import { Search } from "lucide-react";
import { Conversation } from "@/types/chat";
import { currentUser } from "@/data/mockData";
import { UserAvatar } from "./UserAvatar";
import { format, isToday, isYesterday } from "date-fns";
import { motion } from "framer-motion";

interface SidebarProps {
  conversations: Conversation[];
  activeId: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelect: (id: string) => void;
}

function formatTime(date: Date) {
  if (isToday(date)) return format(date, "h:mm a");
  if (isYesterday(date)) return "Yesterday";
  return format(date, "MM/dd/yy");
}

export function ChatSidebar({ conversations, activeId, searchQuery, onSearchChange, onSelect }: SidebarProps) {
  return (
    <div className="w-80 flex-shrink-0 bg-chat-sidebar flex flex-col h-full border-r border-chat-sidebar-border">
      {/* Header */}
      <div className="p-4 pb-3">
        <h1 className="text-xl font-bold text-chat-sidebar-fg mb-3">Chats</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-chat-sidebar-muted" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-chat-sidebar-hover text-chat-sidebar-fg placeholder:text-chat-sidebar-muted rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {conversations.map((conv) => {
          const other = conv.participants.find((p) => p.id !== currentUser.id)!;
          const isActive = conv.id === activeId;

          return (
            <motion.button
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                isActive ? "bg-chat-sidebar-active" : "hover:bg-chat-sidebar-hover"
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <UserAvatar user={other} size="lg" showStatus />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-chat-sidebar-fg text-sm truncate">{other.name}</span>
                  <span className="text-xs text-chat-sidebar-muted flex-shrink-0 ml-2">
                    {formatTime(conv.lastMessageTime)}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-xs text-chat-sidebar-muted truncate">{conv.lastMessage}</span>
                  {conv.unreadCount > 0 && (
                    <span className="ml-2 flex-shrink-0 bg-chat-unread text-primary-foreground text-[10px] font-bold rounded-full h-5 min-w-5 flex items-center justify-center px-1.5">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
