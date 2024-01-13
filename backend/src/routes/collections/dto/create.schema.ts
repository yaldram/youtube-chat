import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateCollectionSchema = z.object({
  title: z.string(),
});

export class CreateCollectionDto extends createZodDto(CreateCollectionSchema) {}
