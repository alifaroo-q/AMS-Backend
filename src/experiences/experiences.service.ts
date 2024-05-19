import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { Experience } from './entities/experience.entity';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Experience)
    private experienceRepository: Repository<Experience>,
  ) {}

  async create(userId: number, createExperienceDto: CreateExperienceDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { profile: true, skills: true },
    });
    if (!user)
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    const newExp = this.experienceRepository.create({
      ...createExperienceDto,
      user,
    });
    return this.experienceRepository.save(newExp);
  }

  findAll() {
    return this.experienceRepository.find();
  }

  async findAllforUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return this.experienceRepository.find({
      where: {
        user: {
          id,
        },
      },
    });
  }

  findOne(id: number) {
    return this.experienceRepository.findOneBy({ id });
  }

  update(id: number, updateExperienceDto: UpdateExperienceDto) {
    return this.experienceRepository.update(id, updateExperienceDto);
  }

  remove(id: number) {
    return this.experienceRepository.delete(id);
  }
}
