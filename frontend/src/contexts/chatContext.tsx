import { createContext, useContext, useEffect, useState } from 'react';
import type { ChangeEvent, ReactNode } from 'react';

import type { ChatMessage } from '@/types';
import {
  deleteLocalStorageItem,
  getLocalStorageItem,
  setLocalStorageItem,
} from '@/lib/localStorage';
import { getUniqueId } from '@/lib/utils';

type ChatContext = {
  loading: boolean;
  chatInput: string;
  chatInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  messages: ChatMessage[];
  clearMessages: () => void;
  sendMessage: () => Promise<void>;
};

export const ChatContext = createContext<ChatContext | null>(null);

type ChatProviderProps = {
  children: ReactNode;
  conversationId: string;
  endpoint: string;
  resourceIds?: string[];
};

export const ChatProvider = ({
  children,
  conversationId,
  endpoint,
  resourceIds,
}: ChatProviderProps) => {
  // get a unique id to avoid context length error
  const chatId = getUniqueId(conversationId);

  const [chatInput, setChatInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const previousMessages = getLocalStorageItem(conversationId);
    return previousMessages || [];
  });

  useEffect(() => {
    return () => {
      setLocalStorageItem(conversationId, messages);
    };
  }, [conversationId, messages]);

  const chatInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChatInput(event.target.value);
  };

  const clearMessages = () => {
    setMessages([]);
    deleteLocalStorageItem(conversationId);
  };

  const sendMessage = async () => {
    setMessages((prevMessages) =>
      prevMessages.concat([{ role: 'user', content: chatInput }]),
    );
    setChatInput('');
    setLoading(true);

    try {
      // Make API call
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationId: chatId,
          resourceId: resourceIds,
          userQuery: chatInput,
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.text();

      // Handle API response data
      setMessages((prevMessages) =>
        prevMessages.concat([
          {
            role: 'assistant',
            content: data,
          },
        ]),
      );
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    loading,
    chatInput,
    chatInputChange,
    messages,
    clearMessages,
    sendMessage,
  };

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);

  if (!context)
    throw new Error('useChatContext must be used within a ChatProvider');

  return context;
};
