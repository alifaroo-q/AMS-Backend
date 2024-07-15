import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users/entities/users.entity';
import { Repository } from 'typeorm';
import { AlumniDto } from '../utils/alumni.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAllAlumni(): Promise<AlumniDto[]> {
    const alumniAll = await this.userRepository.find({
      relations: { experiences: true },
    });

    return alumniAll.map(
      ({
        id,
        avatar,
        first_name,
        last_name,
        middle_name,
        experiences,
        role,
      }) => {
        return {
          role,
          avatar,
          designation: experiences.length ? experiences[0].designation : '',
          first_name,
          id,
          last_name,
          middle_name,
        };
      },
    );
  }
}
