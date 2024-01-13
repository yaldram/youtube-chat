import { Request } from 'express';

import { CreateUserDto } from '../users/dto/create.schema';

export interface RequestWithUser extends Request {
  user: CreateUserDto & { id: string };
}
