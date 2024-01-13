import { Trash2Icon } from 'lucide-react';

import { Button } from '../ui/button';
import { useChatContext } from '@/contexts/chatContext';

export function ClearChat() {
  const { clearMessages } = useChatContext();

  return (
    <Button
      onClick={clearMessages}
      className="z-10 rounded-lg ml-0.5 mt-0.5 absolute top-0 shadow-lg"
      variant="destructive"
      size="icon"
    >
      <Trash2Icon className="h-4 w-4" />
    </Button>
  );
}
