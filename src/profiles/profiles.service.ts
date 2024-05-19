import {
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
    if (!user)
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    else if (user.profile != null) {
      throw new HttpException(
        'User Profile Previously Exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const createProfile = this.profileRepository.create(createProfileDto);
    createProfile.user = user;
    //const errors = await validate(createProfile);
    //if (errors.length > 0)
    // throw new HttpException(
    //   'Validation failed!',
    //   HttpStatus.EXPECTATION_FAILED,
    // );
    return this.profileRepository.save(createProfile);
  }

  findAll() {
    return this.profileRepository.find();
  }

  async findAllforUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return this.profileRepository.findOne({
      where: {
        user: {
          id,
        },
      },
    });
  }

  findOne(id: number) {
    return this.profileRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return this.profileRepository.update(id, updateProfileDto);
  }

  remove(id: number) {
    return this.profileRepository.delete(id);
  }

  async updateResume(id: number, file: Express.Multer.File) {
    return this.profileRepository.update({ id }, { resume: file.filename });
  }
}
