import { PartialType } from '@nestjs/swagger';
import { CreateCorporatePartnerDto } from './create-corporate-partner.dto';

export class UpdateCorporatePartnerDto extends PartialType(
  CreateCorporatePartnerDto,
) {}
