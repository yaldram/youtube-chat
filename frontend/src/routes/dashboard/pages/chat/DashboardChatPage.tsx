import { useOutletContext } from 'react-router-dom';

import { TabsLayout } from '../../layout/TabsLayout';
import { ChatProvider } from '@/contexts/chatContext';
import { ClearChat } from '@/components/templates/ClearChat';
import { ChatMessageList } from '@/components/templates/ChatMessageList';
import { ChatInputForm } from '@/components/templates/ChatInputForm';
import { User } from '@/types';
import { apiEndpoints } from '@/lib/apiConfig';

export function DashboardChatPage() {
  const user = useOutletContext() as User;

  return (
    <TabsLayout>
      <ChatProvider
        conversationId={user.id}
        endpoint={apiEndpoints.collectionChat}
      >
        <div className="relative rounded-lg border h-full gap-6 pt-4 flex flex-col">
          <ClearChat />

          <ChatMessageList />

          <ChatInputForm />
        </div>
      </ChatProvider>
    </TabsLayout>
  );
}
