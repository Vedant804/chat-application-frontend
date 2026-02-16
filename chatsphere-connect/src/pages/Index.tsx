import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatArea } from "@/components/chat/ChatArea";
import { ChatInputBar } from "@/components/chat/ChatInputBar";
import { useChatState } from "@/hooks/useChatState";

const Index = () => {
  const {
    conversations,
    activeConversation,
    activeMessages,
    otherUser,
    activeConversationId,
    searchQuery,
    setSearchQuery,
    selectConversation,
    sendMessage,
  } = useChatState();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <ChatSidebar
        conversations={conversations}
        activeId={activeConversationId}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelect={selectConversation}
      />
      <ChatArea messages={activeMessages} otherUser={otherUser}>
        <ChatInputBar onSend={sendMessage} />
      </ChatArea>
    </div>
  );
};

export default Index;
