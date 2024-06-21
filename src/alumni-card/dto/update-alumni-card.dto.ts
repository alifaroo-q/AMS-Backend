import { PartialType } from '@nestjs/swagger';
import { CreateAlumniCardDto } from './create-alumni-card.dto';

export class UpdateAlumniCardDto extends PartialType(CreateAlumniCardDto) {}
