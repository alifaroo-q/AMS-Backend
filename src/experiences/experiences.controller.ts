import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Experience } from './entities/experience.entity';

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
    @Param('userId') userId: string,
    @Body() createExperienceDto: CreateExperienceDto,
  ) {
    return this.experiencesService.create(+userId, createExperienceDto);
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
  findAllforUser(@Param('userId') id: string) {
    return this.experiencesService.findAllforUser(+id);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Experience by Id', type: Experience })
  @ApiBadRequestResponse({ description: 'Exp Not Found' })
  findOne(@Param('id') id: string) {
    return this.experiencesService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ description: 'Experience Update' })
  @ApiBadRequestResponse({ description: 'Experience Update Failed' })
  update(
    @Param('id') id: string,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    return this.experiencesService.update(+id, updateExperienceDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Experience Deleted',
  })
  remove(@Param('id') id: string) {
    return this.experiencesService.remove(+id);
  }
}
