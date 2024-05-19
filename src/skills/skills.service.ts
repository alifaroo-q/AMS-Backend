import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import FilesHelper from 'files/FilesHelper';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';
import { constants } from 'utils/constants';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Skill) private skillRepository: Repository<Skill>,
    private fileHelper: FilesHelper,
  ) {}

  async create(id: number, createSkillDto: CreateSkillDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    const newSkill = this.skillRepository.create({ ...createSkillDto, user });
    return this.skillRepository.save(newSkill);
  }

  findAll() {
    return this.skillRepository.find();
  }

  async findAllforUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return this.skillRepository.find({
      where: {
        user: {
          id,
        },
      },
    });
  }

  async findOne(id: number) {
    const skill = await this.skillRepository.findOneBy({ id });
    if (!skill)
      throw new HttpException('Skill not found', HttpStatus.BAD_REQUEST);
    return skill;
  }

  update(id: number, updateSkillDto: UpdateSkillDto) {
    return this.skillRepository.update({ id }, { ...updateSkillDto });
  }

  async remove(id: number) {
    const delUser = await this.skillRepository.delete({ id });
    if (!delUser.affected)
      throw new HttpException('Skill not found', HttpStatus.BAD_REQUEST);
    return delUser;
  }

  async updateCertificate(id: number, file: Express.Multer.File) {
    return this.skillRepository.update(
      { id },
      { certificate: file.filename, has_certificate: true },
    );
  }

  async findSkillWithUser(id: number) {
    let skill = await this.skillRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    return skill;
  }
}
