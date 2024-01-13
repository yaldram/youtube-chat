import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateVideoSchema = z.object({
  url: z.string(),
  youtubeId: z.string(),
  collectionId: z.string(),
});

export class CreateVideoDto extends createZodDto(CreateVideoSchema) {}
