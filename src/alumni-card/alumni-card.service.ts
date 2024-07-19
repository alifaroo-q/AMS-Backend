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
import { MailService } from '../mail/mail.service';

@Injectable()
export class AlumniCardService {
  constructor(
    @InjectRepository(AlumniCard)
    private readonly alumniCardRepository: Repository<AlumniCard>,
    private readonly mailService: MailService,
  ) {}

  async requestAlumniCard(createAlumniCardDto: CreateAlumniCardDto) {
    const alumniCard = await this.alumniCardRepository.findOne({
      where: { user: { id: createAlumniCardDto.userId } },
    });

    if (alumniCard.isApproved) {
      throw new BadRequestException(
        'Alumni card is approved, collect it from alumni department',
      );
    }

    if (alumniCard.isRequested) {
      throw new UnprocessableEntityException(
        'Alumni card is already requested',
      );
    }

    alumniCard.isRequested = true;

    return await this.alumniCardRepository.save(alumniCard);
  }

  async findOne(id: number) {
    const alumniCard = await this.alumniCardRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!alumniCard)
      throw new NotFoundException(`Alumni card with id '${id}' not found`);

    return alumniCard;
  }

  async findAllRequested() {
    return await this.alumniCardRepository.find({
      where: { isRequested: true },
      relations: { user: true },
    });
  }

  async findByUser(userId: number) {
    const alumniCard = await this.alumniCardRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!alumniCard)
      throw new NotFoundException(
        `Alumni card with userId '${userId}' not found`,
      );

    return alumniCard;
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
