import { Injectable } from '@nestjs/common';
import {
  EventBridgeClient,
  PutEventsCommand,
} from '@aws-sdk/client-eventbridge';

import { XataClient } from 'src/config/xata';
import { CreateVideoDto } from './dto/create.schema';

@Injectable()
export class VideoService {
  constructor(
    private readonly xataClient: XataClient,
    private readonly eventBridge: EventBridgeClient,
  ) {}

  async create(payload: CreateVideoDto) {
    const video = await this.xataClient.db.videos.select(['id']).getFirst({
      filter: {
        youtubeId: payload.youtubeId,
      },
    });

    if (video) {
      await this.addCollectionRelation(video.id, payload.collectionId);
      return video;
    }

    const newVideo = await this.xataClient.db.videos.create({
      youtubeId: payload.youtubeId,
      url: payload.url,
    });

    await this.addCollectionRelation(newVideo.id, payload.collectionId);

    const eventDetails = {
      Entries: [
        {
          Source: 'custom.youtubeChat',
          DetailType: 'insert',
          Detail: JSON.stringify(newVideo),
        },
      ],
    };

    const putEventCommand = new PutEventsCommand(eventDetails);
    await this.eventBridge.send(putEventCommand);

    return newVideo;
  }

  private async addCollectionRelation(videoId: string, collectionId: string) {
    return this.xataClient.db.collectionvideos.create({
      videoId: videoId,
      collectionId,
    });
  }

  getVideo(videoId: string) {
    return this.xataClient.db.videos.read(videoId, [
      'id',
      'title',
      'author',
      'thumbnailUrl',
      'url',
      'description',
      'chatEnabled',
      'publishDate',
    ]);
  }
}
