import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import FilesHelper from 'files/FilesHelper';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Skill) private skillRepository: Repository<Skill>,
    private fileHelper: FilesHelper,
  ) {}

  async create(id: number, createSkillDto: CreateSkillDto) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new BadRequestException('User not found');

    const newSkill = this.skillRepository.create({ ...createSkillDto, user });
    return await this.skillRepository.save(newSkill);
  }

  async findAll() {
    return await this.skillRepository.find();
  }

  async findForUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new BadRequestException('User not found');

    return await this.skillRepository.find({
      where: {
        user: {
          id,
        },
      },
    });
  }

  async findOne(id: number) {
    const skill = await this.skillRepository.findOneBy({ id });
    if (!skill) throw new BadRequestException('Skill not found');
    return skill;
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    return await this.skillRepository.update({ id }, updateSkillDto);
  }

  async remove(id: number) {
    const deletedSkill = await this.skillRepository.delete({ id });
    if (!deletedSkill.affected)
      throw new BadRequestException('Skill not found');
    return deletedSkill;
  }

  async updateCertificate(id: number, file: Express.Multer.File) {
    return await this.skillRepository.update(
      { id },
      { certificate: file.filename, has_certificate: true },
    );
  }

  async findWithUser(id: number) {
    return await this.skillRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }
}
