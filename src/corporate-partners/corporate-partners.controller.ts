import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CorporatePartnersService } from './corporate-partners.service';
import { CreateCorporatePartnerDto } from './dto/create-corporate-partner.dto';
import { UpdateCorporatePartnerDto } from './dto/update-corporate-partner.dto';

@Controller('corporate-partners')
export class CorporatePartnersController {
  constructor(
    private readonly corporatePartnersService: CorporatePartnersService,
  ) {}

  @Post()
  create(@Body() createCorporatePartnerDto: CreateCorporatePartnerDto) {
    return this.corporatePartnersService.create(createCorporatePartnerDto);
  }

  @Get()
  findAll() {
    return this.corporatePartnersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.corporatePartnersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCorporatePartnerDto: UpdateCorporatePartnerDto,
  ) {
    return this.corporatePartnersService.update(+id, updateCorporatePartnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.corporatePartnersService.remove(+id);
  }
}
