import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const chatSchema = z.object({
  conversationId: z.string(),
  resourceId: z.array(z.string()).optional(),
  userQuery: z.string(),
});

export class ChatDto extends createZodDto(chatSchema) {}
