import { Message } from "@/types/chat";
import { format } from "date-fns";
import { Check, CheckCheck, FileText, Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

interface BubbleProps {
  message: Message;
  isMine: boolean;
}

function StatusIcon({ status }: { status: Message["status"] }) {
  if (status === "sent") return <Check className="h-3 w-3 opacity-60" />;
  if (status === "delivered") return <CheckCheck className="h-3 w-3 opacity-60" />;
  return <CheckCheck className="h-3 w-3 text-sky-300" />;
}

function AudioBubble({ message }: { message: Message }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="flex items-center gap-2 min-w-[180px]">
      <button onClick={togglePlay} className="flex-shrink-0 h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
      </button>
      <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
        <div className="h-full w-1/3 bg-white/60 rounded-full" />
      </div>
      <span className="text-[10px] opacity-70">{message.audioDuration ? `${message.audioDuration}s` : "0:05"}</span>
      {message.fileUrl && (
        <audio ref={audioRef} src={message.fileUrl} onEnded={() => setPlaying(false)} />
      )}
    </div>
  );
}

function FileBubble({ message }: { message: Message }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
        <FileText className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium truncate">{message.fileName || "File"}</p>
        <p className="text-[10px] opacity-70">{message.fileSize || "Unknown size"}</p>
      </div>
    </div>
  );
}

function ImageBubble({ message }: { message: Message }) {
  return (
    <div className="max-w-[240px]">
      <img
        src={message.fileUrl}
        alt={message.fileName || "Image"}
        className="rounded-lg w-full object-cover"
      />
      {message.fileName && <p className="text-[10px] mt-1 opacity-70">{message.fileName}</p>}
    </div>
  );
}

export function MessageBubble({ message, isMine }: BubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isMine ? "justify-end" : "justify-start"} mb-1`}
    >
      <div
        className={`max-w-[65%] px-3 py-2 rounded-2xl relative ${
          isMine
            ? "bg-chat-bubble-sent text-chat-bubble-sent-fg rounded-br-md"
            : "bg-chat-bubble-received text-chat-bubble-received-fg rounded-bl-md shadow-sm"
        }`}
      >
        {message.type === "voice" && <AudioBubble message={message} />}
        {message.type === "file" && <FileBubble message={message} />}
        {message.type === "image" && <ImageBubble message={message} />}
        {message.type === "text" && <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>}

        <div className={`flex items-center gap-1 mt-1 ${isMine ? "justify-end" : "justify-start"}`}>
          <span className="text-[10px] opacity-50">{format(message.timestamp, "h:mm a")}</span>
          {isMine && <StatusIcon status={message.status} />}
        </div>
      </div>
    </motion.div>
  );
}
