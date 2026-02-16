import { useState, useRef, useCallback, useEffect } from "react";
import { Send, Smile, Mic, Paperclip, X, Square, FileText, Image as ImageIcon } from "lucide-react";
import { Message } from "@/types/chat";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { motion, AnimatePresence } from "framer-motion";

interface InputBarProps {
  onSend: (msg: Partial<Message>) => void;
}

export function ChatInputBar({ onSend }: InputBarProps) {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close emoji on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
        setShowEmoji(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSend = () => {
    if (audioBlob && audioUrl) {
      onSend({ type: "voice", fileUrl: audioUrl, audioDuration: recordingTime, text: "🎤 Voice message" });
      setAudioBlob(null);
      setAudioUrl(null);
      setRecordingTime(0);
      return;
    }
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend({ type: "text", text: trimmed });
    setText("");
    setShowEmoji(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setText((prev) => prev + emoji.native);
    inputRef.current?.focus();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);
        stream.getTracks().forEach((t) => t.stop());
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => setRecordingTime((t) => t + 1), 1000);
    } catch {
      console.error("Mic access denied");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const cancelRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const isImage = file.type.startsWith("image/");
    const sizeStr = file.size < 1024 * 1024
      ? `${(file.size / 1024).toFixed(1)} KB`
      : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

    onSend({
      type: isImage ? "image" : "file",
      fileUrl: url,
      fileName: file.name,
      fileSize: sizeStr,
      text: isImage ? `📷 ${file.name}` : `📎 ${file.name}`,
    });
    e.target.value = "";
  };

  const formatRecTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="relative">
      {/* Emoji Picker */}
      <AnimatePresence>
        {showEmoji && (
          <motion.div
            ref={emojiRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full left-4 mb-2 z-50"
          >
            <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="light" previewPosition="none" skinTonePosition="none" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio preview */}
      <AnimatePresence>
        {audioUrl && !isRecording && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-card border-t border-border px-5 py-2 flex items-center gap-3"
          >
            <audio src={audioUrl} controls className="h-8 flex-1" />
            <button onClick={cancelRecording} className="p-1 text-destructive hover:bg-destructive/10 rounded">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input bar */}
      <div className="bg-card border-t border-border px-4 py-3 flex items-end gap-2">
        {isRecording ? (
          <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-destructive/10 rounded-xl">
            <span className="h-2.5 w-2.5 rounded-full bg-chat-recording animate-pulse-recording" />
            <span className="text-sm font-medium text-destructive">{formatRecTime(recordingTime)}</span>
            <span className="text-xs text-muted-foreground">Recording...</span>
            <div className="flex-1" />
            <button onClick={cancelRecording} className="p-1.5 text-muted-foreground hover:text-destructive rounded">
              <X className="h-4 w-4" />
            </button>
            <button onClick={stopRecording} className="p-1.5 bg-chat-recording text-white rounded-lg">
              <Square className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => setShowEmoji(!showEmoji)}
              className="p-2 text-muted-foreground hover:text-primary rounded-lg hover:bg-muted transition-colors"
              aria-label="Emoji picker"
            >
              <Smile className="h-5 w-5" />
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-muted-foreground hover:text-primary rounded-lg hover:bg-muted transition-colors"
              aria-label="Attach file"
            >
              <Paperclip className="h-5 w-5" />
            </button>
            <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} accept="image/*,.pdf,.doc,.docx,.txt,.zip" />
            <textarea
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              rows={1}
              className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm resize-none outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground max-h-32 transition-all"
              style={{ minHeight: "40px" }}
            />
            {text.trim() || audioUrl ? (
              <button
                onClick={handleSend}
                className="p-2.5 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={startRecording}
                className="p-2.5 text-muted-foreground hover:text-primary rounded-xl hover:bg-muted transition-colors"
                aria-label="Record voice message"
              >
                <Mic className="h-5 w-5" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
