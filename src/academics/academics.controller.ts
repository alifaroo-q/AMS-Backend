import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ParseIntPipe,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { constants } from '../../utils/constants';
import { Academic } from './entities/academic.entity';
import { AcademicsService } from './academics.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAcademicDto } from './dto/create-academic.dto';
import { UpdateAcademicDto } from './dto/update-academic.dto';
import { MulterFileUpload } from './academics-doc-upload.multer';
import { AcademicsUserInterceptor } from 'src/academics/academicsUser.interceptor';

@ApiTags('Academics')
@Controller('academics')
export class AcademicsController {
  constructor(private readonly academicsService: AcademicsService) {}

  @Post(':userId')
  @ApiCreatedResponse({
    description: 'Academics Record Created',
    type: Academic,
  })
  @ApiBadRequestResponse({ description: 'Academic Error' })
  create(
    @Body() createAcademicDto: CreateAcademicDto,
    @Param('userId', ParseIntPipe) id: number,
  ) {
    return this.academicsService.create(id, createAcademicDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'All Users with Profile',
    type: [Academic],
  })
  findAll() {
    return this.academicsService.findAll();
  }

  @Get('user/:userId')
  @ApiOkResponse({
    description: 'All Academic for a User',
    type: [Academic],
  })
  findAllWithUser(@Param('userId', ParseIntPipe) id: number) {
    return this.academicsService.findAllWithUser(id);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Academic by Id', type: Academic })
  @ApiBadRequestResponse({ description: 'Academic Not Found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.academicsService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ description: 'Academics Update' })
  @ApiBadRequestResponse({ description: 'Academic Update Failed' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAcademicDto: UpdateAcademicDto,
  ) {
    return this.academicsService.update(id, updateAcademicDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'User Deleted',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.academicsService.remove(id);
  }

  @Post(':id/uploadCertificate')
  @ApiOkResponse({
    description:
      'Certificate Upload Successfully - Request Body: multipart/form-data, Field Name: file',
  })
  @UseInterceptors(
    AcademicsUserInterceptor,
    FileInterceptor(
      'file',
      MulterFileUpload({
        allowedFiles: [
          '.pdf',
          '.doc',
          '.html',
          '.png',
          '.jpeg',
          '.jpg',
          '.docx',
        ],
        uploadLocation: constants.UPLOAD_LOCATION,
      }),
    ),
  )
  uploadFile(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.academicsService.updateCertificate(id, file);
  }
}
