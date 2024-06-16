import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { constants } from '../../utils/constants';
import * as fs from 'fs';
import { unlink } from 'fs/promises';
import * as path from 'path';

@Injectable()
export class EventsService {
  private logger = new Logger(EventsService.name);

  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(
    createEventDto: CreateEventDto,
    event_images: Array<Express.Multer.File>,
  ) {
    const event_images_filename: string[] = [];

    event_images.forEach((event_image) => {
      event_images_filename.push(event_image.filename);
    });

    const event = this.eventRepository.create({
      ...createEventDto,
      event_images: event_images_filename,
    });

    return await this.eventRepository.save(event);
  }

  async findAll() {
    return await this.eventRepository.find();
  }

  async findOne(id: number) {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) throw new NotFoundException(`Event with id '${id}' not found`);
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    console.log(updateEventDto);
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) throw new NotFoundException(`Event with id '${id}' not found`);
    return await this.eventRepository.update(id, updateEventDto);
  }

  async remove(id: number) {
    const event = await this.eventRepository.findOneBy({ id });

    if (!event) throw new NotFoundException(`Event with id '${id}' not found`);

    const event_images_path: string[] = [];

    event.event_images.forEach((event_image) => {
      const image_path = path.join(
        constants.EVENT_UPLOAD_LOCATION,
        event_image,
      );
      event_images_path.push(image_path);
    });

    try {
      const deleteEventImages = event_images_path.map((image_path) => {
        return new Promise((resolve) => {
          if (fs.existsSync(image_path)) {
            resolve(unlink(image_path));
          }
          resolve(`${image_path} not found`);
        });
      });

      await Promise.all(deleteEventImages);
      return await this.eventRepository.delete({ id });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
