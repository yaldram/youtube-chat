import { Module } from '@nestjs/common';

import { CollectionModule } from './collections/collection.module';
import { VideoModule } from './videos/video.module';
import { ChatModule } from './chats/chat.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CollectionModule, VideoModule, ChatModule, AuthModule],
})
export class RouteModule {}
