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
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../auth/decorator/user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IAuthUser } from '../auth/types/auth-user.type';
import { Serialize } from '../../utils/serialize.interceptor';
import { JobDto } from './dto/job.dto';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @Serialize(JobDto)
  create(
    @Body() createJobDto: CreateJobDto,
    @AuthUser() currentUser: IAuthUser,
  ) {
    return this.jobsService.create(createJobDto, currentUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/approve')
  approve(
    @Body('id', ParseIntPipe) id: number,
    @AuthUser() currentUser: IAuthUser,
  ) {
    return this.jobsService.approve(currentUser, id);
  }

  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @Get('/unapproved')
  findAllUnApproved() {
    return this.jobsService.findAllUnApproved();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jobsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJobDto: UpdateJobDto,
    @AuthUser() currentUser: IAuthUser,
  ) {
    return this.jobsService.update(id, updateJobDto, currentUser);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() currentUser: IAuthUser,
  ) {
    return this.jobsService.remove(id, currentUser);
  }
}
