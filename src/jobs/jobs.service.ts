import { Injectable, NotFoundException } from '@nestjs/common';
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

  async approve(currentUser: IAuthUser, jobId: number) {
    const job = await this.jobRepository.findOneBy({ id: jobId });

    if (!job)
      throw new NotFoundException(
        `Cannot find job with provided id '${jobId}'`,
      );

    if (job.isApproved) return job;
    const user = await this.userRepository.findOneBy({ id: currentUser.id });

    if (user.role === RolesEnum.Admin) job.isApproved = true;
    return this.jobRepository.save(job);
  }

  async findAll() {
    return await this.jobRepository.find();
  }

  async findAllUnApproved() {
    return await this.jobRepository.find({ where: { isApproved: false } });
  }

  async findOne(id: number) {
    const job = await this.jobRepository.findOneBy({ id });
    if (!job) throw new NotFoundException(`Job with id '${id}' not found`);
    return job;
  }

  update(id: number, updateJobDto: UpdateJobDto, currentUser: IAuthUser) {
    return updateJobDto;
  }

  remove(id: number, currentUser: IAuthUser) {
    return `This action removes a #${id} job`;
  }
}
