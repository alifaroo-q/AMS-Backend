import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import FilesHelper from 'files/FilesHelper';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Repository } from 'typeorm';
import { CreateUserParams, UpdateUserParams } from 'utils/types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { User } from './entities/users.entity';

enum RolesEnum {
  'Admin' = 1,
  'User' = 2,
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private fileHelper: FilesHelper,
  ) {}

  async create(userDetails: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...userDetails,
      role: RolesEnum.User,
    });

    const createdUser = await this.userRepository.save(newUser);

    if (!this.fileHelper.createAlumniFolder(createdUser))
      throw new ForbiddenException(
        'Something Went Wrong - Folder Write failed!',
      );

    return createdUser;
  }

  findAll() {
    return this.userRepository.find({ relations: ['profile'] });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) throw new BadRequestException('User not found');
    return user;
  }

  async findOneWithSkills(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['skills'],
    });

    if (!user) throw new BadRequestException('User not found');
    return user;
  }

  async findOneWithAcademics(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['academics'],
    });

    if (!user) throw new BadRequestException('User not found');
    return user;
  }

  async findOneWithExperiences(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['experiences'],
    });

    if (!user) throw new BadRequestException('User not found');
    return user;
  }

  async findOneWithSurvey(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['survey'],
    });

    if (!user) throw new BadRequestException('User not found');
    return user;
  }

  async findOneWithProfile(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });

    if (!user) throw new BadRequestException('User not found');
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user)
      throw new BadRequestException(`User not found with email '${email}'`);

    return user;
  }

  async findByToken(token: string) {
    const user = await this.userRepository.findOneBy({
      password_reset_token: token,
    });

    if (!user)
      throw new BadRequestException(`User not found with token '${token}'`);

    return user;
  }

  async findByUniEmail(uni_email: string) {
    const user = await this.userRepository.findOneBy({ uni_email });
    if (!user)
      throw new BadRequestException(`User not found with email '${uni_email}'`);

    return user;
  }

  update(id: number, userDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...userDetails });
  }

  async updateWithProfile(
    id: number,
    userProfileDetails: UpdateUserProfileDto,
  ) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });

    if (!user.profile)
      throw new BadRequestException(
        'Please create a profile before updating it',
      );

    if (userProfileDetails.email) {
      const emailUser = await this.userRepository.findOneBy({
        email: userProfileDetails.email,
      });

      if (emailUser && emailUser.id !== user.id)
        throw new BadRequestException(
          `User found with email: ${userProfileDetails.email}`,
        );
    }

    if (userProfileDetails.uni_email) {
      const uniEmailUser = await this.userRepository.findOneBy({
        uni_email: userProfileDetails.uni_email,
      });

      if (uniEmailUser && uniEmailUser.id !== user.id)
        throw new BadRequestException(
          `User found with uni email: ${userProfileDetails.uni_email}`,
        );
    }

    if (userProfileDetails.phone) {
      const phoneUser = await this.userRepository.findOneBy({
        phone: userProfileDetails.phone,
      });

      if (phoneUser && phoneUser.id !== user.id)
        throw new BadRequestException(
          `User found with phone: ${userProfileDetails.phone}`,
        );
    }

    const { date_of_birth, country, timezone, ...more } = userProfileDetails;

    await this.profileRepository.update(user.profile.id, {
      date_of_birth,
      country,
      timezone,
    });

    return this.userRepository.update({ id }, { ...more });
  }

  updatePassword(id: number, password: string) {
    return this.userRepository.update(
      { id },
      { password, password_reset_token: null },
    );
  }

  updatePasswordToken(id: number, password_reset_token: string) {
    return this.userRepository.update({ id }, { password_reset_token });
  }

  async updateAvatar(id: number, file: Express.Multer.File) {
    return this.userRepository.update({ id }, { avatar: file.filename });
  }

  remove(id: number) {
    return this.userRepository.delete({ id });
  }
}
