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
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CorporatePartner } from './entities/corporate-partner.entity';

@ApiTags('Corporate Partners')
@Controller('corporate-partners')
export class CorporatePartnersController {
  constructor(
    private readonly corporatePartnersService: CorporatePartnersService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Corporate partner created',
    type: CorporatePartner,
  })
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

  @ApiOkResponse({
    description: 'All corporate partners',
    type: [CorporatePartner],
  })
  @Get()
  findAll() {
    return this.corporatePartnersService.findAll();
  }

  @ApiOkResponse({
    description: 'Corporate partner with provided id',
    type: [CorporatePartner],
  })
  @ApiNotFoundResponse({
    description: 'Corporate partner with provided id not found',
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.corporatePartnersService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({
    description: 'Corporate partner with provided id updated',
  })
  @ApiNotFoundResponse({
    description: 'Corporate partner with provided Id not found, update failed',
  })
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
  @ApiOkResponse({ description: 'Corporate partner with provided id deleted' })
  @ApiNotFoundResponse({
    description: 'Corporate partner with provided id not found, update failed',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.corporatePartnersService.remove(id);
  }
}
