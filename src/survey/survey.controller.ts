import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Survey } from './entities/survey.entity';

@ApiTags('Survey')
@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post(':userId')
  @ApiCreatedResponse({ description: 'Survey Created', type: Survey })
  @ApiBadRequestResponse({ description: 'Survey Creation Failed' })
  create(
    @Param('userId') userId: string,
    @Body() createSurveyDto: CreateSurveyDto,
  ) {
    return this.surveyService.create(+userId, createSurveyDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'All Survey',
    type: [Survey],
  })
  findAll() {
    return this.surveyService.findAll();
  }

  @Get('user/:userId')
  @ApiOkResponse({
    description: 'Survey for a User',
    type: [Survey],
  })
  findAllforUser(@Param('userId') id: string) {
    return this.surveyService.findAllforUser(+id);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Survey by Id', type: Survey })
  @ApiBadRequestResponse({ description: 'Survey Not Found' })
  findOne(@Param('id') id: string) {
    return this.surveyService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ description: 'Survey Update' })
  @ApiBadRequestResponse({ description: 'Survey Update Failed' })
  update(@Param('id') id: string, @Body() updateSurveyDto: UpdateSurveyDto) {
    return this.surveyService.update(+id, updateSurveyDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Survey Deleted',
  })
  remove(@Param('id') id: string) {
    return this.surveyService.remove(+id);
  }
}
