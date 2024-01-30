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
  getCollectionVideos(
    @Request() request,
    @Param('collectionId') collectionId: string,
  ) {
    return this.collectionService.getCollectionVideos(
      collectionId,
      request.user.id,
    );
  }

  @Get('/:collectionId/videoIds')
  @UseGuards(JwtAuthGuard)
  getCollectionVideoIds(@Param('collectionId') collectionId: string) {
    return this.collectionService.getCollectionVideoIds(collectionId);
  }

  @Get('/search/:userQuery')
  @UseGuards(JwtAuthGuard)
  searchCollections(@Request() request, @Param('userQuery') userQuery) {
    return this.collectionService.searchCollections(userQuery, request.user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createCollection(
    @Body() collection: CreateCollectionDto,
    @Request() request,
  ) {
    return this.collectionService.create(collection, request.user.id);
  }
}
