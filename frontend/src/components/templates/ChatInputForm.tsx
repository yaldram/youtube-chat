import { Send, StopCircle } from 'lucide-react';
import { useRef, type FormEvent, useEffect } from 'react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Form } from 'react-router-dom';
import { useChatContext } from '@/contexts/chatContext';

export function ChatInputForm() {
  const { chatInput, chatInputChange, sendMessage, loading } = useChatContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (loading) return;
    inputRef.current?.focus();
  }, [loading]);

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await sendMessage();
  };

  return (
    <Form
      className="flex w-full py-4 px-4 items-center gap-4"
      onSubmit={handleOnSubmit}
    >
      <Input
        ref={inputRef}
        id="message"
        placeholder="Type your message..."
        className="flex-1 p-4"
        autoComplete="off"
        disabled={loading}
        value={chatInput}
        onChange={chatInputChange}
      />
      <Button
        type="submit"
        disabled={chatInput.length === 0 || loading}
        size="icon"
      >
        {loading ? (
          <StopCircle className="h-4 w-4" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        <span className="sr-only">Send</span>
      </Button>
    </Form>
  );
}
