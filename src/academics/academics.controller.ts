import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import FilesHelper from 'files/FilesHelper';
import { diskStorage } from 'multer';
import { parse } from 'path';
import { AcademicsUserInterceptor } from 'utils/academicsUser.interceptor';
import { constants } from 'utils/constants';
import { AcademicsService } from './academics.service';
import { CreateAcademicDto } from './dto/create-academic.dto';
import { UpdateAcademicDto } from './dto/update-academic.dto';
import { Academic } from './entities/academic.entity';

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
    @Param('userId') id: string,
  ) {
    return this.academicsService.create(+id, createAcademicDto);
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
  findAllforUser(@Param('userId') id: string) {
    return this.academicsService.findAllforUser(+id);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Academic by Id', type: Academic })
  @ApiBadRequestResponse({ description: 'Academic Not Found' })
  findOne(@Param('id') id: string) {
    return this.academicsService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ description: 'Academics Update' })
  @ApiBadRequestResponse({ description: 'Academic Update Failed' })
  update(
    @Param('id') id: string,
    @Body() updateAcademicDto: UpdateAcademicDto,
  ) {
    return this.academicsService.update(+id, updateAcademicDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'User Deleted',
  })
  remove(@Param('id') id: string) {
    return this.academicsService.remove(+id);
  }

  @Post(':id/uploadCertificate')
  @ApiOkResponse({
    description:
      'Certificate Upload Successfully - Request Body: multipart/form-data, Field Name: file',
  })
  @UseInterceptors(
    AcademicsUserInterceptor,
    FileInterceptor('file', {
      limits: { fileSize: 4 * 1024 * 1024 },
      fileFilter: (req, file, callback) => {
        const ext = parse(file.originalname).ext;
        if (
          !['.pdf', '.doc', '.html', '.png', '.jpeg', '.jpg', '.docx'].includes(
            ext,
          )
        ) {
          req.fileValidationError = 'Invalid file type';
          return callback(
            new HttpException(
              'Invalid File Type ' + ext,
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
        return callback(null, true);
      },
      storage: diskStorage({
        destination: constants.UPLOAD_LOCATION,
        filename: (req: any, file, cb) => {
          req.userId = req.custom.userId;
          const unique = new Date().getTime();
          const fn = parse(file.originalname);
          const filename = `${req.userId}/academicCertificates/${req.params.id}${fn.ext}`;
          const fileSys = new FilesHelper();
          if (req.custom.certificate)
            fileSys.removeFolderOrFile(
              constants.UPLOAD_LOCATION + req.custom.certificate,
            );
          fileSys.createAlumniAcademicsFolder({ userId: req.userId });
          cb(null, filename);
        },
      }),
    }),
  )
  uploadFile(
    @Param('id', ParseIntPipe) id: string,
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.academicsService.updateCertificate(+id, file);
  }
}
