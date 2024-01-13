import { Module } from '@nestjs/common';

import { CohereModule } from 'src/modules/cohere/cohere.module';
import { CohereService } from 'src/modules/cohere/cohere.service';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [CohereModule],
  controllers: [ChatController],
  providers: [CohereService, ChatService],
})
export class ChatModule {}
