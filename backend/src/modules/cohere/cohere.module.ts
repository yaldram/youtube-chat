import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CohereClient } from 'cohere-ai';

import { CohereService } from './cohere.service';

@Global()
@Module({
  imports: [ConfigModule],
  exports: [CohereClient, CohereService],
  providers: [
    {
      provide: CohereClient,
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        new CohereClient({
          token: config.get('COHERE_API_KEY'),
        }),
    },
    CohereService,
  ],
})
export class CohereModule {}
