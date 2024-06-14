import { CreateTestimonialDto } from './create-testimonial.dto';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateTestimonialDto extends OmitType(CreateTestimonialDto, [
  'userId',
]) {}
