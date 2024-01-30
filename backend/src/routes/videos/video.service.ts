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

  async create(payload: CreateVideoDto, userId: string) {
    const video = await this.xataClient.db.videos.select(['id']).getFirst({
      filter: {
        youtubeId: payload.youtubeId,
      },
    });

    if (video) {
      await this.addCollectionRelation(video.id, payload.collectionId, userId);
      return video;
    }

    const newVideo = await this.xataClient.db.videos.create({
      youtubeId: payload.youtubeId,
      url: payload.url,
    });

    await this.addCollectionRelation(newVideo.id, payload.collectionId, userId);

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

  private async addCollectionRelation(
    videoId: string,
    collectionId: string,
    userId: string,
  ) {
    return this.xataClient.db.collectionvideos.create({
      videoId: videoId,
      collectionId,
      userId,
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

  async searchCollectionVideos(
    userId: string,
    collectionId: string,
    userQuery: string,
  ) {
    const collectionVideos = await this.xataClient.db.collectionvideos
      .filter({
        userId,
        collectionId,
      })
      .select(['videoId'])
      .getMany();

    const videoIds = collectionVideos.map((video) => video.videoId.id);

    return this.xataClient.db.videos.search(userQuery, {
      target: ['title', 'author'],
      fuzziness: 2,
      filter: {
        id: {
          $any: videoIds,
        },
      },
    });
  }

  async searchAllVideos(userId: string, userQuery: string) {
    const userVideos = await this.xataClient.db.collectionvideos
      .filter({ userId })
      .select(['videoId'])
      .getMany();

    const videoIds = userVideos.map((video) => video.videoId.id);

    return this.xataClient.db.videos.search(userQuery, {
      target: ['title', 'author'],
      fuzziness: 2,
      filter: {
        id: {
          $any: videoIds,
        },
      },
    });
  }
}
