import { useRef, useEffect } from "react";
import { Message, User } from "@/types/chat";
import { MessageBubble } from "./MessageBubble";
import { UserAvatar } from "./UserAvatar";
import { Phone, Video, MoreVertical } from "lucide-react";
import { format, isToday, isYesterday, isSameDay } from "date-fns";

interface ChatAreaProps {
  messages: Message[];
  otherUser?: User;
  children: React.ReactNode; // input bar
}

function formatDateLabel(date: Date) {
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "MMMM d, yyyy");
}

export function ChatArea({ messages, otherUser, children }: ChatAreaProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Group messages by day
  const groupedMessages: { label: string; messages: Message[] }[] = [];
  messages.forEach((msg) => {
    const last = groupedMessages[groupedMessages.length - 1];
    if (last && isSameDay(last.messages[0].timestamp, msg.timestamp)) {
      last.messages.push(msg);
    } else {
      groupedMessages.push({ label: formatDateLabel(msg.timestamp), messages: [msg] });
    }
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-chat-bg">
      {/* Header */}
      {otherUser && (
        <div className="flex items-center justify-between px-5 py-3 bg-card border-b border-border shadow-sm">
          <div className="flex items-center gap-3">
            <UserAvatar user={otherUser} size="md" showStatus />
            <div>
              <h2 className="font-semibold text-sm text-foreground">{otherUser.name}</h2>
              <p className="text-xs text-muted-foreground">
                {otherUser.online ? "Online" : "Offline"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
              <Phone className="h-4 w-4" />
            </button>
            <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
              <Video className="h-4 w-4" />
            </button>
            <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-5 py-4">
        {groupedMessages.map((group) => (
          <div key={group.label}>
            <div className="flex justify-center my-3">
              <span className="bg-card text-muted-foreground text-[11px] font-medium px-3 py-1 rounded-full shadow-sm">
                {group.label}
              </span>
            </div>
            {group.messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} isMine={msg.senderId === "me"} />
            ))}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      {children}
    </div>
  );
}
