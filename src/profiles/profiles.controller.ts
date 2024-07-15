import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { parse } from 'path';
import { diskStorage } from 'multer';
import { constants } from 'utils/constants';
import FilesHelper from 'files/FilesHelper';
import { Profile } from './entities/profile.entity';
import { ProfilesService } from './profiles.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileResumeUserInterceptor } from 'src/profiles/profileResumeUser.interceptor';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post(':userId')
  @ApiCreatedResponse({ description: 'Profile Created', type: Profile })
  @ApiBadRequestResponse({ description: 'Profile Creation Failed' })
  create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return this.profilesService.create(userId, createProfileDto);
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
  findForUser(@Param('userId', ParseIntPipe) id: number) {
    return this.profilesService.findForUser(id);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Profile by Id', type: Profile })
  @ApiBadRequestResponse({ description: 'Profile Not Found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.profilesService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ description: 'Profile Update' })
  @ApiBadRequestResponse({ description: 'Profile Update Failed' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profilesService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Profile Deleted',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.profilesService.remove(id);
  }

  @Post(':userId/uploadResume')
  @ApiOkResponse({
    description:
      'Resume Upload Successfully - Request Body: multipart/form-data, Field Name: file',
  })
  @UseInterceptors(
    ProfileResumeUserInterceptor,
    FileInterceptor('file', {
      limits: { fileSize: 4 * 1024 * 1024 },
      // fileFilter: (req, file, callback) => {
      //   const ext = parse(file.originalname).ext;
      //   if (!['.pdf', '.doc', '.docx'].includes(ext)) {
      //     req.fileValidationError = 'Invalid file type';
      //     return callback(
      //       new BadRequestException('Invalid File Type ' + ext),
      //       false,
      //     );
      //   }
      //   return callback(null, true);
      // },
      storage: diskStorage({
        destination: constants.UPLOAD_LOCATION,
        filename: (req: any, file, cb) => {
          const fn = parse(file.originalname);
          const filename = `${req.param.userId}/profileResume/${req.custom.id}${fn.ext}`;

          const fileSys = new FilesHelper();
          if (req.custom.resume)
            fileSys.removeFolderOrFile(
              constants.UPLOAD_LOCATION + req.param.userId + '/profileResume',
            );

          fileSys.createAlumniResumeFolder({ userId: req.param.userId });
          cb(null, filename);
        },
      }),
    }),
  )
  uploadFile(
    @Param('userId', ParseIntPipe) userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.profilesService.updateResume(userId, file);
  }
}
