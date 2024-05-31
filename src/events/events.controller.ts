import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  ParseFilePipe,
  UseGuards,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MulterFileUpload } from '../../utils/file-upload.multer';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({ description: 'Event Created', type: Event })
  @UseInterceptors(
    FileInterceptor(
      'event_image',
      MulterFileUpload({
        allowedFiles: ['.png', '.jpg', '.jpeg'],
        uploadLocation: constants.EVENT_UPLOAD_LOCATION,
      }),
    ),
  )
  create(
    @Body() createEventDto: CreateEventDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
      }),
    )
    event_image: Express.Multer.File,
  ) {
    return this.eventsService.create(createEventDto, event_image);
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

  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiCreatedResponse({ description: 'Event with provided Id updated' })
  @ApiNotFoundResponse({
    description: 'Event with provided Id not found, update failed',
  })
  @UseInterceptors(
    FileInterceptor(
      'event_image',
      MulterFileUpload({
        allowedFiles: ['.png', '.jpg', '.jpeg'],
        uploadLocation: constants.EVENT_UPLOAD_LOCATION,
      }),
    ),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventDto: UpdateEventDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
      }),
    )
    event_image: Express.Multer.File,
  ) {
    return this.eventsService.update(id, updateEventDto, event_image);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({ description: 'Event with provided Id deleted' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.remove(id);
  }
}
