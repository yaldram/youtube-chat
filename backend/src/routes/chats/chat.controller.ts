import { Controller, Post, Body } from '@nestjs/common';

import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.schema';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('videos')
  videoChat(@Body() payload: ChatDto) {
    return this.chatService.videoChat(payload);
  }

  @Post('collections')
  collectionChat(@Body() payload: ChatDto) {
    return this.chatService.collectionChat(payload);
  }

  @Post('knowledge-base')
  chat(@Body() payload: ChatDto) {
    return this.chatService.knowledgeBaseChat(payload);
  }
}
