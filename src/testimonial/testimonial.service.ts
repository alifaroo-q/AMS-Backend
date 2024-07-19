import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/users.entity';
import { Repository } from 'typeorm';
import { Testimonial } from './entities/testimonial.entity';
import { Registration } from '../registrations/entities/registration.entity';

@Injectable()
export class TestimonialService {
  constructor(
    @InjectRepository(Testimonial)
    private readonly testimonialRepository: Repository<Testimonial>,
    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create({ userId, testimony }: CreateTestimonialDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { experiences: true, testimony: true },
    });

    if (!user)
      throw new NotFoundException(`User with id '${userId}' not found`);

    if (user.testimony)
      throw new BadRequestException('User can only have one testimony');

    if (
      !(
        user.experiences.length &&
        user.experiences[0].company &&
        user.experiences[0].designation
      )
    ) {
      throw new BadRequestException(
        'User must have at least one work experience before adding testimony',
      );
    }

    const registration = await this.registrationRepository.findOneBy({
      uni_email: user.uni_email,
    });

    const newTestimony = this.testimonialRepository.create({
      avatar: user.avatar,
      class_year: registration.graduation_time.getFullYear(),
      company: user.experiences[0].company,
      department: registration.area,
      designation: user.experiences[0].designation,
      first_name: user.first_name,
      last_name: user.last_name,
      middle_name: user.middle_name,
      testimony,
      user,
    });

    return await this.testimonialRepository.save(newTestimony);
  }

  async findAll() {
    return await this.testimonialRepository.find({ relations: { user: true } });
  }

  async findOne(id: number) {
    const testimony = await this.testimonialRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!testimony)
      throw new NotFoundException(`Testimony with id '${id}' not found`);

    return testimony;
  }

  async update(id: number, updateTestimonialDto: UpdateTestimonialDto) {
    const testimony = await this.testimonialRepository.update(
      id,
      updateTestimonialDto,
    );

    if (testimony.affected) return testimony;
    throw new NotFoundException(`Testimony with id '${id}' not found`);
  }

  async remove(id: number) {
    const testimony = await this.testimonialRepository.delete(id);
    if (testimony.affected) return testimony;
    throw new NotFoundException(`Testimony with id '${id}' not found`);
  }
}
