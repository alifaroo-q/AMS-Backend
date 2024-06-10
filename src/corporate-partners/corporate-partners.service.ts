import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCorporatePartnerDto } from './dto/create-corporate-partner.dto';
import { UpdateCorporatePartnerDto } from './dto/update-corporate-partner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CorporatePartner } from './entities/corporate-partner.entity';
import { Repository } from 'typeorm';
import * as path from 'path';
import { constants } from '../../utils/constants';
import * as fs from 'fs';

@Injectable()
export class CorporatePartnersService {
  constructor(
    @InjectRepository(CorporatePartner)
    private readonly corporatePartnerRepository: Repository<CorporatePartner>,
  ) {}

  async create(
    createCorporatePartnerDto: CreateCorporatePartnerDto,
    image: Express.Multer.File,
  ) {
    const corporatePartner = this.corporatePartnerRepository.create({
      ...createCorporatePartnerDto,
      image: image.filename,
    });

    return await this.corporatePartnerRepository.save(corporatePartner);
  }

  async findAll() {
    return await this.corporatePartnerRepository.find();
  }

  async findOne(id: number) {
    const corporatePartner = await this.corporatePartnerRepository.findOneBy({
      id,
    });

    if (!corporatePartner)
      throw new NotFoundException(
        `corporate partner with id '${id}' not found`,
      );

    return corporatePartner;
  }

  async update(
    id: number,
    updateCorporatePartnerDto: UpdateCorporatePartnerDto,
    image: Express.Multer.File,
  ) {
    const corporatePartner = await this.corporatePartnerRepository.findOneBy({
      id,
    });

    if (!corporatePartner)
      throw new NotFoundException(
        `Corporate partner with id '${id}' not found`,
      );

    const corporatePartnerImagePath = path.join(
      constants.CORPORATE_PARTNER_UPLOAD_LOCATION,
      corporatePartner.image,
    );

    if (image) {
      if (fs.existsSync(corporatePartnerImagePath)) {
        fs.unlink(corporatePartnerImagePath, function (err) {
          if (err) console.log(err);
        });
      }

      return this.corporatePartnerRepository.update(id, {
        ...updateCorporatePartnerDto,
        image: image.filename,
      });
    }

    return this.corporatePartnerRepository.update(id, {
      ...updateCorporatePartnerDto,
    });
  }

  async remove(id: number) {
    const corporatePartner = await this.corporatePartnerRepository.findOneBy({
      id,
    });

    if (!corporatePartner)
      throw new NotFoundException(
        `Corporate partner with id '${id}' not found`,
      );

    const corporatePartnerImage = path.join(
      constants.CORPORATE_PARTNER_UPLOAD_LOCATION,
      corporatePartner.image,
    );

    if (fs.existsSync(corporatePartnerImage))
      fs.unlink(corporatePartnerImage, function (err) {
        if (err) console.log(err);
      });

    return await this.corporatePartnerRepository.delete({ id });
  }
}
