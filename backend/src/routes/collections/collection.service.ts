import { Injectable } from '@nestjs/common';

import { XataClient } from 'src/config/xata';
import { CreateCollectionDto } from './dto/create.schema';

@Injectable()
export class CollectionService {
  constructor(private readonly xataClient: XataClient) {}

  getAll(userId: string) {
    return this.xataClient.db.collections.getAll({
      filter: {
        userId,
      },
    });
  }

  async getCollectionVideos(collectionId: string) {
    const videos = await this.xataClient.db.collectionvideos
      .select([
        'videoId.id',
        'videoId.title',
        'videoId.thumbnailUrl',
        'videoId.chatEnabled',
      ])
      .getAll({
        filter: {
          collectionId,
        },
      });

    return videos.map((video) => video.videoId);
  }

  async getCollectionVideoIds(collectionId: string) {
    const videos = await this.xataClient.db.collectionvideos
      .select(['videoId.id'])
      .getAll({
        filter: {
          collectionId,
        },
      });

    return videos.map((video) => video.videoId.id);
  }

  create(collection: CreateCollectionDto, userId: string) {
    return this.xataClient.db.collections.create({
      title: collection.title,
      userId,
    });
  }
}
