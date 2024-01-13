import { Global, Module } from '@nestjs/common';

import { XataClient, getXataClient } from '../../config/xata';

@Global()
@Module({
  exports: [XataClient],
  providers: [
    {
      provide: XataClient,
      useFactory: () => getXataClient(),
    },
  ],
})
export class XataModule {}
