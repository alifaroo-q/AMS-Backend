import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { IAuthUser } from '../auth/types/auth-user.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/users.entity';

enum RolesEnum {
  'Admin' = 1,
  'User' = 2,
}

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createJobDto: CreateJobDto, currentUser: IAuthUser) {
    const user = await this.userRepository.findOneBy({ id: currentUser.id });

    const job =
      user.role === RolesEnum.Admin
        ? this.jobRepository.create({
            ...createJobDto,
            isApproved: true,
            isCreatedByAdmin: true,
            user,
          })
        : this.jobRepository.create({ ...createJobDto, user });

    return await this.jobRepository.save(job);
  }

  async approve(currentUser: IAuthUser, id: number) {
    if (currentUser.role !== RolesEnum.Admin)
      throw new ForbiddenException('User not authorized to approve jobs');

    const job = await this.jobRepository.findOneBy({ id });

    if (!job)
      throw new NotFoundException(`Cannot find job with provided id '${id}'`);

    if (job.isApproved) return job;

    job.isApproved = true;
    return this.jobRepository.save(job);
  }

  async findAll() {
    return await this.jobRepository.find({ order: { updatedAt: 'DESC' } });
  }

  async findAllUnApproved() {
    return await this.jobRepository.find({
      where: { isApproved: false },
      order: { updatedAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const job = await this.jobRepository.findOneBy({ id });
    if (!job) throw new NotFoundException(`Job with id '${id}' not found`);
    return job;
  }

  async update(id: number, updateJobDto: UpdateJobDto, currentUser: IAuthUser) {
    const job = await this.jobRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!job)
      throw new NotFoundException(`Cannot find job with provided id '${id}'`);

    if (currentUser.role === RolesEnum.Admin || currentUser.id === job.user.id)
      return await this.jobRepository.update(id, updateJobDto);

    throw new ForbiddenException('User not authorized to update jobs');
  }

  async remove(id: number, currentUser: IAuthUser) {
    const job = await this.jobRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!job)
      throw new NotFoundException(`Cannot find job with provided id '${id}'`);

    if (currentUser.role === RolesEnum.Admin || currentUser.id === job.user.id)
      return await this.jobRepository.delete(id);

    throw new ForbiddenException('User not authorized to delete jobs');
  }
}
