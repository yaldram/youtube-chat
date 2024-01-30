import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';

import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create.schema';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createVideo(@Request() request, @Body() payload: CreateVideoDto) {
    return this.videoService.create(payload, request.user.id);
  }

  @Get('/:videoId')
  getVideo(@Param('videoId') videoId: string) {
    return this.videoService.getVideo(videoId);
  }

  @Get('/search-collection/:userQuery/:collectionId')
  @UseGuards(JwtAuthGuard)
  async searchCollectionVideos(
    @Request() request,
    @Param('userQuery') userQuery: string,
    @Param('collectionId') collectionId: string,
  ) {
    const { records } = await this.videoService.searchCollectionVideos(
      request.user.id,
      collectionId,
      userQuery,
    );

    return records;
  }

  @Get('/search-all/:userQuery')
  @UseGuards(JwtAuthGuard)
  async searchAllVideos(
    @Request() request,
    @Param('userQuery') userQuery: string,
  ) {
    const { records } = await this.videoService.searchAllVideos(
      request.user.id,
      userQuery,
    );

    return records;
  }
}
