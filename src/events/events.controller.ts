import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
  ParseIntPipe,
  ParseFilePipe,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { diskStorage } from 'multer';
import { constants } from '../../utils/constants';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('event_image', {
      limits: { fileSize: 4 * 1024 * 1024 },
      fileFilter: (req, file, callback) => {
        const ext = path.parse(file.originalname).ext;
        if (!['.png', '.jpeg', '.jpg'].includes(ext)) {
          req.fileValidationError = 'Invalid file type';
          return callback(
            new BadRequestException('Invalid File Type ' + ext),
            false,
          );
        }
        return callback(null, true);
      },
      storage: diskStorage({
        destination: constants.EVENT_UPLOAD_LOCATION,
        filename: (req: any, file, cb) => {
          const fn = path.parse(file.originalname);
          const filename = `${fn.name}-${new Date().getTime()}${fn.ext}`;
          cb(null, filename);
        },
      }),
    }),
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
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.remove(id);
  }
}
