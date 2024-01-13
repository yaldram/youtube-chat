import { useLoaderData, useParams } from 'react-router-dom';

import { ChatMessageList } from '@/components/templates/ChatMessageList';
import { ChatInputForm } from '@/components/templates/ChatInputForm';
import { ChatProvider } from '@/contexts/chatContext';
import { ClearChat } from '@/components/templates/ClearChat';
import { apiEndpoints } from '@/lib/apiConfig';

type LoaderData = { videoIds: string[] };

export function CollectionChatPage() {
  const params = useParams();
  const { videoIds } = useLoaderData() as LoaderData;

  return (
    <ChatProvider
      conversationId={params.collectionId as string}
      endpoint={apiEndpoints.collectionChat}
      resourceIds={videoIds}
    >
      <div className="relative rounded-lg border h-full gap-6 pt-4 flex flex-col">
        <ClearChat />

        <ChatMessageList />

        <ChatInputForm />
      </div>
    </ChatProvider>
  );
}
