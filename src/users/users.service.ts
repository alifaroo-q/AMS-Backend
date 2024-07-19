import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import FilesHelper from 'files/FilesHelper';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Repository } from 'typeorm';
import { UpdateUserParams } from 'utils/types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { User } from './entities/users.entity';
import { ChangePasswordDto } from './dto/change-password.dto';
import { constants } from '../../utils/constants';
import * as path from 'path';
import { Registration } from '../registrations/entities/registration.entity';
import { AlumniCard } from '../alumni-card/entities/alumni-card.entity';

enum RolesEnum {
  'Admin' = 1,
  'User' = 2,
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(AlumniCard)
    private alumniCardRepository: Repository<AlumniCard>,
    @InjectRepository(Registration)
    private registrationRepository: Repository<Registration>,
    private fileHelper: FilesHelper,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...createUserDto,
      role: RolesEnum.User,
    });

    const createdUser = await this.userRepository.save(newUser);

    const newProfile = this.profileRepository.create({
      user: createdUser,
      country: 'Pakistan',
      timezone: 'Karachi',
    });

    const newAlumniCard = this.alumniCardRepository.create({
      user: createdUser,
    });

    await this.alumniCardRepository.save(newAlumniCard);
    await this.profileRepository.save(newProfile);

    if (!this.fileHelper.createAlumniFolder(createdUser))
      throw new ForbiddenException(
        'Something Went Wrong - Folder Write failed!',
      );

    return createdUser;
  }

  async createAdmin(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...createUserDto,
      role: RolesEnum.Admin,
    });

    const createdUser = await this.userRepository.save(newUser);

    if (!this.fileHelper.createAlumniFolder(createdUser))
      throw new ForbiddenException(
        'Something Went Wrong - Folder Write failed!',
      );

    return createdUser;
  }

  async alumniForDirectory() {
    const allAlumni = await this.userRepository.find({
      where: { role: 2 },
      relations: {
        experiences: true,
        academics: true,
        profile: true,
        jobs: true,
      },
    });

    return allAlumni.map((alumni) => {
      return {
        id: alumni.id,
        first_name: alumni.first_name,
        middle_name: alumni.middle_name,
        last_name: alumni.last_name,
        uni_email: alumni.uni_email,
        email: alumni.email,
        phone: alumni.phone,
        noOfJobsPosted: alumni.jobs.length ? alumni.jobs.length : 0,
        company: alumni.experiences.length ? alumni.experiences[0].company : '',
        designation: alumni.experiences.length
          ? alumni.experiences[0].designation
          : '',
        qualification: alumni.academics.length
          ? alumni.academics[0].qualification
          : '',
        date_of_birth: alumni.profile.date_of_birth,
        avatar: alumni.avatar,
      };
    });
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

  async changePassword(userId: number, changePasswordDto: ChangePasswordDto) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user)
      throw new BadRequestException(`User not found with id '${userId}'`);

    if (user.password !== changePasswordDto.currentPassword) {
      throw new UnauthorizedException(`Wrong password provided, try again`);
    }

    return await this.userRepository.update(userId, {
      password: changePasswordDto.newPassword,
    });
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

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user)
      throw new NotFoundException(`User with provided id '${id}' not found`);

    if (user.role === 2) {
      const registration = await this.registrationRepository.findOneBy({
        uni_email: user.uni_email,
      });

      registration.uni_token = null;
      registration.email_token = null;
      registration.email_sent = 0;
      registration.uni_email_sent = 0;
      registration.email_verified = false;
      registration.uni_verified = false;
      registration.step = 0;

      await this.registrationRepository.save(registration);
    }

    const files = path.join(constants.UPLOAD_LOCATION, String(id));
    this.fileHelper.removeFolderOrFile(files);

    return this.userRepository.delete({ id });
  }
}
