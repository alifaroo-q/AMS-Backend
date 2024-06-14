import { Module } from '@nestjs/common';
import { TestimonialService } from './testimonial.service';
import { TestimonialController } from './testimonial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Testimonial } from './entities/testimonial.entity';
import { Registration } from '../registrations/entities/registration.entity';
import { User } from '../users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Testimonial, Registration, User])],
  controllers: [TestimonialController],
  providers: [TestimonialService],
})
export class TestimonialModule {}
