import { Controller, Post, Get, Body, Param } from '@nestjs/common';

import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create.schema';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  createVideo(@Body() payload: CreateVideoDto) {
    return this.videoService.create(payload);
  }

  @Get('/:videoId')
  getVideo(@Param('videoId') videoId: string) {
    return this.videoService.getVideo(videoId);
  }
}
