import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateAcademicDto } from './dto/create-academic.dto';
import { UpdateAcademicDto } from './dto/update-academic.dto';
import { Academic } from './entities/academic.entity';

@Injectable()
export class AcademicsService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Academic)
    private academicsRepository: Repository<Academic>,
  ) {}

  async create(id: number, createAcademicDto: CreateAcademicDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    const newAcademics = this.academicsRepository.create({
      ...createAcademicDto,
      createdAt: new Date(),
      updatedAt: new Date(),
      user,
    });
    return this.academicsRepository.save(newAcademics);
  }

  findAll() {
    return this.academicsRepository.find();
  }

  async findAllforUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return this.academicsRepository.find({
      where: {
        user: {
          id,
        },
      },
    });
  }

  findOne(id: number) {
    return this.academicsRepository.findOneBy({ id });
  }

  update(id: number, updateAcademicDto: UpdateAcademicDto) {
    return this.academicsRepository.update(id, {
      ...updateAcademicDto,
      updatedAt: new Date(),
    });
  }

  remove(id: number) {
    return this.academicsRepository.delete(id);
  }

  async updateCertificate(id: number, file: Express.Multer.File) {
    return this.academicsRepository.update(
      { id },
      { certificate: file.filename, has_certificate: true },
    );
  }

  async findAcademicsWithUser(id: number) {
    let academics = await this.academicsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    return academics;
  }
}
