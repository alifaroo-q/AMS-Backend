import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import FilesHelper from 'files/FilesHelper';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Repository } from 'typeorm';
import { CreateUserParams, UpdateUserParams } from 'utils/types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { User } from './entities/users.entity';

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
      role: 2,
    });

    // const errors = await validate(newUser);
    // console.log(userDetails);
    // console.log(errors);

    // if (errors.length > 0)
    //   throw new HttpException(
    //     'Validation failed!',
    //     HttpStatus.EXPECTATION_FAILED,
    //   );
    const createdUser = await this.userRepository.save(newUser);
    if (this.fileHelper.createAlumniFolder(createdUser)) return createdUser;
    else
      throw new HttpException(
        'Something Went Wrong - Folder Write failed!',
        HttpStatus.FORBIDDEN,
      );
  }

  findAll() {
    return this.userRepository.find({ relations: ['profile'] });
  }

  async findOne(id: number) {
    //const user = await this.userRepository.findOneBy({ id }); or
    const user = await this.userRepository.findOne({
      where: { id },
      //relations: ['profile', 'skills', 'academics'],
    });
    if (user) return user;
    else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }

  async findOneWithSkills(id: number) {
    //const user = await this.userRepository.findOneBy({ id }); or
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['skills'],
    });
    if (user) return user;
    else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }

  async findOneWithAcademics(id: number) {
    //const user = await this.userRepository.findOneBy({ id }); or
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['academics'],
    });
    if (user) return user;
    else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }

  async findOneWithExperiences(id: number) {
    //const user = await this.userRepository.findOneBy({ id }); or
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['experiences'],
    });
    if (user) return user;
    else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }

  async findOneWithSurvey(id: number) {
    //const user = await this.userRepository.findOneBy({ id }); or
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['survey'],
    });
    if (user) return user;
    else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }

  async findOneWithProfile(id: number) {
    //const user = await this.userRepository.findOneBy({ id }); or
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (user) return user;
    else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user) return user;
    else
      throw new HttpException(
        'User not found with email: ' + email,
        HttpStatus.BAD_REQUEST,
      );
  }

  async findByToken(token: string) {
    const user = await this.userRepository.findOneBy({
      password_reset_token: token,
    });
    if (user) return user;
    else
      throw new HttpException(
        'User not found with token: ' + token,
        HttpStatus.BAD_REQUEST,
      );
  }

  async findByUniEmail(uni_email: string) {
    console.log('Email seaching ..');
    const user = await this.userRepository.findOneBy({ uni_email });
    if (user) return user;
    else
      throw new HttpException(
        'User not found with email: ' + uni_email,
        HttpStatus.BAD_REQUEST,
      );
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
      throw new HttpException(
        'First Create a Profile Befor Updating It: ',
        HttpStatus.BAD_REQUEST,
      );
    if (userProfileDetails.email) {
      const emailUser = await this.userRepository.findOneBy({
        email: userProfileDetails.email,
      });
      if (emailUser && emailUser.id !== user.id)
        // check if email exist and it is not of update user
        throw new HttpException(
          'User found with email: ' + userProfileDetails.email,
          HttpStatus.BAD_REQUEST,
        );
    }
    if (userProfileDetails.uni_email) {
      const uniEmailUser = await this.userRepository.findOneBy({
        uni_email: userProfileDetails.uni_email,
      });
      if (uniEmailUser && uniEmailUser.id !== user.id)
        // check if uni_email exist and it is not of the update user
        throw new HttpException(
          'User found with uni email: ' + userProfileDetails.uni_email,
          HttpStatus.BAD_REQUEST,
        );
    }

    if (userProfileDetails.phone) {
      const phoneUser = await this.userRepository.findOneBy({
        phone: userProfileDetails.phone,
      });
      if (phoneUser && phoneUser.id !== user.id)
        // check if phone exist and it is not of the update user
        throw new HttpException(
          'User found with phone: ' + userProfileDetails.phone,
          HttpStatus.BAD_REQUEST,
        );
    }

    const { date_of_birth, country, timezone, ...more } = userProfileDetails;
    // if (country) user.profile.country = country;
    // if (date_of_birth) user.profile.date_of_birth = date_of_birth;
    // if (timezone) user.profile.timezone = timezone;
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
    // const user = await this.userRepository.findOneBy({ id });
    // if (user && user.avatar != 'default/avatar.jpg') {
    //   const fileSys = new FilesHelper();
    //   fileSys.removeFolderOrFile(constants.UPLOAD_LOCATION + user.avatar);
    // }
    return this.userRepository.update({ id }, { avatar: file.filename });
  }

  remove(id: number) {
    return this.userRepository.delete({ id });
  }

  // doLook(e: string) {
  //   return this.userRepository.findOneBy({ uni_email: e });
  // }
}
