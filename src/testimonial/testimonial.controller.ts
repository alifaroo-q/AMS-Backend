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
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { TestimonialDto } from './dto/testimonial.dto';
import { TestimonialService } from './testimonial.service';
import { Testimonial } from './entities/testimonial.entity';
import { Serialize } from '../../utils/serialize.interceptor';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';

@ApiTags('Testimonials')
@Controller('testimonial')
export class TestimonialController {
  constructor(private readonly testimonialService: TestimonialService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Testimonial created', type: Testimonial })
  @Serialize(TestimonialDto)
  create(@Body() createTestimonialDto: CreateTestimonialDto) {
    return this.testimonialService.create(createTestimonialDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'All testimonials',
    type: [Testimonial],
  })
  findAll() {
    return this.testimonialService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Testimonial with provided Id',
    type: Testimonial,
  })
  @ApiNotFoundResponse({
    description: 'Testimonial with provided id not found',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.testimonialService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ description: 'Testimonial with provided id updated' })
  @ApiNotFoundResponse({
    description: 'Testimonial with provided Id not found, update failed',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTestimonialDto: UpdateTestimonialDto,
  ) {
    return this.testimonialService.update(id, updateTestimonialDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Testimonial with provided id deleted' })
  @ApiNotFoundResponse({
    description: 'Testimonial with provided id not found, update failed',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.testimonialService.remove(id);
  }
}
