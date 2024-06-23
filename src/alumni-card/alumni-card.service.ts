import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAlumniCardDto } from './dto/create-alumni-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AlumniCard } from './entities/alumni-card.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/users.entity';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AlumniCardService {
  constructor(
    @InjectRepository(AlumniCard)
    private readonly alumniCardRepository: Repository<AlumniCard>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,
  ) {}

  async create(createAlumniCardDto: CreateAlumniCardDto) {
    const user = await this.userRepository.findOne({
      where: { id: createAlumniCardDto.userId },
      relations: { alumni_card: true },
    });

    if (user.alumni_card && user.alumni_card.isApproved) {
      throw new BadRequestException(
        'Alumni card is approved, collect it from alumni department',
      );
    }

    if (user.alumni_card && user.alumni_card.isRequested) {
      throw new UnprocessableEntityException(
        'Alumni card is already requested',
      );
    }

    const alumniCard = this.alumniCardRepository.create({
      user,
      isRequested: true,
    });

    return await this.alumniCardRepository.save(alumniCard);
  }

  async findOne(id: number) {
    const alumniCard = await this.alumniCardRepository.findOneBy({ id });
    if (!alumniCard)
      throw new NotFoundException(`Alumni card with id '${id}' not found`);
    return alumniCard;
  }

  async findAllRequested() {
    return await this.alumniCardRepository.find({
      where: { isRequested: true },
    });
  }

  async approve(id: number) {
    const alumniCard = await this.alumniCardRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!alumniCard)
      throw new NotFoundException(`Alumni card with id '${id}' not found`);

    if (alumniCard.isApproved)
      throw new BadRequestException(
        'Alumni card is approved, collect it from alumni department',
      );

    alumniCard.isApproved = true;
    await this.mailService.sendAlumniCardApprovalEmail(alumniCard.user.email);

    return await this.alumniCardRepository.save(alumniCard);
  }
}
