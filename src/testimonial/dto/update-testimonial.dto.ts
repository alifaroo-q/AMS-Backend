import { CreateTestimonialDto } from './create-testimonial.dto';
import { OmitType } from '@nestjs/swagger';

export class UpdateTestimonialDto extends OmitType(CreateTestimonialDto, [
  'userId',
]) {}
