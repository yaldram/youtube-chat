import { useEffect, useRef } from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { useChatContext } from '@/contexts/chatContext';
import { ScrollArea } from '../ui/scroll-area';

const messageCardVariants = cva('w-3/4 rounded-lg px-4 py-4 text-md', {
  variants: {
    variant: {
      user: 'ml-auto bg-primary text-primary-foreground',
      assistant: 'mr-auto bg-muted',
    },
  },
});

export function ChatMessageList() {
  const { messages } = useChatContext();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  };

  useEffect(() => {
    // Scroll to the latest message when 'messages' change
    scrollToBottom();
  }, [messages]);

  return (
    <ScrollArea style={{ flexBasis: '90%', overflow: 'scroll' }}>
      <div className="flex px-4 flex-col gap-10">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(messageCardVariants({ variant: message.role }))}
            ref={index === messages.length - 1 ? messagesEndRef : null}
          >
            {message.content}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
