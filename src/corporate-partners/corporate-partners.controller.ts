import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  ParseFilePipe,
  UploadedFile,
  UseFilters,
} from '@nestjs/common';
import { CorporatePartnersService } from './corporate-partners.service';
import { CreateCorporatePartnerDto } from './dto/create-corporate-partner.dto';
import { UpdateCorporatePartnerDto } from './dto/update-corporate-partner.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterFileUpload } from '../../utils/file-upload.multer';
import { constants } from '../../utils/constants';
import { RemoveFileOnFailedValidationFilter } from '../../utils/RemoveFileOnFailedValidation.filter';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Corporate Partners')
@Controller('corporate-partners')
export class CorporatePartnersController {
  constructor(
    private readonly corporatePartnersService: CorporatePartnersService,
  ) {}

  @Post()
  @UseFilters(RemoveFileOnFailedValidationFilter)
  @UseInterceptors(
    FileInterceptor(
      'image',
      MulterFileUpload({
        allowedFiles: ['.png', '.jpg', '.jpeg'],
        uploadLocation: constants.CORPORATE_PARTNER_UPLOAD_LOCATION,
      }),
    ),
  )
  create(
    @Body() createCorporatePartnerDto: CreateCorporatePartnerDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
      }),
    )
    image: Express.Multer.File,
  ) {
    return this.corporatePartnersService.create(
      createCorporatePartnerDto,
      image,
    );
  }

  @Get()
  findAll() {
    return this.corporatePartnersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.corporatePartnersService.findOne(id);
  }

  @Patch(':id')
  @UseFilters(RemoveFileOnFailedValidationFilter)
  @UseInterceptors(
    FileInterceptor(
      'image',
      MulterFileUpload({
        allowedFiles: ['.png', '.jpg', '.jpeg'],
        uploadLocation: constants.CORPORATE_PARTNER_UPLOAD_LOCATION,
      }),
    ),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCorporatePartnerDto: UpdateCorporatePartnerDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
      }),
    )
    image: Express.Multer.File,
  ) {
    return this.corporatePartnersService.update(
      id,
      updateCorporatePartnerDto,
      image,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.corporatePartnersService.remove(id);
  }
}
