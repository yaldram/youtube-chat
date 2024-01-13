import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';

import { CollectionService } from './collection.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateCollectionDto } from './dto/create.schema';

@Controller('collections')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllCollections(@Request() request) {
    return this.collectionService.getAll(request.user.id);
  }

  @Get('/:collectionId/videos')
  @UseGuards(JwtAuthGuard)
  getCollectionVideos(@Param('collectionId') collectionId: string) {
    return this.collectionService.getCollectionVideos(collectionId);
  }

  @Get('/:collectionId/videoIds')
  @UseGuards(JwtAuthGuard)
  getCollectionVideoIds(@Param('collectionId') collectionId: string) {
    return this.collectionService.getCollectionVideoIds(collectionId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createCollection(
    @Body() collection: CreateCollectionDto,
    @Request() request,
  ) {
    const user = request.user;
    return this.collectionService.create(collection, user.id);
  }
}
