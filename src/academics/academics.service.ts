import { BadRequestException, Injectable } from '@nestjs/common';
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

    if (!user) throw new BadRequestException('User not found');

    const newAcademics = this.academicsRepository.create({
      ...createAcademicDto,
      user,
    });

    return await this.academicsRepository.save(newAcademics);
  }

  async findAll() {
    return await this.academicsRepository.find();
  }

  async findAllWithUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new BadRequestException('User not found');

    return await this.academicsRepository.find({
      where: {
        user: {
          id,
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.academicsRepository.findOne({ where: { id } });
  }

  async findOneWithUser(id: number) {
    return await this.academicsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(id: number, updateAcademicDto: UpdateAcademicDto) {
    return await this.academicsRepository.update(id, {
      ...updateAcademicDto,
    });
  }

  async remove(id: number) {
    return await this.academicsRepository.delete(id);
  }

  async updateCertificate(id: number, file: Express.Multer.File) {
    return await this.academicsRepository.update(
      { id },
      { certificate: file.filename, has_certificate: true },
    );
  }
}
