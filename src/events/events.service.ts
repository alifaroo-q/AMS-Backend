import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { constants } from '../../utils/constants';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(
    createEventDto: CreateEventDto,
    event_image: Express.Multer.File,
  ) {
    const event = this.eventRepository.create(createEventDto);
    if (event_image) event.event_image = event_image.filename;
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
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) throw new NotFoundException(`Event with id '${id}' not found`);
    return this.eventRepository.update(id, updateEventDto);
  }

  async remove(id: number) {
    const event = await this.eventRepository.findOneBy({ id });

    if (!event) throw new NotFoundException(`Event with id '${id}' not found`);

    const event_image = path.join(
      constants.EVENT_UPLOAD_LOCATION,
      event.event_image,
    );

    if (
      fs.existsSync(event_image) &&
      event.event_image !== constants.DEFAULT_EVENT
    )
      fs.unlink(event_image, function (err) {
        if (err) console.log(err);
      });

    return await this.eventRepository.delete({ id });
  }
}
