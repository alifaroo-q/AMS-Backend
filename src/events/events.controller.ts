import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ParseIntPipe,
  ParseFilePipe,
  UploadedFiles,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Event } from './entities/event.entity';
import { EventsService } from './events.service';
import { constants } from '../../utils/constants';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MulterFileUpload } from '../../utils/file-upload.multer';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Event Created', type: Event })
  @UseInterceptors(
    FilesInterceptor(
      'event_images',
      10,
      MulterFileUpload({
        allowedFiles: ['.png', '.jpg', '.jpeg'],
        uploadLocation: constants.EVENT_UPLOAD_LOCATION,
      }),
    ),
  )
  createEvent(
    @Body() createEventDto: CreateEventDto,
    @UploadedFiles(
      new ParseFilePipe({
        fileIsRequired: true,
      }),
    )
    event_images: Array<Express.Multer.File>,
  ) {
    return this.eventsService.create(createEventDto, event_images);
  }

  @Get()
  @ApiOkResponse({
    description: 'All Events',
    type: [Event],
  })
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Event with provided Id', type: Event })
  @ApiNotFoundResponse({ description: 'Event with provided not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ description: 'Event with provided Id updated' })
  @ApiNotFoundResponse({
    description: 'Event with provided Id not found, update failed',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Event with provided Id deleted' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.remove(id);
  }
}
