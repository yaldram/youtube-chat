import { EventBridgeClient } from '@aws-sdk/client-eventbridge';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  exports: [EventBridgeClient],
  providers: [
    {
      provide: EventBridgeClient,
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        new EventBridgeClient({
          region: config.get('AWS_REGION'),
          credentials: {
            accessKeyId: config.get('AWS_ACCESS_KEY'),
            secretAccessKey: config.get('AWS_SECRECT_ACCESS_KEY'),
          },
        }),
    },
  ],
})
export class EventBridgeModule {}
