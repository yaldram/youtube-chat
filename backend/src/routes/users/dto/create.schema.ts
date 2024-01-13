import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateUserSchema = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string(),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
