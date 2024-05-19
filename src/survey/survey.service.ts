import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Survey } from './entities/survey.entity';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Survey) private surveyRepository: Repository<Survey>,
  ) {}

  async create(userId: number, createSurveyDto: CreateSurveyDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { survey: true },
    });
    if (!user)
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    else if (user.survey != null) {
      throw new HttpException(
        'User Survey Previously Exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const createSurvey = this.surveyRepository.create(createSurveyDto);
    createSurvey.user = user;
    return this.surveyRepository.save(createSurvey);
  }

  findAll() {
    return this.surveyRepository.find();
  }

  async findAllforUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return this.surveyRepository.findOne({
      where: {
        user: {
          id,
        },
      },
    });
  }

  findOne(id: number) {
    return this.surveyRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  update(id: number, updateSurveyDto: UpdateSurveyDto) {
    return this.surveyRepository.update(id, updateSurveyDto);
  }

  remove(id: number) {
    return this.surveyRepository.delete(id);
  }
}
