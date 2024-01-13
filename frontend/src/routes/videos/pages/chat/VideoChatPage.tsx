import { useOutletContext } from 'react-router-dom';

import { Video } from '@/types';
import { ChatProvider } from '@/contexts/chatContext';
import { ClearChat } from '@/components/templates/ClearChat';
import { ChatMessageList } from '@/components/templates/ChatMessageList';
import { ChatInputForm } from '@/components/templates/ChatInputForm';
import { apiEndpoints } from '@/lib/apiConfig';

export function VideoChatPage() {
  const videoDetails = useOutletContext<Video>();

  return (
    <ChatProvider
      conversationId={videoDetails.id}
      endpoint={apiEndpoints.videoChat}
      resourceIds={[videoDetails.id]}
    >
      <div className="relative rounded-lg border h-full gap-6 pt-4 flex flex-col">
        <ClearChat />

        <ChatMessageList />

        <ChatInputForm />
      </div>
    </ChatProvider>
  );
}
