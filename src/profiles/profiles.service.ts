import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { profile } from 'console';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  async create(userId: number, createProfileDto: CreateProfileDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { profile: true },
    });

    if (!user) throw new BadRequestException('User Not Found');
    else if (user.profile != null) {
      throw new BadRequestException('User Profile Previously Exists');
    }

    const newProfile = this.profileRepository.create(createProfileDto);
    newProfile.user = user;

    return await this.profileRepository.save(newProfile);
  }

  async findAll() {
    return await this.profileRepository.find();
  }

  async findForUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new BadRequestException('User not found');

    return await this.profileRepository.findOne({
      where: {
        user: {
          id,
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.profileRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    return await this.profileRepository.update(id, updateProfileDto);
  }

  async remove(id: number) {
    return await this.profileRepository.delete(id);
  }

  async updateResume(id: number, file: Express.Multer.File) {
    return this.profileRepository.update({ id }, { resume: file.filename });
  }
}
