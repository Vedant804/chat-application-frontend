import { User } from "@/types/chat";

interface AvatarProps {
  user: User;
  size?: "sm" | "md" | "lg";
  showStatus?: boolean;
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

const statusSizeClasses = {
  sm: "h-2.5 w-2.5",
  md: "h-3 w-3",
  lg: "h-3.5 w-3.5",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name: string) {
  const colors = [
    "bg-rose-500",
    "bg-sky-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-violet-500",
    "bg-orange-500",
    "bg-teal-500",
    "bg-pink-500",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export function UserAvatar({ user, size = "md", showStatus = false }: AvatarProps) {
  return (
    <div className="relative flex-shrink-0">
      <div
        className={`${sizeClasses[size]} ${getAvatarColor(user.name)} rounded-full flex items-center justify-center font-semibold text-white`}
      >
        {getInitials(user.name)}
      </div>
      {showStatus && (
        <span
          className={`absolute bottom-0 right-0 ${statusSizeClasses[size]} rounded-full border-2 border-chat-sidebar ${
            user.online ? "bg-chat-online" : "bg-chat-sidebar-muted"
          }`}
        />
      )}
    </div>
  );
}
