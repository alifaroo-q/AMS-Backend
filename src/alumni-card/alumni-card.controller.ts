import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AlumniCardService } from './alumni-card.service';
import { CreateAlumniCardDto } from './dto/create-alumni-card.dto';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from '../../utils/serialize.interceptor';
import { AlumniCardDto } from './dto/alumni-card.dto';

@ApiTags('AlumniCard')
@Controller('alumni-card')
export class AlumniCardController {
  constructor(private readonly alumniCardService: AlumniCardService) {}

  @Post()
  @Serialize(AlumniCardDto)
  create(@Body() createAlumniCardDto: CreateAlumniCardDto) {
    return this.alumniCardService.create(createAlumniCardDto);
  }

  @Get()
  findAllRequested() {
    return this.alumniCardService.findAllRequested();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.alumniCardService.findOne(id);
  }

  @Post('approve/:id')
  approve(@Param('id', ParseIntPipe) id: number) {
    return this.alumniCardService.approve(id);
  }
}
