import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Experience } from './entities/experience.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Experience)
    private experienceRepository: Repository<Experience>,
  ) {}

  async create(id: number, createExperienceDto: CreateExperienceDto) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) throw new BadRequestException('User Not Found');

    const newExp = this.experienceRepository.create({
      ...createExperienceDto,
      user,
    });

    return await this.experienceRepository.save(newExp);
  }

  async findAll() {
    return await this.experienceRepository.find();
  }

  async findAllForUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new BadRequestException('User not found');

    return await this.experienceRepository.find({
      where: {
        user: {
          id,
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.experienceRepository.findOneBy({ id });
  }

  async update(id: number, updateExperienceDto: UpdateExperienceDto) {
    return await this.experienceRepository.update(id, updateExperienceDto);
  }

  async remove(id: number) {
    return await this.experienceRepository.delete(id);
  }
}
