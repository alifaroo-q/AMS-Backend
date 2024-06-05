import { Injectable } from '@nestjs/common';
import { CreateCorporatePartnerDto } from './dto/create-corporate-partner.dto';
import { UpdateCorporatePartnerDto } from './dto/update-corporate-partner.dto';

@Injectable()
export class CorporatePartnersService {
  create(createCorporatePartnerDto: CreateCorporatePartnerDto) {
    return 'This action adds a new corporatePartner';
  }

  findAll() {
    return `This action returns all corporatePartners`;
  }

  findOne(id: number) {
    return `This action returns a #${id} corporatePartner`;
  }

  update(id: number, updateCorporatePartnerDto: UpdateCorporatePartnerDto) {
    return `This action updates a #${id} corporatePartner`;
  }

  remove(id: number) {
    return `This action removes a #${id} corporatePartner`;
  }
}
