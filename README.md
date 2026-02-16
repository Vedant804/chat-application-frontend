# ChatSphere

ChatSphere is a modern, responsive chat application built with React, Vite, and Shadcn UI. It features real-time-like messaging, voice recording, file sharing, and emoji support.

## Setup Steps

To get started with ChatSphere locally:

1.  **Prerequisites**: Ensure you have Node.js and npm (or bun/yarn) installed.
2.  **Install Dependencies**:
    ```bash
    npm install
    # or
    bun install
    ```
3.  **Run Development Server**:
    ```bash
    npm run dev
    # or
    bun dev
    ```
    The application will be available at `http://localhost:8080` (or the port shown in your terminal).
4.  **Build for Production**:
    ```bash
    npm run build
    ```

## Component Structure

The application is structured around a few key components in `src/components/chat`:

*   **`ChatSidebar.tsx`**: Displays the list of active conversations, search bar, and user profile. Handles navigation between chats.
*   **`ChatArea.tsx`**: The main chat view. Renders the message history for the selected conversation and contains the message bubbles.
*   **`ChatInputBar.tsx`**: The interactive input area. Handles text input, voice recording, emoji selection, and file attachments.
*   **`MessageBubble.tsx`**: Renders individual messages (text, voice, image, files) with appropriate styling for sent/received states.
*   **`UserAvatar.tsx`**: Reusable component for displaying user avatars with fallback initials.

## State Management

The application uses a custom hook `useChatState.ts` for managing application state:

*   **Conversations**: managed as a list of `Conversation` objects.
*   **Messages**: stored in a record keyed by conversation ID.
*   **Active Conversation**: tracks the currently selected chat.
*   **Mock Data**: Initial data is loaded from `src/data/mockData.ts` to simulate a working environment without a backend.

## Feature Handling

### Emoji
Emoji support is powered by `@emoji-mart/react` and `@emoji-mart/data`. The picker is integrated into the `ChatInputBar` and allows users to insert emojis into their messages.

### Voice Messaging
Voice recording is implemented using the browser's `MediaRecorder` API.
*   **Recording**: Captures audio chunks and converts them to a `Blob`.
*   **Preview**: Allows users to listen to their recording before sending.
*   **Sending**: formatting as a "voice" type message with an object URL for playback.

### File Handling
File sharing uses a hidden file input triggered by a paperclip icon.
*   **Images**: Previewed directly in the chat bubble.
*   **Documents**: Displayed with a file icon and download link.
*   **Storage**: currently uses `URL.createObjectURL` for local preview/access.

## Future Backend Improvements

To make this a fully functional production app, a backend should be implemented to handle:

1.  **WebSocket / Socket.io**: For real-time bi-directional messaging instead of local state updates.
2.  **Database**: To store users, conversations, and message history persistently (e.g., PostgreSQL, MongoDB).
3.  **File Storage**: Integration with cloud storage (AWS S3, Firebase Storage) for uploaded files and voice notes.
4.  **Authentication**: Secure login and signup flows (JWT, OAuth).
5.  **Search**: Server-side search for messages and users.
