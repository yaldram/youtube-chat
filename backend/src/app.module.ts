import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

import { environmentSchema } from './config/config.schema';
import { XataModule } from './modules/xata/xata.module';
import { EventBridgeModule } from './modules/event-bridge/eventbridge.module';
import { RouteModule } from './routes/route.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate(config) {
        return environmentSchema.parse(config);
      },
    }),

    XataModule,
    EventBridgeModule,

    RouteModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
