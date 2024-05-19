import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete,
  UseInterceptors,
  ParseIntPipe,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Profile } from './entities/profile.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { constants } from 'utils/constants';
import { parse } from 'path';
import FilesHelper from 'files/FilesHelper';
import { ProfileResumeUserInterceptor } from 'utils/profileResumeUser.interceptor';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post(':userId')
  @ApiCreatedResponse({ description: 'Profile Created', type: Profile })
  @ApiBadRequestResponse({ description: 'Profile Creation Failed' })
  create(
    @Param('userId') userId: string,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return this.profilesService.create(+userId, createProfileDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'All Profile',
    type: [Profile],
  })
  findAll() {
    return this.profilesService.findAll();
  }

  @Get('user/:userId')
  @ApiOkResponse({
    description: 'Profile for a User',
    type: [Profile],
  })
  findAllforUser(@Param('userId') id: string) {
    return this.profilesService.findAllforUser(+id);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Profile by Id', type: Profile })
  @ApiBadRequestResponse({ description: 'Profile Not Found' })
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ description: 'Profile Update' })
  @ApiBadRequestResponse({ description: 'Profile Update Failed' })
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Profile Deleted',
  })
  remove(@Param('id') id: string) {
    return this.profilesService.remove(+id);
  }

  @Post(':id/uploadResume')
  @ApiOkResponse({
    description:
      'Resume Upload Successfully - Request Body: multipart/form-data, Field Name: file',
  })
  @UseInterceptors(
    ProfileResumeUserInterceptor,
    FileInterceptor('file', {
      limits: { fileSize: 4 * 1024 * 1024 },
      fileFilter: (req, file, callback) => {
        const ext = parse(file.originalname).ext;
        if (
          !['.pdf', '.doc', '.docx', '.html', '.png', '.jpeg', '.jpg'].includes(
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
          const filename = `${req.userId}/profileResume/${req.params.id}${fn.ext}`;
          const fileSys = new FilesHelper();
          if (req.custom.resume) {
            console.log('deleting folder: Start');
            fileSys.removeFolderOrFile(
              constants.UPLOAD_LOCATION + req.custom.resume,
            );
            console.log('deleting folder: End');
          }
          console.log('creating folder: Start');
          fileSys.createAlumniResumeFolder({ userId: req.userId });
          console.log('creating folder: End');
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
    return this.profilesService.updateResume(+id, file);
  }
}
