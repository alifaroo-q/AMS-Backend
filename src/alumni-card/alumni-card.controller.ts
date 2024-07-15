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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Serialize } from '../../utils/serialize.interceptor';
import { AlumniCardDto } from './dto/alumni-card.dto';
import { AlumniCard } from './entities/alumni-card.entity';
import { SerializeAll } from '../../utils/serialize-all.interceptor';

@ApiTags('AlumniCard')
@Controller('alumni-card')
export class AlumniCardController {
  constructor(private readonly alumniCardService: AlumniCardService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'alumni card request created',
    type: AlumniCard,
  })
  @ApiBadRequestResponse({
    description: 'Alumni card is approved, collect it from alumni department',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Alumni card is already requested',
  })
  @Serialize(AlumniCardDto)
  create(@Body() createAlumniCardDto: CreateAlumniCardDto) {
    return this.alumniCardService.create(createAlumniCardDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'All request alumni cards',
    type: [AlumniCard],
  })
  @SerializeAll(AlumniCardDto)
  findAllRequested() {
    return this.alumniCardService.findAllRequested();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Alumni card request with provided id',
    type: [AlumniCard],
  })
  @ApiNotFoundResponse({
    description: 'Alumni card request with provided id not found',
  })
  @Serialize(AlumniCardDto)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.alumniCardService.findOne(id);
  }

  @Post('approve/:id')
  @ApiCreatedResponse({
    description: 'alumni card approved by alumni department',
    type: AlumniCard,
  })
  @ApiBadRequestResponse({
    description: 'Alumni card is approved, collect it from alumni department',
  })
  @ApiNotFoundResponse({
    description: 'Alumni card request with provided id not found',
  })
  @Serialize(AlumniCardDto)
  approve(@Param('id', ParseIntPipe) id: number) {
    return this.alumniCardService.approve(id);
  }
}
