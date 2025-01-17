import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JobDto } from './dto/job.dto';
import { Job } from './entities/job.entity';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IAuthUser } from '../auth/types/auth-user.type';
import { AuthUser } from '../auth/decorator/user.decorator';
import { Serialize } from '../../utils/serialize.interceptor';
import { SerializeAll } from '../../utils/serialize-all.interceptor';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({ description: 'Job Created', type: Job })
  @Serialize(JobDto)
  create(
    @Body() createJobDto: CreateJobDto,
    @AuthUser() currentUser: IAuthUser,
  ) {
    return this.jobsService.create(createJobDto, currentUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/approve')
  @Serialize(JobDto)
  approve(
    @Body('id', ParseIntPipe) id: number,
    @AuthUser() currentUser: IAuthUser,
  ) {
    return this.jobsService.approve(currentUser, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/apply/:jobId')
  applyForJob(
    @Param('jobId', ParseIntPipe) jobId: number,
    @AuthUser() currentUser: IAuthUser,
  ) {
    return this.jobsService.applyForJob(jobId, currentUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/applied')
  findAppliedJobs(@AuthUser() currentUser: IAuthUser) {
    return this.jobsService.findAppliedJobs(currentUser);
  }

  @Get()
  @SerializeAll(JobDto)
  @ApiOkResponse({
    description: 'All Jobs',
    type: [Job],
  })
  findAll() {
    return this.jobsService.findAll();
  }

  @Get('/unapproved')
  @SerializeAll(JobDto)
  @ApiOkResponse({
    description: 'All unapproved jobs',
    type: [Job],
  })
  findAllUnApproved() {
    return this.jobsService.findAllUnApproved();
  }

  @Get(':id')
  @Serialize(JobDto)
  @ApiOkResponse({ description: 'Job with provided id', type: Job })
  @ApiNotFoundResponse({ description: 'Job with provided id not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jobsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiCreatedResponse({ description: 'Job with provided id updated' })
  @ApiForbiddenResponse({ description: 'User not authorized to update jobs' })
  @ApiNotFoundResponse({
    description: 'Job with provided Id not found, update failed',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJobDto: UpdateJobDto,
    @AuthUser() currentUser: IAuthUser,
  ) {
    return this.jobsService.update(id, updateJobDto, currentUser);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({ description: 'Job with provided id deleted' })
  @ApiForbiddenResponse({ description: 'User not authorized to delete jobs' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() currentUser: IAuthUser,
  ) {
    return this.jobsService.remove(id, currentUser);
  }
}
