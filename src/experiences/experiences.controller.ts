import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Experience } from './entities/experience.entity';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { ExperiencesService } from './experiences.service';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@ApiTags('Experiences')
@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Post(':userId')
  @ApiCreatedResponse({
    description: 'Experience Registered',
    type: Experience,
  })
  @ApiBadRequestResponse({ description: 'Experience Registration Failed' })
  create(
    @Param('userId', ParseIntPipe) id: number,
    @Body() createExperienceDto: CreateExperienceDto,
  ) {
    return this.experiencesService.create(id, createExperienceDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'All Experience',
    type: [Experience],
  })
  findAll() {
    return this.experiencesService.findAll();
  }

  @Get('user/:userId')
  @ApiOkResponse({
    description: 'All Experience for a User',
    type: [Experience],
  })
  findAllForUser(@Param('userId', ParseIntPipe) id: number) {
    return this.experiencesService.findAllForUser(id);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Experience by Id', type: Experience })
  @ApiBadRequestResponse({ description: 'Exp Not Found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.experiencesService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ description: 'Experience Update' })
  @ApiBadRequestResponse({ description: 'Experience Update Failed' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    return this.experiencesService.update(id, updateExperienceDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Experience Deleted',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.experiencesService.remove(id);
  }
}
